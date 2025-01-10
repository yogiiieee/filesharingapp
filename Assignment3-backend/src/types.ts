import { Request } from "express"

export interface User {
    id: number,
    username: string,
    name: string,
    email: string,
    password: string
}

interface AuthUser {
    id: number,
    username: string
}

export interface FileUploadRequest extends Request {
    file?: Express.Multer.File,
    user?: AuthUser
}

declare global {
    namespace Express {
        interface Request {
            savedFileName?: string;
            user?: AuthUser;
        }
    }
}



// export interface File {
//     id: number,
//     name: string,
//     size: number,
//     uploadedat: Date,
//     sharing: boolean,
//     checksum: string,
// }