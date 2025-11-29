import uploadOnCloudinary from "../config/cloudinary.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const uploadPost = async(req, res)=>{
    try{
        const {caption, mediaType} = req.body

        let media;
        if(req.file){
            media = await uploadOnCloudinary(req.file.path)
        }else{
            return res.status(400).json({message : "media is necessary for post"})
        }

        const post = await Post.create({caption, mediaType, media, author:req.userId})

        const user = await User.findById(req.userId)
        user.posts.push(post._id)
        await user.save()

        const populatedPost = await Post.find(post._id).populate("author", "name username profileImage")
        return res.status(200).json(populatedPost)
    }
    catch(error){
        return res.status(500).json({message:`Error occured in uploadPost: ${error}`})
    }
}


// export const getAllPosts = async(req, res)=>{
//    try{
//         const username = req.params.username
//         if(!username) return res.status(400).json({message : "User does not exist"})
//         const user = await User.findOne({username})
//         user.populate({
//             path : "posts"
//         })
//         return res.status(200).json(user.posts)
//    }
//    catch(error){
//         return res.status(500).json({message:`Error occured in getAllPosts: ${error}`})
//    }
// }

export const getAllPosts = async (req, res)=>{
    try{
        const posts = await Post.find({}).populate([
            {path : "author", select : "name username profileImage"},
            {path : "comments.author", select : "name username profileImage"},
            {path : "likes", select:"name username profileImage"}
        ]).sort({createdAt : -1})
        return res.status(200).json(posts)
    }
    catch(error){
        return res.status(500).json({message:`Error occured in getAllPosts: ${error}`})
    }
}



export const like = async (req, res)=>{
    try{
        const postId = req.params.postId
        const post = await Post.findById(postId)
        if(!post) return res.status(400).json({message : "Post does not exist."})
        const alreadyLiked = post.likes.some(id=> id.toString() == req.userId.toString())
        if(alreadyLiked){
            post.likes = post.likes.filter(id => id.toString() !== req.userId.toString())
        }else{
            post.likes.push(req.userId)
        }
        await post.save()
        await post.populate("likes")
        await post.populate("author", "name username profileImage")

        return res.status(200).json(post)
    }
    catch(error){
        return res.status(500).json({message:`Error occured in like Post: ${error}`})
    }
}


export const comment = async (req, res)=>{
    try{
        const postId = req.params.postId
        const {message} = req.body
        if(!message) return res.status(400).json({message : "Comment cant be emtpy"})
        const post = await Post.findById(postId)
        if(!post) return res.status(400).json({message : "Post does not exist."})
        post.comments.unshift({message, author : req.userId})

        await post.save()
        await post.populate("author", "name username profileImage")
        await post.populate("likes")
        await post.populate("comments.author")
        return res.status(200).json(post)
    }   
    catch(error){
        return res.status(500).json({message:`Error occured in comment on  Post: ${error}`})
    }
}


export const saved = async(req, res)=>{
    try{
        const postId = req.params.postId
        const post = await Post.findById(postId)
        if(!post) return res.status(400).json({message : "Post does not found"})
        const user = await User.findById(req.userId)
        if(!user) return res.status(400).json({message : "User does not exist"})
        const alreadySaved = user.saved.some( savedPost => savedPost._id.toString() === post._id.toString() )
        if(alreadySaved){
            user.saved = user.saved.filter(savedPost=> savedPost._id.toString() !== post._id.toString())
        }else{
            user.saved.unshift(post._id)
        }
        
        await user.save()
        await user.populate("saved")
        return res.status(200).json(user)
    }
    catch(error){
        return res.status(500).json({message:`Error occured in saved to Post: ${error}`})
    }
}


