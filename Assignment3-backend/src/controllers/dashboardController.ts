import prisma from "../prisma";
import { Request, Response } from "express";
import { FileUploadRequest } from "../types";
import multer from 'multer';
import path from "path";
import fs from 'fs';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadsDir = path.join(__dirname, '../../uploads');
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir);
        }
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const originalName = file.originalname;
        const filePath = path.join(__dirname, '../../uploads', originalName);
        const fileExtension = path.extname(originalName);
        const baseName = originalName.replace(fileExtension, '');
    
        let fileExists = fs.existsSync(filePath);
        let count = 2;
        while (fileExists) {
            const newFileName = `${baseName}-${count}${fileExtension}`;
            const newFilePath = path.join(__dirname, '../../uploads', newFileName);
            if(!fs.existsSync(newFilePath)) {
                req.savedFileName = newFileName;
                cb(null, newFileName);
                return;
            }
            count++;
            fileExists = fs.existsSync(newFilePath);
        }
        req.savedFileName = file.originalname;
        cb(null, file.originalname);
    }
});
export const upload = multer({ storage: storage });

const computeCheckSum = (filePath: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash('sha256');
        const stream = fs.createReadStream(filePath);
        stream.on('data', (data) => hash.update(data));
        stream.on('end', () => {
            const checksum = hash.digest('hex');
            resolve(checksum);
        });
        stream.on('error', (error) => reject(error));
    });
}

export const uploadFileController = async (req: FileUploadRequest, res: Response): Promise<void> => {
    if (!req.file) {
        res.status(400).json({ error: 'No file uploaded.' });
        return;
    }
    try {
        const filePath = path.join(__dirname, '../../uploads', req.savedFileName || req.file.originalname);
        const fileSizeInBytes = req.file.size;
        const checksum = await computeCheckSum(filePath);
        console.log(req.savedFileName);
        const file = await prisma.files.create({
            data: {
                filename: req.savedFileName || req.file.originalname,
                uploadedat: new Date(),
                size: fileSizeInBytes,
                sharing: false,
                checksum: checksum,
                userId: req.user?.id as number,
            },
        });
        res.status(201).json({ 
            message: 'File uploaded successfully.',
            file: file,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Unable to upload file.' });
    }
}

export const updateSharingController = async (req: Request, res: Response): Promise<void> => {
    const { fileId } = req.params;
    const { sharing } = req.body as { sharing: boolean };
    try {
        const file = await prisma.files.findUnique({
            where: { id: parseInt(fileId) },
        });
        if (!file) {
            res.status(404).json({ error: 'File not found or link invalid.' });
            return;
        }
        if (sharing) {
            const uuid = uuidv4();
            const updatedfile = await prisma.files.update({
                where: { id: parseInt(fileId) },
                data: { sharing: sharing, uuid: uuid },
            });
            res.status(200).json({ message: 'File sharing enabled.', sharelink: `${req.protocol}://${req.get('host')}/download/${uuid}` });
            return;
        } else {
            const updatedfile = await prisma.files.update({
                where: { id: parseInt(fileId) },
                data: { sharing: sharing, uuid: null },
            });
            res.status(200).json({ message: 'File sharing disabled.' });
            return;
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error updating file sharing status.' });
    }
}

export const getFilesController = async (req: Request, res: Response): Promise<void> => {
    try {
        const files = await prisma.files.findMany(
            {
                where: { userId: req.user?.id},
                orderBy: { uploadedat: 'desc' },
            }
        );
        res.status(200).json(files);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch files.' });
    }
}

export const downloadFileController = async (req: Request, res: Response): Promise<void> => {
    const { fileId } = req.params;
    try {
        const file = await prisma.files.findUnique({
            where: { id: parseInt(fileId) },
        });
        if (!file) {
            res.status(404).json({ error: 'File not found in db.' });
            return;
        }
        const filePath = path.join(__dirname, '../../uploads', file.filename);
        if (fs.existsSync(filePath)) {
            res.download(filePath, file.filename);
        } else {
            res.status(404).json({ error: 'File not found in server.' });
            return;
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching file.' });
    }
}

export const deleteFileController = async (req: Request, res: Response): Promise<void> => {
    const { fileId } = req.params;
    try {
        const file = await prisma.files.findUnique({
            where: { id: parseInt(fileId) },
        });
        if (!file) {
            res.status(404).json({ error: 'File not found in db.' });
            return;
        }
        const filePath = path.join(__dirname, '../../uploads', file.filename);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            await prisma.files.delete({
                where: { id: parseInt(fileId) },
            });
            res.status(200).json({ message: `File ${file.filename} deleted successfully.` });
        } else {
            res.status(404).json({ error: 'File not found in server.' });
            return;
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting file.' });
    }
}