import { Request, Response } from 'express';
import { PrismaClient } from  "@prisma/client";
import { Info } from '../libs/InfoResponse';
import { encryptData } from '../libs/helpers/Bcrypt';
import { User } from '../models/Models';

const prismaUser = new PrismaClient({ errorFormat: 'minimal' }).user
const prismaAdress = new PrismaClient({ errorFormat: 'minimal' }).userAddress

export const getUser = async(req: Request, res: Response) => {
    const { id } = req.params  // Get: Get User by id
    
    try {
        let user: any = await prismaUser.findUnique({
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
        
        if(!user) throw `The user: ${id} does not exist`

        user = new User(user)

        Info.setData(201, {
            msg: 'Succesful.',
            user
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

export const createUser = async(req: Request, res: Response) => {
    const { name, username, email } = req.body
    let { password, role } = req.body
    
    try {
        password = encryptData(password)
        role = role.toUpperCase()

        const user = await prismaUser.create({  
            data: {
                username, name, email, password, role,   
            }
        })
        
        Info.setData(201, {
            msg: `User created.`,
            user
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
export const updateUser = async(req: Request, res: Response) => {
    const { id } = req.params
    const { name, username, email, role, avatar } = req.body
    let { password, address } = req.body

    console.log({address})


    try {
        password = password ? encryptData(password) : undefined
        
        // Create (and connect) or Update an Address
        let newAddress: any;    
        if(address?.id){  // Edit si hay id
             newAddress = await prismaAdress.update({
                where: {
                    id: address.id
                },
                data: {
                    ...address,
                }
            })
        } else if(address){
            newAddress = await prismaAdress.create({
                data: {
                    ...address,
                    userId: Number(id)
                }
            })
        }
        

        let user: any = await prismaUser.update({
            where: {
                id: Number(id)
            },
            data: {
                username, name, email, password, role, avatar,
                // Si los datos estan como:  field: undefined, prisma no los toma en cuenta
                // Usariamos esta manera si quermeos que muchos addresses se conecten a este User
                // addresses: {  // Create or Update
                //     connect: [{ id: newAddress.id }],
                // }
                // }
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

        user = new User(user)


        Info.setData(201, {
            msg: `User updated.`,
            user
        })

    } catch (error) {  // ### Prisma Error
        Info.setPrismaError(500, error)
        // The password error no aparecera ya que no es un requisito en update
    }

    Info.setResponse(res)

}

export const deleteUser = async(req: Request, res: Response) => {
    const { id } = req.params

    try {
        const deletedUser = await prismaUser.delete({
            where: {
                id: Number(id)
            }
        })

        Info.setData(201, {
            msg: `User deleted.`,
            deletedUser
        })
        
    } catch (error) {  // ### Prisma Errors
        Info.setPrismaError(500, error)
    }
    Info.setResponse(res)
}
export const deleteUserAddress = async(req: Request, res: Response) => {
    const { id, addressId } = req.params


    try {
        const address = await prismaAdress.delete({
            where: {
                id: Number(addressId)
            }
        })

        let user: any = await prismaUser.findUnique({
            where: { id: Number(id) },
            
            include: {
                addresses: true
            }
        })
        
        if(!user) throw `The user: ${id} does not exist`

        user = new User(user)

        Info.setData(201, {
            msg: `Address Deleted.`,
            user
        })
        
    } catch (error) {  // ### Prisma Errors
        Info.setPrismaError(500, error)
    }
    Info.setResponse(res)
}