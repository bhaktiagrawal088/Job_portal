import {user, User} from "../models/user.model.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res ) => {
    try {
        const {fullname, email, phoneNumber, password, role} = req.body;
        if(!fullname || !email || !phoneNumber || !password || !role){
            return res.status(400).json({
                message : "Something is missing",
                success : false
            })
        }

        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                message: "User already exit with this email",
                success : false,

            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            fullname,
            email,
            phoneNumber,
            password : hashedPassword,
            role,
        })
        return res.status(201).json({
            message : "Account created successfully",
            success : true
        })

    } catch (error) {
        console.log(error);
        
    }
}

export const login = async (req, res) => {
    try {
        const {email, password, role} = req.body;
        if(!email || !password || !role){
            return res.status(400).json({
                message: "Something is missing",
                success : false
            })
        }
        // check is email is correct or not
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message : "Indirect email or password",
                success : false
            })
        }
        // check is password is correct or not
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message : "Incorrect password. Please enter again",
                success : false,
            })
        }

        // check is role is correct or not
        if(role !== user.role){
            return res.status(400).json({
                message: "Account doesn't exit with current role",
                success : false,
            })
        }

        // create the token
        const tokenData = {
            UserId : user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY,{expiresIn: '1d'});
         
        user = {
            _id : user.id,
            fullname : user.fullname,
            email : user.email,
            phoneNumber : user.phoneNumber,
            role : user.role,
            profile : user.profile

        }
        return res.status(200).cookie("token", token, {maxAge : 1*24*60*60*1000, httpsOnly: true, sameSite : "strict"}).json({
            message : `Welcome back ${user.fullname}`,
            user,
            success : true
        })


    } catch (error) {
        console.log(error);
        
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge: 0}).json({
            message : "Logged out Successfully",
            success : true
        })
    } catch (error) {
       console.log(error);
        
    }
}

export const updateProfile = async (req,res) => {
    try {
        const {fullname, email, phoneNumber, bio, skill} = req.body;
        const file = req.file;
        if(!fullname || !email || !phoneNumber || !bio || !skill){
            return res.status(400).json({
                message : "Something is missing",
                success : false
            })
        }

        //cloundinary

        const skillArray = skill.split(",");
        const userId = req.id; // middleware authencation
        let user  =  await User.findOne(userId);
        if(!user){
            return res.status(400).json({
                message : "User not found",
                success : false
            })
        }

        // update data
        user.fullname = fullname;
        user.email = email;
        user.phoneNumber = phoneNumber;
        user.profile.bio = bio;
        user.profile.skill = skillArray;

        // resume

        await user.save();

        user  = {
            _id : user._id,
            fullname : user.fullname,
            email : user.email,
            phoneNumber : user.phoneNumber,
            role : user.role,
            profile : user.profile
        }

        return res.status(200).json({
            message : "Profile updated successfully ",
            user,
            success : true
        })
        
    } catch (error) {
        console.log(error);
        
        
    }
}