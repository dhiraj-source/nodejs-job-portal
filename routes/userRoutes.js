import express from "express"
import { userController, userDetailsController } from "../controllers/userController.js"
import authMiddleware from "../middlewares/authMidleware.js"
const router = express.Router()

//USER DETAILS || GET
router.get('/get-user', authMiddleware, userDetailsController)

//UPDATE USER || PUT
router.put('/update-user', authMiddleware, userController)

export default router