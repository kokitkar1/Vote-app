import mongoose from "mongoose";

// Schema

const voteSchema = new mongoose.Schema({
    candidateName:{
        type: String,
        required: [true, 'User Name Is Required'],
        unique : true,
    },

    candidateNumber: {
        type: Number,
        required: [true, 'Number is required']
    },

    candidateVote: {
        type: String,
        default:0
    },

    },{timestamps: true})


export default mongoose.model('voter', voteSchema)