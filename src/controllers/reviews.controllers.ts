import { Request, Response } from 'express';
import { PrismaClient } from  "@prisma/client";
import { Info } from '../libs/InfoResponse';
import { Review } from '../models/Models';

const prisma = new PrismaClient({ errorFormat: 'minimal' }).review

// Seria bueno que en todas las request, se devuelve siempre el Model que requira el Front aunque 
// la request no sea un get
export const getReviewsFromProduct = async(req: Request, res: Response) => {
    const { productId } = req.params  // ProductId
    

    try {
        let reviews: any = await prisma.findMany({
            where: {
                productId: Number(productId),
                
            },
            include: {
                user: true
            }
        })

        reviews = reviews.map((review: any) =>  new Review(review))

        Info.setData(201, {
            msg: 'Succesful.',
            reviews
        })

    } catch (error) {
        if(typeof error === 'string'){  // My custom errors. No hay aun nada
            Info.setData(500, { error })
        } else {
            Info.setPrismaError(500, error)  // Every Prisma error. Por las dudas
        }
    }

    Info.setResponse(res)
}
export const createReview = async(req: Request, res: Response) => {
    const { id: userId } = req.params  // Get: Get User by id
    const { comment, product } = req.body
    const { id: productId } = product

    try {
        // Nota: caso especial de relaciones.
        // e.g. reviewId:3 -> productId:4 y userId:5  Todo bien
        // e.g. reviewId:9 -> productId:4 y userId:5  No debe haber otra con la misma relacion
        // Tampoco puede poner a las entidades product y user como @unique en Review, no estaria cumpliendo
        // con que haya lista de Review en Product y en User

        // ## Check si existe ya una Review con tales productId y userId
        let reviewFinded = await prisma.findMany({  // Lanza [] vacia si no matchea o llena. No lanza errores
            where: {
                productId, userId: Number(userId)
            }
        })

        if(reviewFinded.length !== 0) throw `The user ${userId} alredy have a Review for the Product ${productId}`
        // Por ahora, en el front no permito que se llegue a hacer esto

        let review: any = await prisma.create({  
            data: {
                comment,
                productId,
                userId: Number(userId),
            },
            include: {
                user: true
            }
        })
        
        review = new Review(review)

        Info.setData(201, {
            msg: `User created.`,
            review
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
export const updateReview = async(req: Request, res: Response) => {
    const { reviewId } = req.params  // Get: Get User by id
    const { comment } = req.body
    // Relacionado con el createReview, porque una vez creado, solo podremos hacer cambios a esa review de tal UserId
    // No podremos cambiar productId de la review

    try {
        let review: any = await prisma.update({
            where: {
                id: Number(reviewId)
            },
            data: { comment },
            include: {
                user: true
            }
        })
        
        review = new Review(review)

        Info.setData(201, {
            msg: `User created.`,
            review
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
export const deleteReview = async(req: Request, res: Response) => {
    const { reviewId } = req.params
    const { user } = req.body  
    // Mismo caso que con cartIten

    try {
        const deletedReview = await prisma.delete({
            where: {
                id: Number(reviewId)
            }
        })

        Info.setData(201, {
            msg: `User deleted.`,
            deletedReview
        })
        
    } catch (error) {  // ### Prisma Errors
        Info.setPrismaError(500, error)
    }
    Info.setResponse(res)

}