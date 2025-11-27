import uploadOnCloudinary from "../config/cloudinary.js"
import User from "../models/user.model.js"
import fs from "fs"

export const getCurrentUser = async (req, res)=>{
    try{
        const user = await User.findById(req.userId).populate("posts loops")
        if(!user) return res.status(400).json({message : "user not found"})
        return res.status(200).json(user)
    }
    catch(error){
        return res.status(500).json({message: `get current user error : ${error}`})
    }
}

export const suggestedUser = async (req, res)=>{
    try{
        const users = await User.find({
            _id : {$ne : req.userId}
        }).select('-password') //Return all documents without password field
        return res.status(200).json(users)
    }
    catch(error){
        return res.status(500).json({message : `get suggested user error : ${error}`})
    }
}

export const editProfile = async (req, res)=>{
    try{
        const{username, name, bio, profession, gender} = req.body
        const user = await User.findById(req.userId).select("-password")
        if(!user) return res.status(400).json({message : "User does not exist"})
        if(username !== user.username){
            const isUserExist = await User.findOne({username}).select("-password")
            if(isUserExist) return res.status(400).json({message : 'username already in use'})
        }
        

        let profileImage;
        if(req.file){
            profileImage = await uploadOnCloudinary(req.file.path)
        }

        user.username = username
        user.name = name
        user.profileImage = profileImage
        user.bio = bio
        user.profession = profession
        user.gender = gender        

        await user.save()

        return res.status(200).json(user)
    }
    catch(error){
        return res.status(500).json({message : `Error occured in editing profile : ${error}`})
    }
}

export const getProfile = async (req, res)=>{
    try{
        const username = req.params.username
        const user = await User.findOne({username}).select('-password')
        if(!user) return res.status(400).json({message : "User does not exist"})
        
        return res.status(200).json(user)
    }
    catch(error){
        return res.status(500).json({message : `Error occured in getting profile : ${error}`})
    }
}