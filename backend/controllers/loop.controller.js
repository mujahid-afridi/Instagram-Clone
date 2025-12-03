import uploadOnCloudinary from "../config/cloudinary.js";
import Loop from "../models/loop.model.js";
import User from "../models/user.model.js";

export const uploadLoop = async(req, res)=>{
    try{
        const {caption} = req.body
        let media;
        if(req.file){
            media = await uploadOnCloudinary(req.file.path)
        }
        const loop = await Loop.create({caption, media, author:req.userId})

        const user = await User.findById(req.userId)
        user.loops.unshift(loop._id)
        await user.save()
        
        await loop.populate("author", "name username profileImage")

        return res.status(200).json(loop)
    }
    catch(error){
        return res.status(500).json({message : `Error in uploadLopp : ${error}`})
    }
}


export const getAllLoops = async (req, res)=>{
    try{
        const loops = await Loop.find({}).populate("author", "name username profileImage")
        .populate("comments.author", "name username profileImage")
        .populate("likes")
        
        return res.status(200).json(loops)
    }
    catch(error){
        return res.status(500).json({message:`Error occured in getAllLoops: ${error}`})
    }
}


export const like = async (req,res)=>{
    try{
        const loopId = req.params.loopId
        if(!loopId) return res.status(200).json({message : "Loop does not exist"})
        const loop = await Loop.findById(loopId)
        if(!loop) return res.status(200).json({message : "Loop does not exist"})
        const user = await User.findById(req.userId)
        if(!user) return res.status(400).json({message : "User does not exist"})
        const alreadyLiked = loop.likes.some(id=> id.toString() == user._id.toString())
        if(alreadyLiked){
            loop.likes = loop.likes.filter(likedUser=> likedUser._id.toString() !== user._id.toString())
        }else{
            loop.likes.push (user._id)           
        }
        await loop.save()
        await loop.populate("likes")
        await loop.populate("author")
        await loop.populate("comments.author");
        return res.status(200).json(loop)
    }
    catch(error){
        return res.status(500).json({message : `Error in like to loop : ${error}`})
    }
}

export const comment = async(req, res)=>{
    try{
        const {message} = req.body
        const loopId = req.params.loopId
        if(!message) return res.status(200).json({message : "comment should not empty"})
        if(!loopId) return res.status(200).json({message : "Loop does not exist"})
        const loop = await Loop.findById(loopId)
        const user = await User.findById(req.userId)
        if(!user) return res.status(400).json({message : "User does not exist"})
        loop.comments.unshift({message, author: user._id})
        await loop.save()
        await loop.populate("author")
        await loop.populate("comments.author");
        return res.status(200).json(loop)
    }
    catch(error){
        return res.status(500).json({message : `Error in comment on loop : ${error}`})
    }
}
