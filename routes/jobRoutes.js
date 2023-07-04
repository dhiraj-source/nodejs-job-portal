import express from "express";
import authMiddleware from "../middlewares/authMidleware.js";
import { allJobsController, createJobsController, deleteJobsController, filterJobController, updateJobsController } from "../controllers/jobsController.js";

const router = express.Router()


//swagger schema

/**
 * @swagger
 * components:
 *  schemas:
 *      Job:
 *          type: object
 *          required:
 *              - id
 *              - company
 *              - position   
 *              - token                 
 *          properties:
 *              id:
 *                 type: string
 *                 description: The Auto-generated id of job collection
 *                 example: DMNKCASNCANCNNCCDNASNC
 *              company:
 *                 type: string
 *                 description: Company Name
 *              position:
 *                 type: string
 *                 description: job Positions
 *              status:
 *                 type: string
 *                 description: job status
 *              workType:
 *                 type: string
 *                 description: job Work types
 *              workLocation:
 *                 type: string
 *                 description: job work locations
 *              createdBy:
 *                 type: string
 *                 description: job created by user
 *                 content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Job' 
 *              token:
 *                  type: string
 *                  description: add token with Bearer
 *          example:
 *              id: GJRENANDCWMFNMSK
 *              company: ABCD
 *              position: full-stack, backend, dotnet, python etc.
 *              status: pending, reject, interview
 *              workType: full-time, fresher, contract, part-time
 *              workLocation: mumbai, delhi, kolkata etc.
 *              createdBy: DNCVNSDNASN 
 *              
 *                
 */


/**
 * @swgger
 * tags:
 *  name: job
 *  description: jobs apis
 * 
 */

/**
 * @swagger
 * /api/v1/jobs/get-job:
 *   post:
 *      summery: register new user
 *      tags: [job]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Job' 
 *      responses:
 *          200:
 *              description: details found successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Job'
 *          500:
 *              description: something went wrong
 *  
 */

//Get jobs
router.get('/get-job', authMiddleware, allJobsController)



/**
 * @swagger
 * /api/v1/jobs/create-job:
 *  post:
 *      summery: job create page
 *      tags: [job]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                       $ref: '#/components/schemas/Job'
 *      responses:
 *          200:
 *              description: job created successfull
 *              content:
 *                  application/json:
 *                      schema:
 *                           $ref: '#/components/schemas/Job'
 *          500:
 *              description: something went wrong 
 * 
 */

//job create
router.post('/create-job', authMiddleware, createJobsController)

//Update Jobs
router.patch('/update-job/:id', authMiddleware, updateJobsController)

//delete jobs
router.delete('/delete-job/:id', authMiddleware, deleteJobsController)

//filter and stats

router.get('/filter-job', authMiddleware, filterJobController)


export default router