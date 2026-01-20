import React from "react";
import dp from "../assets/dp.png"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setStoryData } from "../redux/storySlice";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";

const StoryDp = ({user})=>{

    const dispatch = useDispatch()
    const {userData} = useSelector(state=> state.user)

    const navigate = useNavigate()

    const getStory = async(username)=>{
        try{
            const story =await axios.get(`http://localhost:4000/api/stories/getStoryByUsername/${username}`, {withCredentials:true})
            dispatch(setStoryData(story.data))
            navigate(`/stories/${user.username}`)
        }
        catch(error){
            console.log(error)
        }
    } 

    return <>
        <div onClick={()=> getStory(user.username)}>
            <div className={`relative flex justify-center items-center w-[4.5rem] h-[4.5rem] rounded-[50%] ${user.story?'bg-gradient-to-l from-blue-800 to-blue-400':""}`}>
                <img src={user.profileImage || dp} alt="dp" className="rounded-[50%] w-[4rem] h-[4rem]" />
                {!user.story && user.username==userData.username?<FaPlus  className="text-white text-[20px] absolute bottom-[0px] right-[-5px] cursor-pointer" onClick={()=> navigate('/upload')}/>:null}
            </div>
            <p className="text-white truncate w-[4.5rem] text-center">{user.username}</p>
        </div>
    </>
}

export default StoryDp