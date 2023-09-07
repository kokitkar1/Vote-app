// Packages Imports
import  express from "express";
import dotenv from 'dotenv';
import cors from 'cors';

//Files Imports
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import voteRoute from './routes/voteRoute.js'
import morgan from "morgan";




dotenv.config(); // for .env file config
connectDB();     // for mongoDB connection
const app = express(); // rets Object


// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));


// Routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/vote', voteRoute)

// app.get('/', (req,res)=>{
//     res.send("welcome sagar")
// })




// listen port
app.listen(process.env.PORT, ()=>{
    console.log(`Sever is running on ${process.env.PORT}`)
})