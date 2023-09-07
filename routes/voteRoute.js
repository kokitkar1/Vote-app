import express  from "express";
import { requireSignIn,isAdmin } from "../middleware/authMiddleware.js";
import { createCandidateController, deleteCandidateController, getCandidateController, getSingleCandidateController, updateCandidateController } from "../controllers/voteController.js";


const router = express.Router();

//route


// 1. For create product route || POST Method
router.post('/create-candidate', requireSignIn,isAdmin,createCandidateController )

// 2. For get product Route  || GET Method
router.get('/get-candidate',getCandidateController)

// 3. For get Single Product Route || GET Method
router.get('/get-candidate/:candidateName',  getSingleCandidateController)

// 4.For delete product photo || DELETE Method
router.delete('/candidate/:cid',requireSignIn,isAdmin,  deleteCandidateController)

// 6. For Update product || PUT Method
router.put('/update-candidate/:cid', requireSignIn,isAdmin, updateCandidateController)

export default router