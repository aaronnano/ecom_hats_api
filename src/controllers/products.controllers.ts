import { Request, Response } from 'express';
import { PrismaClient } from  "@prisma/client";
import { Info } from '../libs/InfoResponse';
import { Product } from '../models/Models';

const prisma = new PrismaClient({ errorFormat: 'minimal' }).product
const prismaColor = new PrismaClient({ errorFormat: 'minimal' }).color

// Seria bueno que en todas las request, se devuelve siempre el Model que requira el Front aunque 
// la request no sea un get
export const getProducts = async(req: Request, res: Response) => {
    
    try {
        let products: any = await prisma.findMany({
            include: {
                colors: true,
                category: true
            }
        })

        products = products.map((product: any) => new Product(product))  // Data with proper Model

        Info.setData(201, {
            msg: 'Succesful.',
            products
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

export const createProduct = async(req: Request, res: Response) => {
    const { title, description, image, price } = req.body
    let { colors, category } = req.body
    // Implementacion: creacion de una field como una lista normal. No seria pasar una listas de los ids como antes
    // sino de eso, lista de esas cosas

    colors = colors ?? []  // Por si la lista llegara a ser undefined o null
    
    try {
        console.log({image})
        
        // Modo: colores ya existentes en DB, y lo que hago es hacer asociaciones
        let colorsFinded: any = await prismaColor.findMany({   
            where: {
                title: {
                    in: [ ...colors ]
                }
            }
        })

        // Probar crear un product pero con category: undefined
        colorsFinded = colorsFinded.map(({ title }: any) => ({ title }))  // Para que solo sea [ { id } ] sin title
        const product = await prisma.create({  
            data: {
                title, description, image, price,
                colors: {
                    connect: [ ...colorsFinded ]  // [#] Cambiar a Crear Colors o conectar segun el caso    
                },
                category: {  // Modo: category que ire creando y asociando conforme cree un product.
                    // No defini posibilidad de crear categories por separado, sin que esten relacionados
                    connectOrCreate: {
                        where: {
                            name: category  // Si existe, obtengo esta category
                        },
                        create: {
                            name: category  // Y si no, pues la creo y la relaciono
                        }
                    }
                }
            
            },
            include: {
                colors: true,
                category: true
            }
        })
        
        Info.setData(201, {
            msg: `Product created.`,
            product  // Creo que lo podemos quitar, como si no devolviera nada
        })
        
    } catch (error) {
        console.log(error)
        if(typeof error === 'string'){  // Password not provided
            Info.setData(500, { error })
        } else {
            Info.setPrismaError(500, error)
        }
    }
    Info.setResponse(res)
}