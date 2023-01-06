import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken';
import { CustomRequest } from '../../types';

const { SECRET_KEY } = process.env


export const verifyToken = async(req: CustomRequest, res: Response, next: NextFunction) => {
    // ### Tenemos que ver que User hace la Request, esa sesion actual. Eso esta en el token ###


    const token = req.headers['authorization'] as string    // or Authorization - x-access-token
    if(!token) return res.status(403).json({    
        msg: 'No token provided'
    })
    try {
        const decoded = jwt.verify(token, SECRET_KEY as any) as JwtPayload
        const { id, email, role } = decoded  // Habiamos definido que la session esta compuesta por id, email
        
        // ### Colocar quien es el User que hizo la request, el que tiene session existente.
        req.userSession = {
            id, email, role
        }

        next()

    } catch (error) {
        // ### Error token. En middlewares, importante el 'return'
        return res.status(401).json({
            msg: 'Unauthorized. Invalid token',
            error: 'Token Expired'  // Asumo que el unico error posible es el de la expiracion
        })

    }

    
}