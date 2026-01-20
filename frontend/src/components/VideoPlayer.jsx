import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { GoUnmute } from "react-icons/go";
import { GoMute } from "react-icons/go";
import { FaPlay } from "react-icons/fa";
import { CgPlayPauseR } from "react-icons/cg";


const VideoPlayer = ({preview})=>{
    const videoTag = useRef()
    const [mute, setMute] = useState(false)
    const [isPlaying, setIsPlaying] = useState(true)

    const handleClick = ()=>{
        if(isPlaying){
            videoTag.current.pause()
            setIsPlaying(false)
        }else{
            videoTag.current.play()
            setIsPlaying(true)
        }
    }

    return <div className=" w-[90%] h-[90%] relative overflow-hidden  border-amber-50 rounded-2xl cursor-pointer" >
        <video src={preview} ref={videoTag} autoPlay loop muted={mute} className="h-[100%] w-full object-cover" onClick={handleClick}></video>
        <div className=" absolute bottom-1 left-2 text-2xl cursor-pointer" onClick={handleClick}>
           {!isPlaying && <FaPlay />}
           {isPlaying && <CgPlayPauseR />}
        </div>
        <div className=" absolute bottom-1 right-2  text-2xl cursor-pointer" onClick={()=> setMute(!mute)}>
            {mute &&  <GoMute />}
            {!mute && <GoUnmute />}
        </div>
    </div>
}

export default VideoPlayer