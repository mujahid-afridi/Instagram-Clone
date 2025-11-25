import React from "react";
import logo from '../assets/instagram-logo.webp'
import { FaRegHeart } from "react-icons/fa";
import StoryDp from "./StoryDp";
import Navbar from "./Navbar";
import {useSelector} from 'react-redux'

const Feed = ()=>{
    const {userData} = useSelector(state=> state.user)
    return <div className="w-full lg:w-[50%] bg-black relative min-h-[100vh] lg:h-[100vh] p-[1rem] overflow-y-auto hide-scrollbar">
        <div className="lg:hidden flex  justify-between items-center">
            <img src={logo} alt="logo" className="w-[3rem] h-[3rem]"/>
            <FaRegHeart className="w-[1.4rem] h-[1.4rem] text-white"/>
        </div>
        <div className="overflow-x-auto hide-scrollbar mt-[1rem] flex gap-[15px]  py-[1.5rem]">
            <StoryDp  />
            <StoryDp  />
            <StoryDp  />
            <StoryDp  />
            <StoryDp  />
            <StoryDp  />
            <StoryDp  />
        </div>
        <div className="bg-white rounded-tl-4xl rounded-tr-4xl min-h-[100vh] ">
            <Navbar />
        </div>

    </div>
}

export default Feed