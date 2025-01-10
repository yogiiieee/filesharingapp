import prisma from "../prisma";
import { Request, Response } from "express";
import path from "path";
import fs from 'fs';

export const downloadFileWithLinkController = async (req: Request, res: Response): Promise<void> => {
    const { uuid } = req.params;
    try {
        const file = await prisma.files.findUnique({
            where: { uuid: uuid },
        });
        if (!file) {
            res.status(404).json({ error: 'File not found.' });
            return;
        }
        const filePath = path.join(__dirname, '../../uploads', file.filename);
        if (fs.existsSync(filePath)) {
            res.download(filePath, file.filename);
        } else {
            res.status(404).json({ error: 'File not found.' });
            return;
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching file.' });
    }
}