import { Request, Response } from 'express';
import { PrismaClient } from  "@prisma/client";
import { Info } from '../libs/InfoResponse';

const prisma = new PrismaClient({ errorFormat: 'minimal' }).category

export const getCategories = async(req: Request, res: Response) => {

    try {
        
        let res: any = await prisma.findMany()
        res = res.map(({ name }: any) => name )


        Info.setData(201, {
            msg: 'Succesful.',
            categories: res
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