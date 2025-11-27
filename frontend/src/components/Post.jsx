import React from "react";
import VideoPlayer from "./VideoPlayer.jsx";
import { FaHeart } from "react-icons/fa";
import { LuMessageSquareText } from "react-icons/lu";
import { IoMdCopy } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa6";

const Post = ({post})=>{
    return <div className="bg-white w-[full] min-h-450px  p-[10px]">
        <div className="flex justify-between items-center">
            <div className="flex gap-[8px] items-center">
                <div><img src={post.author?.profileImage} alt="profileImage" className="w-[4rem] h-[4rem] rounded-[50%]" /></div>
                <div>{post.author?.username}</div>
            </div>
            <div className="bg-black text-white text-lg font-bold px-[1rem] py-[7px] rounded-2xl">Follow</div>
        </div>
        <div className="mt-[10px] flex justify-center">
            {post.mediaType == "image" && <img src={post.media} alt="post image" className="w-[70%] rounded-xl"/>}
            {post.mediaType == "video" && <video src={post.media} autoPlay muted loop controls className="w-[70%] rounded-xl" /> }
        </div>
        <div className="flex justify-between items-center mt-[10px]">
            <div className="flex gap-[8px] items-center">
                {post.likes.includes(post.author?._id) && <FaHeart className="text-red-700" />}
                {!post.likes.includes(post.author?._id) && <FaRegHeart />}
                
                
                <LuMessageSquareText />
            </div>
            <div>
                <IoMdCopy />
            </div>
        </div>
        {post.caption && <div className="mt-[10px]">{post.caption}</div>}
        
    </div>
}

export default Post