import express from 'express'
import morgan from 'morgan'
import { config } from 'dotenv'; config()
import { PrismaClient } from '@prisma/client';
import { routes } from './routes'
import cors from 'cors'
// import { networkInterfaces } from 'os'
// ### Init ###

const app = express()
// const ip = networkInterfaces()['wifi0']?.[0].address

const PORT = process.env.PORT || 3000

// ### Middlewares ###
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


// ### Routes ###
app.use('/api', routes)

// ### Server ###
app.listen(PORT as number, '0.0.0.0', async() => {
    console.log('Listen....')
    // console.log(`Local:     http://localhost:${ PORT }`)
    // console.log(`Network:   http://${ip}:${PORT}`)
    // ### Check DB ###
    try {
        const prisma = new PrismaClient()
        await prisma.$connect()
        // Para ver si se puede connectar a la database
        
    } catch (error) {
        console.log('Failed to connect to database')
        process.exit(1)
    }

})
    

