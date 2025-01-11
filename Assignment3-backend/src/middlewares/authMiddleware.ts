import prisma from '../prisma';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import '../config/envConfig';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if(!token) {
        res.status(401).json({ error: 'User isnt logged in.' });
        return;
    }
    jwt.verify(token, process.env.JWT_SECRET as string, async (err, decoded) => {
        if(err) {
            res.status(403).json({ error: 'Invalid token.' });
            return;
        }
        if(decoded) {
            const payload = decoded as jwt.JwtPayload;
            const user = await prisma.users.findUnique({
                where: { id: payload.id },
            });
            if(user) {
                req.user = {
                    id: payload.id,
                    username: payload.username,
                    name: payload.name
                };
                next();
            } else {
                res.status(404).json({ error: 'User not found.' });
            }
        }
    });
}