//API DOCUMENTATION
import swaggerUi from "swagger-ui-express"
import swaggerDoc from "swagger-jsdoc"
//packages import
import express from "express"
import "colors"
import 'express-async-errors'
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan"

//security packages
import helmet from "helmet"
import xss from "xss-clean"
import mongoSanitize from 'express-mongo-sanitize'

//file imports
import connectDB from "./config/db.js"
import errorMiddleware from "./middlewares/errormiddleware.js"
import testRoute from "./routes/testRoute.js"
import authRoute from "./routes/authRoutes.js"
import userRoute from './routes/userRoutes.js'
import jobRoute from "./routes/jobRoutes.js"


//dotenv config
dotenv.config()
connectDB()
app.use(cors())

//swagger API config
//swagger api options
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            tittle: 'Job Portal',
            description: 'Node Expressjs Job Portal Application'
        },
        servers: [
            {
                  url: "http://localhost:8080",
                  url: "https://nodejs-job-portal-app-g9pe.onrender.com"
                
            }
        ]
    },
    apis: ['./routes/*.js'],

};

const spec = swaggerDoc(options)


//REST object
const app = express()


//some useful functions
app.use(helmet())
app.use(xss())
app.use(mongoSanitize());
app.use(express.json())
app.use(morgan('dev'))


//routes
app.use('/api/v1/test', testRoute)
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/user', userRoute)
app.use('/api/v1/jobs', jobRoute)

//homeRoute root
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(spec))

//Validation Middleware
app.use(errorMiddleware)


const PORT = process.env.PORT || 8080
app.listen(PORT)
// console.log(`server is running on port ${PORT}`.bgGreen.blue)
