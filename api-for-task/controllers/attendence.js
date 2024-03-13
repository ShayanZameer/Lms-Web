import ErrorHandler from "../middlewares/error.js";
import { Attendence } from "../models/attendence.js";
import { User } from "../models/user.js";


export const newAttendence = async(req, res, next) =>{
    const {status, id} = req.body;
    const user = await User.findById(id);
    
    await Attendence.create({
        status,
        user,
    });
    
    
    if(status === "present"){
        user.presents = user.presents+1;
    }else{
        user.absents = user.absents+1;
    }
    await user.save();

    res.status(201).json({
        success: true,
        message: "Attendence marked successfully",
    })


}

export const getMyAttendence = async(req, res, next) =>{
    const userId = req.user._id;
    const records = await Attendence.find({user: userId});

    res.status(200).json({
        success: true,
        records,
    })
}


export const getAttendenceOfSingleUser = async(req, res, next) =>{
    const id = req.params.id;
    const records = await Attendence.find({user: id});

    res.status(200).json({
        success: true,
        records,
    })
}

export const getAllAttendence = async(req, res, next) =>{
    const records = await Attendence.find({});

    res.status(200).json({
        success: true,
        records,
    })

}

export const updateAttendence = async(req, res) =>{
    const attendence = await Attendence.findById(req.params.id);
    const {status, id} = req.body;

    if(!attendence) return res.status(404).json({
        success: false,
        message: "Records not found",
    })

    const user = await User.findById(id);
    if(status === "present"){
        user.presents = user.presents+1;
        user.absents = user.absents-1;
    }else{
        user.presents = user.presents-1;
        user.absents = user.absents+1;
    }
    await user.save();

    attendence.status = status;
    attendence.createdAt = Date.now();

    await attendence.save()

    res.status(200).json({
        success: true,
        message: "Attendence updated successfully",
    })

}

export const deleteAttendence = async(req, res, next) =>{
    const attendence = await Attendence.findById(req.params.id);
    const {id} = req.body;
    if(!attendence) return next(new ErrorHandler("Record not found", 404))

    const user = await User.findById(id);

    if(attendence.status === "present"){
        user.presents = user.presents-1;
    }else{
        user.absents = user.absents-1;
    }
    await user.save();
    

    await attendence.deleteOne()

    res.status(200).json({
        success: true,
        message: "Attendence deleted successsfully!",
    })

}


export const deleteAttendenceOfAUser = async(req, res, next) =>{
    const {id} = req.body;
    const attendence = await Attendence.deleteMany({user:id});

    res.status(200).json({
        success: true,
        message: "All attendence record of current user are deleted successsfully!",
    })
}