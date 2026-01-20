import React, { useEffect } from "react";
import logo from '../assets/instagram-logo.webp'
import { FaRegHeart } from "react-icons/fa";
import StoryDp from "./StoryDp";
import Navbar from "./Navbar";
import {useSelector} from 'react-redux'
import axios from "axios";
import { setPostData } from "../redux/postSlice.js";
import useGetAllPosts from "../hooks/useGetAllPosts.jsx";
import Post from "./Post.jsx";

const Feed = ()=>{
    useGetAllPosts()
    const {userData} = useSelector(state=> state.user)
    const {postData} = useSelector(state=> state.post)

    return <div className="w-full lg:w-[50%] bg-black relative min-h-[100vh] lg:h-[100vh] px-[1rem] overflow-y-auto hide-scrollbar">
        <div className="lg:hidden flex  justify-between items-center">
            <img src={logo} alt="logo" className="w-[3rem] h-[3rem]"/>
            <FaRegHeart className="w-[1.4rem] h-[1.4rem] text-white"/>
        </div>
        <div className="overflow-x-auto hide-scrollbar mt-[1rem] flex gap-[15px]  py-[1.5rem]">
            <StoryDp user={userData} />  
            {
                userData.following?.map((follower, index)=>{
                    if(follower.story){
                        return <StoryDp user={follower} key={index}/>
                    }
                })
            }    
        </div>
        <div className="bg-amber-100 rounded-tl-4xl rounded-tr-4xl min-h-[100vh] px-[1rem] pt-[1rem] pb-[5rem]  flex flex-col gap-[1rem]">
                {postData.map((post, index)=>{
                    return <Post post={post} key={index}/>
                })}
                <Navbar />
        </div>

    </div>
}

export default Feed