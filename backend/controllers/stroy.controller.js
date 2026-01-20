import uploadOnCloudinary from "../config/cloudinary.js";
import Story from "../models/story.model.js";
import User from "../models/user.model.js";

export const uploadStory = async (req, res)=>{
    try{
        const user = await User.findById(req.userId) 
        if(user.story){
            await Story.findByIdAndDelete(user.story._id)
            user.story = null
        }
        const {mediaType} = req.body
        let media;
        if(req.file){
            media = await uploadOnCloudinary(req.file.path)
        }else{
            return res.status(400).json({message : "media is required for story"})
        }

        const story =await Story.create({mediaType, media, author : req.userId})
        user.story = story._id
        await user.save()
        await story.populate("author", "name username profileImage")
        await story.populate("viewers", "name username profileImage")
        return res.status(200).json(story)
    }
    catch(error){
        return res.status(500).json({message : `Error in uploadStory ${error}`})
    }
}
 

export const viewStory = async(req, res)=>{
    try{
        const storyId = req.params.storyId
        const story = await Story.findById(storyId)
        if(!story) return res.status(400).json({message : "Story does not exist"})
        const user = await User.findById(req.userId)
        if(!user) return res.status(400).json({message : "User does not exist"})
        const alreadyViewd = story.viewers.some(id=> id.toString() == user._id.toString())
        if(!alreadyViewd){
            story.viewers.push(user._id)
            await story.save()
        }
        await story
        .populate("viewers", "name username profileImage")
        .populate("author", "name username profileImage")

        return res.status(200).json(story)
    }
    catch(error){
        return res.status(500).json({message : `Error in viewStory : ${error}`})
    }
}


export const getStoryByUsername = async(req, res)=>{
    try{
        const username = req.params.username
        const user = await User.findOne({username : username})
        if(!user) return res.status(400).json({message : "User does not exist"})
        const story = await Story.findOne({author : user._id})
        if(!story) return res.status(400).json({message : "Story does not found"})
        await story.populate("author", "name username profileImage")
        await story.populate("viewers", "name username profileImage")
        return res.status(200).json(story)
    }
    catch(error){
        return res.status(500).json({message : `Error in getting story by username : ${error}`})
    }
}