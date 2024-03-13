import ErrorHandler from "../middlewares/error.js";
import { Leave } from "../models/leave.js";
import { User } from "../models/user.js";


export const newLeave = async(req, res, next) =>{
    const {status, reason, id} = req.body;
    const user = await User.findById(id);

    await Leave.create({ 
        status,
        reason,
        user,
    });
    user.leaves = user.leaves+1;
    await user.save();

    res.status(201).json({
        success: true,
        message: "Leave submitted successfully",
    })


}

export const getAllLeaves = async(req, res, next) =>{
    const records = await Leave.find({});
    if(!records) return next(new ErrorHandler("Records not found", 404));
    res.status(200).json({
        success: true,
        records,
    })
}

export const getMyLeaves = async(req, res, next) =>{
    const userId = req.user._id;
    const records = await Leave.find({user: userId});
    if(!records) return next(new ErrorHandler("Records not found", 404));
    res.status(200).json({
        success: true,
        records,
    })
}

export const getAllLeavesOfSingleUser = async(req, res, next) =>{
    const records = await Leave.find({user: req.params.id});
    if(!records) return next(new ErrorHandler("Records not found", 404));
    res.status(200).json({
        success: true,
        records,
    })
}

export const updateLeave = async(req, res, next) =>{
    const leave = await Leave.findById(req.params.id);
    
    if(!leave) return next(new ErrorHandler("Records not found", 404));
    
    leave.isApproved = !leave.isApproved;

    await leave.save()

    res.status(200).json({
        success: true,
        message: "Leave approved successfully",
    })

}

export const deleteLeave = async(req, res, next) =>{
    const leave = await Leave.findById(req.params.id);
    const {id} = req.body;

    if(!leave) return next(new ErrorHandler("Record not found", 404))
    
    await leave.deleteOne()

    const user = await User.findById(id);
    if(user.leaves > 0){
        user.leaves = user.leaves-1;
    }else return next(new ErrorHandler("leaves count cannot be negative", 400));

    await user.save();


    res.status(200).json({
        success: true,
        message: "Leave deleted successsfully!",
    })
}

export const deleteLeaveOfAUser = async(req, res, next) =>{
    const {id} = req.body;
    const leave = await Leave.deleteMany({user:id});

    res.status(200).json({
        success: true,
        message: "All leaves of current user are deleted successsfully!",
    })
}