import express from "express"
import { testController } from "../controllers/authController.js"
const router = express.Router()


router.post('/test-post', testController)

export default router