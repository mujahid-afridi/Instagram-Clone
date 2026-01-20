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
import { IoSend } from "react-icons/io5";

const LoopCard = ({loop, userData})=>{

    const dispatch = useDispatch()
    const {loopData} = useSelector(state=> state.loop)
    const [clickedOnVideo, setClickedOnVideo] = useState(false) //for managing pause and play
    const [isMuted, setIsMuted] = useState(false)
    const [progress, setProgress] = useState(0)
    const [showHeart, setShowHeart] = useState(false);
    const [showCommentsPopup, setShowCommentsPopup] = useState(false)
    const [message, setMessage] = useState('')
    

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
            videoRef.current.play()
        }else{
            videoRef.current.pause()
        }
    }

    

    const handleProgress = ()=>{
        const video = videoRef.current
        const percent = (video.currentTime / video.duration) * 100;
        setProgress(percent)
    }


    const commentPopupRef = useRef()
    useEffect(()=>{
        const handleMouseDownEvent = (e)=>{
            if (!commentPopupRef.current) return;

            if(e.target != commentPopupRef.current && !commentPopupRef.current.contains(e.target)){
                setShowCommentsPopup(false) 
            }else{
                setShowCommentsPopup(true)
            }
        }

        if(showCommentsPopup){
            document.addEventListener("mousedown", (e)=>{handleMouseDownEvent(e)})
        }else{
            document.removeEventListener("mousedown",(e)=>{handleMouseDownEvent(e)})
        }

    },[showCommentsPopup])

     const handleCommentOnLoop = async(loopId)=>{
        try{
            const result = await axios.post(`http://localhost:4000/api/loop/comment/${loopId}`, {message}, {withCredentials : true})
            let updatedLoopsData = loopData.map(loop=>{
                return loop._id == loopId ? result.data : loop
            })
            dispatch(setLoopData(updatedLoopsData))
            setMessage('')
        }
        catch(error){
            console.log("Error occred in comment on post = ", error)
            setMessage('')
        }
    }


    return <div className="snap-center relative overflow-hidden">
        <div className="absolute top-[1.5rem] right-[1rem] z-[100] cursor-pointer" onClick={()=> setIsMuted(!isMuted)}>
            {isMuted ? <VscMute className="text-white text-2xl" /> : <GoUnmute  className="text-white text-2xl "  />}
        </div>
        {/* custom video tag */}
        <video src={loop.media} autoPlay loop  muted={isMuted}  className="h-screen w-screen object-cover" ref={videoRef} onTimeUpdate={handleProgress} onClick={()=> {
            setClickedOnVideo(!clickedOnVideo)
            handleClickOnVideo()
        }} onDoubleClick={()=> handleLikeOnDoubleClick(loop._id)}></video>
        {/* profile image , username , follow btn and caption */}
        <div className="w-full absolute left-[1rem] bottom-[4rem] z-[200] text-white" >
            <div className="flex items-center gap-[15px]" >
                <div className="flex gap-[10px] items-center" >
                    <div><img src={loop.author?.profileImage} alt="profileImage" className="w-[4rem] h-[4rem] rounded-[50%]" /></div>
                    <div>{loop.author?.username?.length > 10 ? loop.author.username.slice(0, 10)+"..." :loop.author?.username }</div>
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
            <LuMessageSquareText className="cursor-pointer text-4xl  text-white" onClick={()=> setShowCommentsPopup(!showCommentsPopup)} />
            <span className="text-lg text-white">{loop.comments?.length}</span>
        </div>
        {/* heart icon on double click */}
        {showHeart && ( <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[300] heart-animation">
            <FaHeart className="text-[5rem] text-white" />
        </div>)}
        {/* show comment popup */}
        <div ref={commentPopupRef}  className={`pt-[15px] absolute z-[400] bottom-0 left-0 w-[100%] h-[65%] rounded-tl-3xl rounded-tr-3xl bg-black transform transition-all duration-300 ease-in-out ${showCommentsPopup ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}>
            <div className="w-[100%] h-[calc(100%-6.5rem)] px-[10px] flex flex-col gap-[15px] items-start overflow-y-auto hide-scrollbar text-white">
                <div className="w-full flex justify-center text-2xl"><h1>Coments</h1></div>
                {
                    loop.comments.map(comment=>{
                        return  <div>
                            <div className="flex gap-[10px] items-center justify-start">
                                <div>
                                    <img src={comment.author?.profileImage} alt="" className="w-[3rem] h-[3rem] rounded-[50%]" />
                                </div>
                                <div>{comment.author?.username}</div>
                            </div>
                            <div className="pl-[3rem]">{comment.message}</div>
                        </div>
                    })
                }
            </div>

            <div className="fixed bg-black w-full h-[6rem] bottom-0 flex justify-center items-end pb-[20px]">
                <div className="w-[90%] flex gap-[10px] text-white border-white border-b-2 pb-2">
                    <div className="flex gap-[8px] items-center">
                        <div><img src={userData?.profileImage} alt="profileImage" className="w-[3.5rem] h-[3rem] rounded-[50%]" /></div>
                    </div>
                    <input type="text" name="comment" id="" value={message} placeholder="Write your comment here" className="w-full outline-none" onChange={(e)=> setMessage(e.target.value)}/>
                    {message && <button className="cursor-pointer" onClick={()=> {handleCommentOnLoop(loop._id)}}><IoSend /></button>}
                </div> 
            </div>

            
        </div>
        
    </div>
}
export default LoopCard