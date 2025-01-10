import { Request, Response } from 'express';
import prisma from "../prisma";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/envConfig';
import { User } from '../types';
import { signupSchema, loginSchema } from '../validation/authValidation';

export const signupController = async (req: Request, res: Response): Promise<void> => {
    const validation = signupSchema.safeParse(req.body);
    if(!validation.success) {
        res.status(400).json({ error: validation.error });
        return;
    }
    const { username, name, email, password } = validation.data as User;
    try {
        const existingUser = await prisma.users.findFirst({
            where: { OR: [{ username: username }, { email: email }] },
        });
        if (existingUser) {
            res.status(400).json({
                error: 'This one is already taken! Try another one.',
            });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.users.create({
            data: { username: username, name: name, email: email, password: hashedPassword },
            select: { id: true, username: true },
        });
        res.status(201).json({message: 'User created successfully.', user: newUser})
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error.' });
    }
}

export const loginController = async (req: Request, res: Response): Promise<void> => {
    const validation = loginSchema.safeParse(req.body);
    if(!validation.success) {
        res.status(400).json({ error: validation.error });
        return;
    }
    const { username, password } = validation.data as User;
    try {
        const user = await prisma.users.findFirst({
            where: { username: username },
        });
        if(!user) {
            res.status(404).json({ error: "Couldn't find that user! Please try again." });
            return;
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch) {
            res.status(401).json({ error: 'Incorrect Password.' });
            return;
        }
        const token = jwt.sign({ id: user.id, username: user.username }, config.JWT_SECRET as string);
        res.status(200).header('Authorization', `Bearer ${token}`).json({ message: 'Login Successful!' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error.' });
    }
}

// export const logoutController = async (req: Request, res: Response): Promise<void> => {
//     res.removeHeader('Authorization');
//     res.status(200).json({ message: 'Logout Successful' });
// }