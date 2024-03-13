import mongoose from "mongoose";

const schema = new mongoose.Schema({
    reason: {
        type: String,
     },
    status: {
       type: String,
       required: true, 
    },
    isApproved: {
        type: Boolean,
        default: false,
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

export const Leave = mongoose.model("Leave", schema);