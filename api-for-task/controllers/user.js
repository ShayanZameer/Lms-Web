import { User } from "../models/user.js";
import bcrypt from "bcrypt"
import { sendToken } from "../utils/features.js";


export const getAllUsers = async(req, res) =>{

    const users = await User.find({});
    res.json({
        success: true,
        users
    }) 
}

export const login = async(req, res) =>{

    const {email, password} = req.body;

    let user = await User.findOne({email}).select("+password");

    if(!user) return res.status(404).json({
        success: false,
        message: "Invalid email or password"
    });

    const isMatch = await bcrypt.compare(password, user.password);
    
    
    if(!isMatch) return res.status(404).json({
        success: false,
        message: "Invalid email or password"
    });

    sendToken(user, res, `Welcome back ${user.name}`, 200);
};

export const registerUser = async(req, res) =>{

    const {name, email, password, profile} = req.body;

    let user = await User.findOne({email});


    if(user) return res.status(404).json({
        success: false,
        message: "user already exists"
    })

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashedPassword, profile })
    sendToken(user, res, "Registered successfully", 201);
};

export const updateProfile = async(req, res)=>{
    
}

export const getMyDetails = (req, res)=>{
    res.json({
        success: true,
        user:req.user,
    })
}

export const logout = (req, res)=>{
    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_EVN === "Development"? "lax": "none",
        secure: process.env.NODE_EVN === "Development" ? false: true,
    }).json({
        success: true,
    })
}

// export const updateUser = async(req, res)=>{
//     const { id } = req.params;
//     const user= await User.findById(id);
//     user.updateOne
//     res.json({
//         success: true,
//         user,
//     })
// }

export const deleteUser = async(req, res)=>{
    const { id } = req.params;
    const user= await User.findByIdAndDelete(id);

    res.json({
        success: true,
        message: 'user deleted successfully',
    })
}


export const getSingleUser = async(req, res, next) =>{
    const id = req.params.id;
    const records = await User.findById(id);

    res.status(200).json({
        success: true,
        records,
    })
}
