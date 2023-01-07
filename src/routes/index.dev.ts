import { Router } from 'express'
import { readdirSync } from 'fs'
import path from 'path'

export const routes = Router()

// ## Way to Dev. TS transpila mal el dynamic import. Asi que esta forma en Prod no funciona
const getRoutes = async() => {
    await readdirSync(__dirname).filter(name => !name.includes('index')).map(async(name) => {
        const nameRoute = name.slice(0,name.indexOf('.'))
        const module = await import('./' + name)
        
        const router = Object.values(module)[0] as any  // Al usar export comun, no export default
        try {
            routes.use('/' + nameRoute, router)
            
        } catch (error) {
            if(!router) console.log(`The router "${nameRoute}" does not have the export`)
            process.exit(0)
        }
      
    })

}
getRoutes() // Se que esto es Async, 

// Aqui ya el routes es exportado, pero aun no tiene la rutas definidas. Cuando pase termine el procedimiento async
// ahi si las tendra (son unos ms). Lo ideal seria esperar a que el routes ya tenga las rutas y ahi exportarlo



