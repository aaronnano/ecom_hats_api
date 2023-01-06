import { Request, Response } from 'express';
import { PrismaClient } from  "@prisma/client";
import { Info } from '../libs/InfoResponse';

const prisma = new PrismaClient({ errorFormat: 'minimal' }).color

export const createColors = async(req: Request, res: Response) => {
    const { colors } = req.body
    const colorsMapped = colors.map((title: any) => ({ title: title.toUpperCase() }))  // { title: '#color'}

    try {
        // Si vuelvo a crear los mismos colors, lanzara un error, porque los colors son unique
        const colorsCreated = await prisma.createMany({  // Devuelve el numero de creados
            data: [
                ...colorsMapped
            ],
        })
        
        Info.setData(201, {
            msg: `Color created.`,
            colors: colorsCreated
        })
        
    } catch (error) {
        if(typeof error === 'string'){  // Password not provided
            Info.setData(500, { error })
        } else {
            Info.setPrismaError(500, error)
        }
    }
    Info.setResponse(res)

}
export const getColors = async(req: Request, res: Response) => {

    try {
        
        let colors = await prisma.findMany()
        colors = colors.map(({title}) => title) as any


        Info.setData(201, {
            msg: 'Succesful.',
            colors
        })


    } catch (error) {
        if(typeof error === 'string'){  // Password not provided
            Info.setData(500, { error })
        } else {
            Info.setPrismaError(500, error)
        }
    }
    Info.setResponse(res)

}
