import { NextFunction, Request, Response } from "express"
import { CustomRequest, ROLE } from "../../types"


// ### Segun los roles que deseo para una determinada ruta, me fijo si el User del token tiene algun Role de los Roles
// ## Sirve tambien para ver si el userSession hace un cambio Id del mismo User. Por supuesto, el admin puede hacerlo a cualquiera
export const authBy = (...roles: ROLE[]) => {
    return (req: CustomRequest, res: Response, next: NextFunction) => {
        // Se llegara aqui solo cuando el token haya sido validado
        const { userSession } = req // Siempre vendra el userSession despues del verifyToken
        let id = Number(req.params.id)  // Para router que tengan el param /:id del User
        
        // ## Remove later
        // return next()
        
        //## Test
        if(userSession?.role === ROLE.ADMIN){  // Si es admin, accedera inmediatamente
            return next()
        }

        const hasRole = roles.some(role => role === userSession?.role) // Vemos si el user actual tiene algun role de esta ruta
        if(!hasRole)
            return res.status(401).json({ msg: `Require the some of these roles: ${roles} to access to this route` }) 

        //## Test
        // Check que el userSession haga cambios a su propio user
        if(userSession?.id !== id)  
            return res.status(401).json({ msg: `You only are able to make changes to yourself`}) 
            
        next()

    }
}