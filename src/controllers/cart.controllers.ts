import { Request, Response } from 'express';
import { PrismaClient } from  "@prisma/client";
import { Info } from '../libs/InfoResponse';
import { CartItem } from '../models/Models';

const prisma = new PrismaClient({ errorFormat: 'minimal' }).cartItem
const prismaColor = new PrismaClient({ errorFormat: 'minimal' }).color

export const getCartFromUser = async(req: Request, res: Response) => {  // Segun el id del User que lo solicita
    console.log('getCart')
    const { id } = req.params  // Get: Get User by id
    
    try {
        let cartItems: any = await prisma.findMany({
            where: { userId: Number(id) },
            include: {
                color: true,
                product: true
            }
            
        })
        
        cartItems = cartItems.map((cartItem:any) => new CartItem(cartItem))

        Info.setData(201, {
            msg: 'Succesful.',
            cartItems
        })

    } catch (error) {
        if(typeof error === 'string'){  // My custom errors
            Info.setData(500, { error })
        } else {
            Info.setPrismaError(500, error)  // Every Prisma error. Por las dudas
        }
    }

    Info.setResponse(res)
}


export const createCartItem = async(req: Request, res: Response) => {
    const { id: userId } = req.params  // Get: Get User by id
    const { quantity, color, product } = req.body
    const { id: productId } = product
    // connect with UserId and ProductId
    try {
        let colorReceived: any = await prismaColor.findUnique({   
            where: { title: color }
        })
        

        let cartItem: any = await prisma.create({  
            data: {
                quantity, 
                colorId: colorReceived.id,
                productId,
                userId: Number(userId),
            },
            include: {
                color: true,
                product: true  // Lo que permite esto es que product no tenga la field colors
            }
        })

        cartItem = new CartItem(cartItem)
        
        Info.setData(201, {
            msg: `User created.`,
            cartItem
        })
        
    } catch (error) {
        if(typeof error === 'string'){  // Password not provided
            Info.setData(500, { error })
        } else {
            Info.setPrismaError(500, error)
        }
        console.log({error})
    }
    Info.setResponse(res)
}

export const deleteCartItem = async(req: Request, res: Response) => {
    const { id: userId, itemId } = req.params
    const { user } = req.body  // Recibe el cartItem
    // No seria necesario obtener el userId del path

    try {
        const deletedItem = await prisma.delete({
            where: {
                id: Number(itemId)
            }
        })

        Info.setData(201, {
            msg: `User deleted.`,
            deletedItem
        })
        
    } catch (error) {  // ### Prisma Errors
        Info.setPrismaError(500, error)
    }
    Info.setResponse(res)

}