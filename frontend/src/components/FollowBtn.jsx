import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setToggle } from "../redux/userSlice.js";
const FollowBtn = ({targetUserId, tailwind, onFollowChange})=>{
    const dispatch = useDispatch()
    const {following} = useSelector(state=> state.user)

    const isFollowing = following.includes(targetUserId)

    const handleFollowPost = async(targetUserId)=>{
        try{
            const result = await axios.get(`http://localhost:4000/api/user/follow/${targetUserId}`,{withCredentials : true})
            dispatch(setToggle(targetUserId))
            if(onFollowChange){
                onFollowChange()
            }
        }
        catch(error){
            console.log("Error occured in following the user : ", error)
        }   
    }


    return <div>
        <button className={tailwind} onClick={()=> handleFollowPost(targetUserId)}>
            {isFollowing ? "Following" : "Follow"}
        </button>
    </div>
}


export default FollowBtn