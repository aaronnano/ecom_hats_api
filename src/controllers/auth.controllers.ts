import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { compareData, encryptData } from '../libs/helpers/Bcrypt';
import { Info } from '../libs/InfoResponse';
import { User } from '../models/Models';
import { CustomRequest } from '../types';

const { timeToken, SECRET_KEY } = process.env

const prisma = new PrismaClient({ errorFormat: 'minimal' }).user


export const toRegister = async(req: Request, res: Response) => {
    const { name, username, email } = req.body
    let { password } = req.body
    
    try {
        password = encryptData(password)
        // ### Create the new user
        let user:any = await prisma.create({
            data: {
                name, username, email, password,
            },
            include: {
                addresses: true,
                orders: {
                    include: {
                        delivery_address: true,
                        orderItems: {
                            include: {
                                color: true,
                                product: true
                            }
                        }
                    }
                }
            }
        })

        const { id, role } = user
        // ### id, email, role  -->  token
        // ### Generamos un nuevo token para el usuario registrado. A new Session que se compondra de: id, email
        const token = jwt.sign({ id, email, role }, SECRET_KEY as any, { expiresIn: timeToken } )  // Para el tiempo usa el package: 'ms'

        user = new User(user)

        // ### Return the token
        return res.status(200).json({
            msg: 'Succesful. User Created',
            user, token,
        })

        
    } catch (error) {  // ### Errors
        if( typeof error === 'string' ){  // Password not provided
            Info.setData(500, { error, token: null })
        } else {
            Info.setPrismaError(500, error)
        }
        Info.setResponse(res)
    }

}
export const toLogin = async(req: Request, res: Response) => {
    const { email, password } = req.body   // Get the email and password

    if(!password) return res.status(400).json({
        msg: 'The password is required',
        token: null
    })

    try {
        // ### Check if the user by email exists. This will give an error if it does not exist
        let user: any = await prisma.findUnique({
            where: { email },
            include: {
                addresses: true,
                orders: {
                    include: {
                        delivery_address: true,
                        orderItems: {
                            include: {
                                color: true,
                                product: true
                            }
                        }
                    }
                }
            }
        })
        
        if(!user) throw `The user '${email}' does not exist`
        
        // ### Match the password
        const isValid = compareData(password, user.password)
        if(!isValid) return res.status(401).json({ msg: 'Invalid Password' }) // 401. unauthorized
        
        const { id, role } = user // ### Get the id
        // ### Generate the Token. A new Session instance que guardara: id, email
        const token = jwt.sign({ id, email, role }, SECRET_KEY as any, { expiresIn: timeToken } )

        user = new User(user)

        return res.status(200).json({
            msg: 'Succesful. User logged',
            user, token,  // Ante un Login, devuelvo el User correspondiente
        })

    } catch (error) {  // ### Errors. Only Custom errors
        Info.setData(500, { error })
        Info.setResponse(res)
             
    }
}

export const loginWithToken = async(req: CustomRequest, res: Response) => {
    const { id } = req.userSession!

    try {

        let user: any = await prisma.findUnique({
            where: { id: Number(id) },
            include: {
                addresses: true,
                orders: {
                    include: {
                        delivery_address: true,
                        orderItems: {
                            include: {
                                color: true,
                                product: true
                            }
                        }
                    }
                }
            }
        })
        
        user = new User(user)

        return res.status(200).json({
            msg: 'Succesful',
            user
        })

    } catch (error) {
        Info.setData(500, { error })
        Info.setResponse(res)
    }



}