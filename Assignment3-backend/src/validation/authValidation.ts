import { z } from 'zod';

const passwordSchema = z.string()
    .min(8, 'Password must be at least 8 characters long.')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter.')
    .regex(/[0-9]/, 'Password must contain at least one number.');

export const signupSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters long.'),
    email: z.string().email('Invalid email address.'),
    password: passwordSchema
});

export const loginSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters long.'),
    password: passwordSchema
});