import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
     },
     presents:{
        type: Number,
        default: 0
     },
     role:{
        type:String,
        default: "user"
     },
     absents:{
        type: Number,
        default: 0
     },
     leaves:{
        type: Number,
        default: 0
     },
    email: {
       type: String,
       unique: true,
       required: true,
    },
    password: {
        type: String,
        select: false,
        required: true,
    },
    profile:{
        type: String,
        default:""
    },
    grade:{
        type: String,
        default: "D"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

export const User = mongoose.model("User", schema);