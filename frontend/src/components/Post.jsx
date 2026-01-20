import React, { useEffect, useRef, useState } from "react";
import VideoPlayer from "./VideoPlayer.jsx";
import { FaHeart } from "react-icons/fa";
import { LuMessageSquareText } from "react-icons/lu";
import { FaRegBookmark } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { setPostData } from "../redux/postSlice.js";
import { setUserData } from "../redux/userSlice.js";
import FollowBtn from "./FollowBtn.jsx";


const Post = ({post})=>{
    const {userData} = useSelector(state=> state.user)
    const {postData} = useSelector(state=> state.post)
    const dispatch = useDispatch()
    const [showMessage, setShowMessage] = useState(false)
    const [message, setMessage] = useState('')

    const handleLikeOnPost = async(postId)=>{
        try{
            const result = await axios.get(`http://localhost:4000/api/post/like/${postId}`, {withCredentials: true})
            let updatedPostData  = postData.map((post)=>{
                return post._id == postId ? result.data : post 
            })
            dispatch(setPostData(updatedPostData))
        }
        catch(error){
            console.log("Error occred in like post = ", error)
        }
    }

    const handleCommentOnPost = async(postId)=>{
        try{
            const result = await axios.post(`http://localhost:4000/api/post/comment/${postId}`, {message}, {withCredentials : true})
            let updatedPostData = postData.map(post=>{
                return post._id == postId ? result.data : post
            })
            dispatch(setPostData(updatedPostData))
        }
        catch(error){
            console.log("Error occred in comment on post = ", error)
        }
    }

    const handleSavedPost = async(postId)=>{
        try{
            const result = await axios.get(`http://localhost:4000/api/post/saved/${postId}`,{withCredentials : true})
            dispatch(setUserData(result.data))
        }
        catch(error){
            console.log("Error occred in saved on post = ", error)
        }
    }


    const videoRef = useRef()
    useEffect(()=>{
        const observer = new IntersectionObserver(([entry])=>{
            const video = videoRef.current
            if(!video) return;
            if(entry.isIntersecting){
                // video.muted = false
                video.play()
            }else{
                video.pause()
                // video.muted = true
            }
        }, {threshold : 0.9})
        
        if(videoRef.current){
            observer.observe(videoRef.current)
        }

        return ()=> {
            if(videoRef.current){
                observer.unobserve(videoRef.current)
            }
        }
    
    }, [])

    return <div className="bg-white w-[full] min-h-450px  p-[10px] rounded-2xl">
        <div className="flex justify-between items-center">
            <div className="flex gap-[8px] items-center">
                <div><img src={post.author?.profileImage} alt="profileImage" className="w-[4rem] h-[4rem] rounded-[50%]" /></div>
                <div>{post.author?.username}</div>
            </div>
            {post.author?._id != userData._id && <FollowBtn tailwind={"bg-black text-white text-lg font-bold px-[1rem] py-[7px] rounded-2xl"} targetUserId={post.author?._id} />}
        </div>
        <div className="mt-[10px] flex justify-center max-h-[50vh]">
            {post.mediaType == "image" && <img src={post?.media} alt="post image" className="w-[70%] rounded-xl"/>}
            {post.mediaType == "video" && <video src={post?.media} muted  loop controls className="w-[70%] rounded-xl" ref={videoRef} /> }
        </div>
        <div className="flex justify-between items-center mt-[10px]">
            <div className="flex gap-[8px] items-center">
                {post.likes.some((user)=> user._id == userData._id)  && <FaHeart className="text-red-700 text-xl cursor-pointer" onClick={()=>{
                    handleLikeOnPost(post._id)
                }} />}
                {!post.likes.some((user)=> user._id == userData._id) && <FaRegHeart className="cursor-pointer text-xl" onClick={()=>{
                    handleLikeOnPost(post._id)
                }} />}
                <span className="text-sm">{post.likes?.length}</span>
                <LuMessageSquareText className="cursor-pointer text-xl" onClick={()=> setShowMessage(!showMessage)}/>
                <span className="text-sm">{post.comments?.length}</span>
            </div>
            <div className="text-xl cursor-pointer" onClick={()=> handleSavedPost(post._id)}>
               {userData.saved.some(savedPost => savedPost._id == post._id) ? <FaRegBookmark className="text-blue-700" /> : <FaRegBookmark />
                }
            </div>
        </div>
        { showMessage && <div className="w-full mt-[10px] flex justify-center">
            <div className="w-[90%] div flex gap-[10px] relative">
                <div className="flex gap-[8px] items-center">
                    <div><img src={userData.profileImage} alt="profileImage" className="w-[3.5rem] h-[3rem] rounded-[50%]" /></div>
                </div>
                <input type="text" name="comment" id="" placeholder="Write your comment here" className="w-full outline-none border-b-2" onChange={(e)=> setMessage(e.target.value)}/>
                <button className="cursor-pointer" onClick={()=> {handleCommentOnPost(post._id)}}><IoSend /></button>
            </div>    
        </div>}
        {post.caption && <div className="mt-[10px]">{post.caption}</div>}
    </div>
}

export default Post