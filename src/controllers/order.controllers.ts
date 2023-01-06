import { Request, Response } from 'express';
import { PrismaClient } from  "@prisma/client";
import { Info } from '../libs/InfoResponse';
import { Order } from '../models/Models';
import { cleanEmptyFields } from '../libs/helpers/cleanEmptyFields';

const prisma = new PrismaClient({ errorFormat: 'minimal' }).order
const prismaColor = new PrismaClient({ errorFormat: 'minimal' }).color
const prismaCart = new PrismaClient({ errorFormat: 'minimal' }).cartItem

export const createOrder = async(req: Request, res: Response) => {
    const { id: userId } = req.params  // Get: Get User by id
    const { delivery_addressId, delivery_date, total } = req.body
    let { orderItems } = req.body

    try {
        let colors: any = orderItems.map(({ color }: any) => {
            return prismaColor.findUnique({
                where: {
                    title: color
                }
            })
        })
        colors = await Promise.all([ ...colors ])

        orderItems = orderItems.map((item: any, i: number) => {  // Coloco el field colorId en todos los items
            item = {
                ...item, colorId: colors[i].id, color: undefined
            }
            return cleanEmptyFields(item)   // Para que el color: undefined se vaya
        })

        let order: any = await prisma.create({   
            data: {
                delivery_addressId, delivery_date: new Date(delivery_date),
                total,
                userId: Number(userId),
                orderItems: {
                    create: [ ...orderItems ]
                }
            },
            include: {
                delivery_address: true,
                orderItems: {
                    include: {
                        color: true,
                        product: true
                    }
                }
            }
        })
        
        order = new Order(order)
        
        // Eliminar todo el cart del UserId
        await prismaCart.deleteMany({
            where: {
                userId: Number(userId)
            }
        })

        
        Info.setData(201, {
            msg: `User created.`,
            order
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
