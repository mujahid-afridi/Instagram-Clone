import React from "react";
import logo from '../assets/instagram-logo.webp'
import { FaRegHeart } from "react-icons/fa";
import dp from "../assets/dp.png"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUserData } from "../redux/userSlice.js";
import useGetSuggestedUsers from "../hooks/useGetSuggestedUsers.jsx";
import OtherUser from "./otherUser.jsx";



const LeftHome = ()=>{
    const {userData, suggestedUser} = useSelector(state=> state.user)
    const dispatch = useDispatch()
    const logout = async()=>{
        try{
            const result = await axios.get('http://localhost:4000/api/auth/signout', {withCredentials : true})
            dispatch(setUserData(null))
            console.log("User logout : ",result.data.message)
        }
        catch(error){
            console.log("User logout error : ",error)
        }
    }
    useGetSuggestedUsers() //Getting suggested users on the reload of page  and add in the store
    return <div className="w-[25%] hidden lg:block min-h-[100vh] p-[10px] bg-black border-r-2  border-gray-900 text-white">
        <div className="flex  justify-between items-center">
            <img src={logo} alt="logo" className="w-[3rem] h-[3rem]"/>
            <FaRegHeart className="w-[1.4rem] h-[1.4rem] text-white"/>
        </div>
        {/* Current User */}
        <div className="flex items-center gap-[1rem] mt-[2rem]">
            <div className="">
                <img src={userData.profileImage || dp} alt="dp image" className="w-[6rem] h-[4rem] rounded-[50%] " />
            </div>
            <div className="flex justify-between items-center w-full">
                <div>
                    <p className="text-xl">{userData.username}</p>
                    <p className="text-gray-400">{userData.name}</p>
                </div>
                <div>
                    <p className="text-blue-600 cursor-pointer" onClick={logout}>Logout</p>
                </div>
            </div>
        </div>
        {/* Suggester user */}
        <p className="text-lg mt-[1.4rem]">Suggested Users</p>
        <OtherUser users={suggestedUser} />

    </div>
}

export default LeftHome