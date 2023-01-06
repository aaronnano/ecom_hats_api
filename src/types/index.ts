import { Request } from "express";

export interface CustomRequest extends Request {  // Custom request
    userSession?: { id: number, email: string, role: string  }
}
export enum ROLE {
    USER = 'USER',
    ADMIN = 'ADMIN'
}