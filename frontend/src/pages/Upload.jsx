import React from "react"
import { IoArrowBackSharp } from "react-icons/io5";
import { FaRegPlusSquare } from "react-icons/fa";
import { useState } from "react";
import { useRef } from "react";
import VideoPlayer from "../components/VideoPlayer.jsx";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { useDispatch,  useSelector } from "react-redux";
import { setPostData } from "../redux/postSlice.js";
import { setLoopData } from "../redux/loopSlice.js";
import { setStoryData } from "../redux/storySlice.js";


const Upload = ()=>{
    const [loading , setLoading] = useState(false)
    const [caption, setCaption] = useState('')
    const [mediaType, setMediaType] = useState('')
    const [uploadType, setUploadType] = useState('post')
    const [preview, setPreview] = useState(null)
    const [backendMedia, setBanckendMedia] = useState(null)
    const mediaInput = useRef()

    const dispatch = useDispatch()
    const {postData} = useSelector(state=> state.post)
    const {loopData} = useSelector(state=> state.loop)
    const {storyData} = useSelector(state=> state.story)

    const handleMedia = async(e)=>{
        const file = e.target.files[0]
        if(file.type.includes("image")){
            setMediaType("image")
        }else{
            setMediaType("video")
        }
        setBanckendMedia(file)
        if(file){
            setPreview(URL.createObjectURL(file))
        }
    }

    const handleUploadPost = async()=>{
        try{
            setLoading(true)
            const formData = new FormData()
            formData.append('caption', caption)
            formData.append('mediaType', mediaType)
            formData.append('media', backendMedia)

            const result = await axios.post('http://localhost:4000/api/post/uploadPost', formData, {withCredentials: true})
            setLoading(false)
            dispatch(setPostData([...postData,result.data]))
        }
        catch(error){
            console.log(error)
            setLoading(false)
        }      
    }

    const handleUploadLoop = async()=>{
        try{
            setLoading(true)
            const formData = new FormData()
            formData.append("caption", caption)
            if(backendMedia){
                formData.append('media', backendMedia)
            }
            const result = await axios.post('http://localhost:4000/api/loop/uploadLoop', formData, {withCredentials : true})
            setLoading(false)
            dispatch(setLoopData([...loopData,result.data]))
            console.log("upload loop : ", result)
        }
        catch(error){
            console.log(error)
            setLoading(false)
        }
    }

    const handleUploadStory = async()=>{
        try{
            setLoading(true)
            const formData = new FormData()
            formData.append("mediaType", mediaType)
            if(backendMedia){
                formData.append("media", backendMedia)
            }
            const result = await axios.post('http://localhost:4000/api/stories/uploadStory',formData, {withCredentials : true})
            setLoading(false)
            dispatch(setStoryData(result.data))
        }
        catch(error){
            console.log(error)
            setLoading(false)
        }
    }


    return <div className="w-[100vw] bg-black relative h-[100vh]" >
        <div className="text-white text-xl flex gap-[1rem] items-center fixed left-[1.5rem] top-[1rem]" >
            <IoArrowBackSharp className="cursor-pointer" onClick={()=> navigate(`/profile/${userData.username}`)}/>
            <div>Upload Media</div>
        </div>
        <div className="w-[100%]  h-[100%] flex flex-col items-center pt-[4rem]">
            <div className="w-[90%] lg:w-full lg:max-w-[45%] p-[0.5rem] rounded-4xl bg-white flex justify-between">
                <div className={`py-[5px] px-[1.5rem] text-center text-black hover:bg-black rounded-4xl hover:text-white font-bold cursor-pointer ${uploadType =="post"? "bg-black text-white" : "bg-white text-black"}`} onClick={()=> setUploadType('post')}>Post</div>
                <div className={`py-[5px] px-[1.5rem] text-center text-black hover:bg-black rounded-4xl hover:text-white font-bold cursor-pointer ${uploadType =="story"? "bg-black text-white" : "bg-white text-black"}`} onClick={()=> setUploadType('story')}>Story</div>
                <div className={`py-[5px] px-[1.5rem] text-center text-black hover:bg-black rounded-4xl hover:text-white font-bold cursor-pointer ${uploadType =="loop"? "bg-black text-white" : "bg-white text-black"}`} onClick={()=> setUploadType('loop')}>Loop</div>
            </div>
           {!preview &&  <div className="w-[75%] h-[40%] lg:w-full lg:max-w-[30%] lg:max-h-[40%] p-[0.5rem] rounded-2xl bg-gray-800 flex flex-col justify-center items-center mt-[2rem] cursor-pointer" onClick={()=>{
                mediaInput.current.click()
            }}>
                <input type="file" accept="multiple/*" name="media" id="" ref={mediaInput} hidden onChange={handleMedia} />
                <FaRegPlusSquare className="text-3xl  text-white" />
                <div className="text-lg  text-white mt-[0.5rem]">Upload {uploadType}</div>
            </div>}
           {mediaType == "image" &&  <div className="w-[75%] h-[40%] lg:w-full lg:max-w-[30%] flex flex-col items-center lg:max-h-[40%] mt-[2rem] cursor-pointer">
                <input type="file" accept="multiple/*" name="media" id="" ref={mediaInput} hidden onChange={handleMedia} />
                <img src={preview} alt={mediaType} className="w-[80%] h-[80%] rounded-2xl" />
                {uploadType!== 'story' && <input type="text" value={caption} onChange={(e)=> setCaption(e.target.value)} className="border-b-2 w-[100%] text-white mt-[1.5rem] outline-none" placeholder="Write caption here.." />}
                <div className="text-black w-[80%] bg-white font-bold text-center rounded-2xl p-[10px] mt-[1rem]" onClick={()=> {
                    if(uploadType == 'post'){
                        handleUploadPost()
                    }else if(uploadType == 'story'){
                        handleUploadStory()
                    }else{
                        handleUploadLoop()
                    }
                }}>{loading ? <ClipLoader /> : `Upload ${uploadType}`}</div>
            </div>}
           {mediaType == "video" &&  <div className="w-[85%]  h-[60%] lg:w-full lg:max-w-[40%] flex flex-col items-center lg:max-h-[40%] mt-[2rem] cursor-pointer">
                <input type="file" accept="multiple/*" name="media" id="" ref={mediaInput} hidden onChange={handleMedia} />
                <VideoPlayer preview={preview}/>
                {uploadType!== 'story' && <input type="text" value={caption} onChange={(e)=> setCaption(e.target.value)} className="border-b-2 w-[90%] text-white mt-[1.5rem] outline-none" placeholder="Write caption here.." />}
                <div className="text-black w-[80%] bg-white font-bold text-center rounded-2xl p-[10px] mt-[1rem]" onClick={()=> {
                    if(uploadType == 'post'){
                        handleUploadPost()
                    }else if(uploadType == 'story'){
                        handleUploadStory()
                    }else{
                        handleUploadLoop()
                    }
                }}>{loading ? <ClipLoader /> : `Upload ${uploadType}`}</div>
            </div>}
        </div>
    </div>
}

export default Upload