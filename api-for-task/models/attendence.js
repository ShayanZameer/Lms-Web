import mongoose from "mongoose";

const schema = new mongoose.Schema({
    status: {
       type: String,
       required: true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true 
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

export const Attendence = mongoose.model("Attendence", schema);