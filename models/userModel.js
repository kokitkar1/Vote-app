import mongoose from "mongoose";
import validator from "validator";

// Schema

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, 'User Name Is Required'],
        unique : true,
    },

    password: {
        type: String,
        required: [true, 'Password is required']
    },

    email:{
        type: String,
        required: [true, 'Email is Required'],
        unique : true,
        validate: validator.isEmail
    },

    phoneNumber: {
        type: Number,
        required: [true, 'Phone Number is required']
    },

    answer:{
        type:String,
        required:true,
    },

    role:{
        type:Number,
        default:0
    },

    voted:{
        type:Number,
        default:0
    }

    },{timestamps: true})


export default mongoose.model('User', userSchema)