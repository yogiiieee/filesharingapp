import prisma from "../prisma";
import { Request, Response } from "express";
import { FileUploadRequest } from "../types";
import multer from 'multer';
import path from "path";
import fs from 'fs';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { updateProfileSchema } from "../validation/authValidation";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadsDir = path.join(__dirname, '../../uploads');
        const deletedDir = path.join(__dirname, '../../uploads/deleted');
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir);
        }
        if (!fs.existsSync(deletedDir)) {
            fs.mkdirSync(deletedDir);
        }
        const destinationDir = req.body.isdeleted ? deletedDir : uploadsDir;
        cb(null, destinationDir);
    },
    filename: (req, file, cb) => {
        const username = req.user!.username;
        const originalName = `${username}$_${file.originalname}`;
        const filePath = path.join(__dirname, '../../uploads', originalName);
        const deletedFilePath = path.join(__dirname, '../../uploads/deleted', `deleted$_${originalName}`);
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
        if(req.body.isdeleted) {
            req.savedFileName = `deleted$_${originalName}`;
            cb(null, `deleted$_${originalName}`);
        } else {
            req.savedFileName = originalName;
            cb(null, originalName);
        }
    }
});
export const upload = multer({ storage: storage });

const computeCheckSum = (filePath: string, username: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash('sha256');
        const stream = fs.createReadStream(filePath);
        stream.on('data', (data) => hash.update(data));
        stream.on('end', () => {
            const checksum = `${username}$_${hash.digest('hex')}`;
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
        const username = req.user!.username;
        const filePath = path.join(__dirname, '../../uploads', req.savedFileName || req.file.originalname);
        const fileSizeInBytes = req.file.size;
        const checksum = await computeCheckSum(filePath, username);
        const file = await prisma.files.create({
            data: {
                filename: req.savedFileName || `${username}$_${req.file.originalname}`,
                uploadedat: new Date(),
                size: fileSizeInBytes,
                sharing: false,
                checksum: checksum,
                isdeleted: req.body.isdeleted || false,
                userId: req.user?.id as number,
            },
        });
        res.status(201).json({ 
            message: 'Uploaded successfully.',
            filename: file.filename,
        });
    } catch (err) {
        res.status(500).json({ error: 'Unable to upload file.' });
    }
}

export const updateSharingController = async (req: Request, res: Response): Promise<void> => {
    const { filename, sharing } = req.body as {filename: string, sharing: boolean};
    const userFilename = req.user!.username + '$_' + filename;
    try {
        const file = await prisma.files.findFirst({
            where: { filename: userFilename },
            select: { id: true }
        });
        if (!file) {
            res.status(404).json({ error: 'File not found.' });
            return;
        }
        if (sharing) {
            const uuid = uuidv4();
            await prisma.files.update({
                where: { id: file.id },
                data: { sharing: true, uuid: uuid },
            });
            res.status(200).json({ message: 'File sharing enabled.', uuid: uuid });
            return;
        } else {
            await prisma.files.update({
                where: { id: file.id },
                data: { sharing: false, uuid: null },
            });
            res.status(200).json({ message: 'File sharing disabled.' });
            return;
        }
    } catch (err) {
        res.status(500).json({ error: 'Error updating file sharing status.' });
    }
}

export const getAllFilesController = async (req: Request, res: Response): Promise<void> => {
    const page = parseInt(req.query.page as string) || 1;
    const skip = (page - 1) * 10;
    try {
        const files = await prisma.files.findMany(
            {
                where: { userId: req.user?.id, isdeleted: false },
                skip: skip,
                take: 10,
                orderBy: { uploadedat: 'desc' },
                select: {
                    filename: true,
                    size: true,
                    uploadedat: true,
                    sharing: true,
                    uuid: true,
                    id: true
                }
            }
        );
        const hasMoreFiles = files.length === 10;
        res.status(200).json({ files, hasMoreFiles });
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch files.' });
    }
}

export const getSharedFileController = async (req: Request, res: Response): Promise<void> => {
    const uuid = req.query.uuid as string;
    try {
        const file = await prisma.files.findFirst(
            {
                where: { uuid: uuid },
                select: {
                    filename: true,
                    size: true,
                    uploadedat: true,
                    uuid: true,
                    user: {
                        select: {
                            username: true,
                            name: true
                        }
                    }
                }
            }
        );
        if (!file) {
            res.status(404).json({ error: 'File not found.' });
            return;
        }
        const { username, name } = file.user || {};
        const { user, ...fileData } = file;
        res.status(200).json({file: [fileData], username, name});
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch file.' });
    }
}

export const downloadFileController = async (req: Request, res: Response): Promise<void> => {
    const { fileId } = req.params;
    const mimeTypes: { [key: string]: string } = {
        '.txt': 'text/plain',
        '.pdf': 'application/pdf',
        '.jpg': 'image/jpeg',
        '.png': 'image/png',
        '.doc': 'application/msword',
        '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        '.xls': 'application/vnd.ms-excel',
        '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        '.ppt': 'application/vnd.ms-powerpoint',
        '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        '.csv': 'text/csv',
        '.zip': 'application/zip',
        '.rar': 'application/x-rar-compressed',
        '.tar': 'application/x-tar',
        '.gz': 'application/gzip',
        '.mp4': 'video/mp4',
        '.mp3': 'audio/mpeg',
        '.wav': 'audio/wav',
        '.ogg': 'audio/ogg',
    };
    try {
        const file = await prisma.files.findUnique({
            where: { id: parseInt(fileId) },
        });
        if (!file) {
            res.status(404).json({ error: 'File not found in db.' });
            return;
        }
        const filePath = path.join(__dirname, '../../uploads', file.filename);
        const fileExtension = path.extname(file.filename);
        const contentType = mimeTypes[fileExtension] || 'application/octet-stream';
        if (fs.existsSync(filePath)) {
            res.setHeader('Content-type', contentType);
            res.setHeader('Content-Disposition', `attachment; filename=${file.filename}`);
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
        if (file.sharing) {
            res.status(403).json({ error: 'Cannot delete shared file.' });
            return;
        }
        await prisma.files.update({
            where: { id: file.id },
            data: { isdeleted: true, filename: `deleted$_${file.filename}` },
        });
        const filePath = path.join(__dirname, '../../uploads', file.filename);
        const deletedFilePath = path.join(__dirname, '../../uploads/deleted', `deleted$_${file.filename}`);
        if (fs.existsSync(filePath)) {
            fs.renameSync(filePath, deletedFilePath);
            res.status(200).json({ message: `File ${file.filename} deleted successfully.` });
            return;
        } else {
            res.status(404).json({ error: 'File not found in server.' });
            return;
        }
    } catch (err) {
        res.status(500).json({ error: 'Error deleting file.' });
    }
}

export const updateProfileController = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id;
        const validation = updateProfileSchema.safeParse(req.body);
        if(!validation.success) {
            res.status(400).json({ error: 'Missing data or incorrect format.' });
            return;
        }
        const { name, email } = validation.data as { name: string, email: string };
        if (!name || !email) {
            res.status(400).json({ error: 'Atleast provide one.' });
            return;
        }
        const user = await prisma.users.findFirst({
            where: { OR: [{id: userId}, { name: name }, { email: email }]},
        });
        if(!user) {
            res.status(404).json({ error: "Couldn't find that user! Please try again." });
            return;
        }
        const updatedUser = await prisma.users.update({
            where: { id: userId },
            data: {
            ...(name && { name }),
            ...(email && { email }),
            },
            select: { id: true, username: true, name: true },
        });
        res.status(201).json({ message: 'Profile updated successfully.', user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error.' });
    }
}