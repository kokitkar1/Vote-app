import userModel from "../models/userModel.js"
import { hashPassword, comparePassword } from "../helpers/authHelpers.js"
import  JWT  from "jsonwebtoken";


export const registerController = async (req,res) =>{
    try {
        const {username, password ,email,phoneNumber,answer} = req.body

        //validate
        if(!username){
            return res.status(400).send({success: false, message: 'Please Provide User Name'})
        }
        if(!password){
            return res.status(400).send({success: false, message: 'Please Provide password'})
        }
        if(!email){
            return res.status(400).send({success: false, message: 'Please Provide email'})
        }
        if(!phoneNumber){
            return res.status(400).send({success: false, message: 'Please Provide Phone Number'})
        }
        if(!answer){
            return res.status(400).send({success: false, message: 'Please Provide Answer'})
        }
        
        

        const existingUser = await userModel.findOne({username})
        const existingUser1 = await userModel.findOne({email})

        if(existingUser){
            return res.status(200).send({
                success: false,
                message: "user Already register please login or Use another username"
            })
        }
        if(existingUser1){
            return res.status(200).send({
                success: false,
                message: "user Already register please login or Register with different Email id"
            })
        }

        //Register user
        const hashedPassword = await hashPassword(password);

        const user = await userModel.create({username, password:hashedPassword, email, phoneNumber,answer})
        res.status(201).send({
            success: true,
            message: 'User created Successfully',
            user
        })


    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: 'Error in Register Controller',
            error
        })
    }
}



//------------------ Login User || Post Method ---------------------------------
export const loginController = async (req,res) =>
{
    try 
    {
        const {username,password} = req.body;

        // Validation
        if(!username || !password){
            return res.status(404).send({
                success:false,
                message: 'Invalid email or Password',
            })
        }

        // Check user
        const user = await userModel.findOne({username})
        if(!user){
            return res.status(404).send({
                success:false,
                message: 'Email is not registered',
            })
        }

        // Compare Password
        const match = await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success: false,
                message: 'Invalid Password'
            })
        }
        
        // Token
        const token = await JWT.sign({_id : user._id}, process.env.JWT_SECRET, {expiresIn: "7d"})

        res.status(200).send({
            success: true,
            message: "Login Successfully",
            user:{
                _id: user._id,
                name: user.username,
                email: user.email,
                phone: user.phoneNumber,
                role: user.role,
            },
            token,
        });
    }
    catch (error) 
    {
        console.log(error);
        res.status(500).send({
            success:false,
            message: 'Error in login',
            error
        })
    }
};


//------------------ Forgot-PasswordController Route || POST Method  ------------------------------
export const forgotPasswordController = async (req,res)=>{
    try {
        const {email,answer,newPassword} = req.body;

        // validation for user enter
        if(!email){
            res.status(400).send({message: "Email is required"})
        }
        if(!answer){
            res.status(400).send({message: "Answer is required"})
        }
        if(!newPassword){
            res.status(400).send({message: "New Password is required"})
        }


        // Check email and answer if correct then only go for change the password
        const user = await userModel.findOne({email,answer})
        // validation for email and answer
        if(!user){
            return res.status(404).send({
                success: false,
                message: "Wrong Email or Answer!"
            })
        }

        const hashed = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id, {password: hashed});
        res.status(200).send({
            success: true,
            message: 'Password Reset Successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: 'Something went wrong',
            error
        })
    }
}





