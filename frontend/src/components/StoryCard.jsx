import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { GoMute } from "react-icons/go";
import { GoUnmute } from "react-icons/go";
import { FaPlay } from "react-icons/fa";
import { CgPlayPause } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const StoryCard = ({story})=>{

    const videoRef = useRef(null)
    const navigate = useNavigate()

    const [playVideo, setPlayVideo]  = useState(false)
    const [mute , setMute] = useState(true)
    const [progress, setProgress] = useState(0);

    //Update progress of video
    const handleProgress = ()=>{
        const video = videoRef.current
        const percent = (video.currentTime / video.duration) * 100;
        if(percent==100){
            navigate('/')
        }
        setProgress(percent)
    }

    const handlePlayVideo = ()=>{
        if(playVideo){
            videoRef.current.pause()
        }else{
            videoRef.current.play()
        }
    }

    return <div className="relative border-x-2 border-gray-600">

        <div className="text-white flex items-center justify-between w-full px-2 absolute right-0 top-[1rem]">
            <div className="flex gap-[7px]">
                <div><img src={story.author?.profileImage} alt="profile image" className="rounded-[50%] w-[3rem] h-[3rem]" /></div>
                <div>{story.author?.username} <span>15hr</span></div>
            </div>
            {story.mediaType=="video" &&  <div className="text-2xl flex gap-[10px]">
                {!playVideo && <FaPlay className="z-10"/>}
                {playVideo && <CgPlayPause className="z-10" />}
                {mute == true && <GoMute className="z-10" onClick={()=> setMute(!mute)} />}
                {mute == false && <GoUnmute className="z-10" onClick={()=> setMute(!mute) } />}
            </div>}
        </div>

        {story.mediaType == "image" && <img src={story?.media} alt="story image" className="h-screen w-[500px]" />}
        {story.mediaType == "video" && <video src={story?.media} muted={mute} autoPlay className="h-screen w-full object-cover" onTimeUpdate={handleProgress} ref={videoRef}  onClick={()=>{
            setPlayVideo(!playVideo) 
            handlePlayVideo()
        }} /> }

         {/* progressbar of video */}
        <div className={`h-[10px] bg-red-700 absolute z-20 left-0 top-[0.5rem] rounded-sm`} style={{
            width : `${progress}%`,
            transition: "width 0.2s linear"
        }} ></div>
    </div>
}

export default StoryCard