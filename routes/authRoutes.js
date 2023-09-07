import express from "express";
import { forgotPasswordController, loginController,registerController } from "../controllers/authController.js";
import { requireSignIn,isAdmin } from "../middleware/authMiddleware.js";

//router Object
const router = express.Router();

//1. Register || Post Method
router.post('/register', registerController)

//2. Login  || POST Method
router.post('/login', loginController)

//3. Forgot-password  || POST Method
router.post('/forgot-password', forgotPasswordController)

//4. Protected Route for USER || GET Method
router.get("/user-auth", requireSignIn, (req,res) =>{
    res.status(200).send({ok: true})
})

//5. Protected Route for ADMIN|| GET Method
router.get("/admin-auth", requireSignIn, isAdmin, (req,res) =>{
    res.status(200).send({ok: true})
})

//export
export default router