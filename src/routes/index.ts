import { Router } from 'express'
import { readdirSync } from 'fs'

import { authRoutes } from './auth.routes'
import { cartRoutes } from './cart.routes'
import { routes as catRoutes } from './categories.routes'
import { colorsRoutes } from './colors.routes'
import { orderRoutes } from './order.routes'
import { productsRoutes} from './products.routes'
import { reviewsRoutes } from './reviews.routes'
import { usersRoutes } from './users.routes'

// Way To Prod
export const routes = Router()

const modules = [ authRoutes,
    cartRoutes,
    catRoutes,
    colorsRoutes,
    orderRoutes,
    productsRoutes,
    reviewsRoutes,
    usersRoutes
]

const getRoutes = () => {
    readdirSync(__dirname).filter(name => !name.includes('index')).map((name, i) => {
        const nameRoute = name.slice(0,name.indexOf('.'))
        routes.use('/' + nameRoute, modules[i])
      
    })

}
getRoutes()