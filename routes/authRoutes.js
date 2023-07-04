import express from "express"
import rateLimit from 'express-rate-limit'
import { registerController, userLoginController } from "../controllers/authController.js"

//Express-Rate_limit
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
})



const router = express.Router()

//routes

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          required:
 *              - id
 *              - name
 *              - email
 *              - password
 *              
 *          properties:
 *              id:
 *                 type: string
 *                 description: The Auto-generated id of user collection
 *                 example: DMNKCASNCANCNNCCDNASNC
 *              name:
 *                 type: string
 *                 description: User Name
 *              email:
 *                 type: string
 *                 description: User email address
 *              password:
 *                 type: string
 *                 description: User password should be greater then 6 charracters
 *              location:
 *                 type: string
 *                 description: User location city or country
 *          example:
 *              id: ABCDE   
 *              name: wolf
 *              email: wolf@gmail.com
 *              password: wolf@123
 *              location: Delhi
 *                
 */

/**
 * @swgger
 * tags:
 *  name: auth
 *  description: authentication apis
 * 
 */

/**
 * @swagger
 * /api/v1/auth/register-post:
 *   post:
 *      summery: register new user
 *      tags: [auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User' 
 *      responses:
 *          200:
 *              description: user created successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          500:
 *              description: internal server error
 *  
 */

//rigister || Post
router.post('/register-post', limiter, registerController)

/**
 * @swagger
 * /api/v1/auth/login-post:
 *  post:
 *      summery: login page
 *      tags: [auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                       $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: login successfull
 *              content:
 *                  application/json:
 *                      schema:
 *                           $ref: '#/components/schemas/User'
 *          500:
 *              description: something went wrong 
 * 
 */

//Login || post
router.post('/login-post', limiter, userLoginController)

export default router

