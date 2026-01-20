import uploadOnCloudinary from "../config/cloudinary.js"
import User from "../models/user.model.js"
import fs from "fs"

export const getCurrentUser = async (req, res)=>{
    try{
        const user = await User.findById(req.userId).populate("posts loops")
        if(!user) return res.status(400).json({message : "user not found"})
        await user.populate('saved')
        await user.populate({
            path : 'story',
            populate : {
                path : "author",
                select: "name username email profileImage"
            }
        })
        await user.populate({
            path : "following",
            populate : [
                {
                    path : "story",
                    select : "media"
                }
            ]
        })
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
        await user.populate("followers")
        await user.populate("following")
        await user.populate(
            {
                path : "saved",
                populate:[
                    {
                        path : "author",
                        select : "name username profileImage"
                    },
                    {
                        path : "comments",
                        populate : {
                            path : "author",
                            select : "name username profileImage"
                        }
                    }
                ]
            }
        )
        return res.status(200).json(user)
    }
    catch(error){
        return res.status(500).json({message : `Error occured in getting profile : ${error}`})
    }
}


export const follow = async(req, res)=>{
    try{      
        const targetUserId = req.params.targetUserId
        const targetUser  = await User.findById(targetUserId)
        if(!targetUser) return res.status(400).json({message : "targetUser does not found"})
        const currentUser = await User.findById(req.userId)
        const alreadyFollow = targetUser.followers.some(followerId=> followerId.toString() === currentUser._id.toString())
        if(alreadyFollow){
            targetUser.followers = targetUser.followers.filter(followerId=> followerId.toString() !== currentUser._id.toString())
            currentUser.following = currentUser.following.filter(followingId=> followingId.toString() !== targetUser._id.toString())
            await targetUser.save()
            await currentUser.save()
            return res.status(200).json({
                following : false,
                message : `successfully unfollow`})
        }else{
            targetUser.followers.push(currentUser._id)
            currentUser.following.push(targetUser._id)
            await targetUser.save()
            await currentUser.save()
            return res.status(200).json({
                following : true,
                message : `successfully follow`})
        } 
    }
    catch(error){
        return res.status(500).json({message: `Error occured in follow : ${error}`})
    }
}