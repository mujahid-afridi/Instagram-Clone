import React, { useEffect, useRef, useState } from "react";
import { LuMessageSquareText } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoopData } from "../redux/loopSlice.js";
import { VscMute } from "react-icons/vsc";
import { GoUnmute } from "react-icons/go";
import FollowBtn from "./FollowBtn.jsx";


const LoopCard = ({loop, userData})=>{

    const dispatch = useDispatch()
    const {loopData} = useSelector(state=> state.loop)
    const [clickedOnVideo, setClickedOnVideo] = useState(false) //for managing pause and play
    const [isMuted, setIsMuted] = useState(false)
    const [progress, setProgress] = useState(0)
    const [showHeart, setShowHeart] = useState(false);

    const handleLike = async(loopId)=>{
        const result  = await axios.get(`http://localhost:4000/api/loop/like/${loopId}`, {withCredentials:true})
        const updatedLoopsData = loopData.map((loop)=> loop._id == loopId ? result.data : loop)
        dispatch(setLoopData(updatedLoopsData))
        console.log("loop after like = ", result.data)
         
    }

    const handleLikeOnDoubleClick = (loopId) =>{
        let isLiked = loop.likes.some(user=> user._id == userData._id)
        if(!isLiked){
            handleLike(loopId)
        }
        setShowHeart(true)
        setTimeout(()=>{
            setShowHeart(false)
        }, 1000)
    }

    const videoRef = useRef()
    useEffect(()=>{
        const observer = new IntersectionObserver(([entry])=>{
            const video = videoRef.current
            if(!video) return;
            if(entry.isIntersecting){
                setIsMuted(false)
                video.muted = false
                video.play()
            }else{
                video.pause()
                video.muted = true
            }
        }, {threshold : 0.6})
        
        if(videoRef.current){
            observer.observe(videoRef.current)
        }

        return ()=> {
            if(videoRef.current){
                observer.unobserve(videoRef.current)
            }
        }

    }, [])

    const handleClickOnVideo = ()=>{
        if(clickedOnVideo){
            console.log("paly video")
            videoRef.current.play()
        }else{
            console.log("pause video")
            videoRef.current.pause()
        }
    }

    

    const handleProgress = ()=>{
        const video = videoRef.current
        const percent = (video.currentTime / video.duration) * 100;
        setProgress(percent)
    }

    return <div className="w-full h-screen snap-center relative">
        <div className="absolute top-[1.5rem] right-[1rem] z-[100] cursor-pointer" onClick={()=> setIsMuted(!isMuted)}>
            {isMuted ? <VscMute className="text-white text-2xl" /> : <GoUnmute  className="text-white text-2xl "  />}
        </div>
        {/* custom video tag */}
        <video src={loop.media} autoPlay loop  muted={isMuted}  className="w-full h-full object-cover" ref={videoRef} onTimeUpdate={handleProgress} onClick={()=> {
            setClickedOnVideo(!clickedOnVideo)
            handleClickOnVideo()
        }} onDoubleClick={()=> handleLikeOnDoubleClick(loop._id)}></video>
        {/* profile image , username , follow btn and caption */}
        <div className="w-full absolute left-[1rem] bottom-[4rem] z-[200] text-white" >
            <div className="flex items-center gap-[15px]" >
                <div className="flex gap-[10px] items-center" >
                    <div><img src={loop.author?.profileImage} alt="profileImage" className="w-[4rem] h-[4rem] rounded-[50%]" /></div>
                    <div>{loop.author?.username.length > 10 ? loop.author.username.slice(0, 10)+"..." :loop.author?.username }</div>
                </div>
                { loop.author?._id !== userData._id && <FollowBtn targetUserId={loop.author?._id} tailwind={"text-white border-2 border-white bg-transparent px-[15px] py-[10px] rounded-4xl"} />}
            </div>
            <div className="mt-[10px]" >{loop.caption.length>50 ? loop.caption.slice(0, 50)+"..." : loop.caption}</div>
        </div>
        {/* progressbar of video */}
        <div className={`h-[10px] bg-white absolute bottom-0 rounded-sm`} style={{
            width : `${progress}%`,
            transition: "width 0.2s linear"
        }} ></div>
        {/* like and comment icon */}
        <div className="flex flex-col items-center justify-center gap-[8px] absolute right-[0.5rem] bottom-[10rem]" >
            {loop.likes.some((user)=> user._id == userData._id)  && <FaHeart className="text-red-700 text-4xl cursor-pointer"  onClick={()=> handleLike(loop._id)} />}
            {!loop.likes.some((user)=> user._id == userData._id) && <FaRegHeart className="cursor-pointer text-4xl  text-white" onClick={()=> handleLike(loop._id)} />}
            <span className="text-lg text-white">{loop.likes?.length}</span>
            <LuMessageSquareText className="cursor-pointer text-4xl  text-white"/>
            <span className="text-lg text-white">{loop.comments?.length}</span>
        </div>
        {/* heart icon on double click */}
        {showHeart && ( <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[300] heart-animation">
            <FaHeart className="text-[5rem] text-white" />
        </div>)}

    </div>
}
export default LoopCard