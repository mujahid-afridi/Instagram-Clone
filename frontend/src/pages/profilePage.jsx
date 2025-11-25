import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setProfileData } from "../redux/userSlice.js";
import { IoArrowBackSharp } from "react-icons/io5";
import dp from "../assets/dp.png"
import Navbar from "../components/Navbar.jsx";

const ProfilePage = ()=>{
    const navigate = useNavigate()
    const {username} = useParams()
    const dispatch = useDispatch()
    const {profileData, userData} = useSelector(state=> state.user)
    console.log("Profile data = ", profileData)
    const handleProfile = async()=>{
        try{
           const result = await axios.get(`http://localhost:4000/api/user/getProfile/${username}`, {withCredentials:true})
            dispatch(setProfileData(result.data))
            console.log("Get Profile : ", result.data)
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        console.log("Hangle profile executed")
        handleProfile()
    }, [username, dispatch])

    return <div className="bg-black min-h-[100vh] px-[1rem] pt-[1rem]">
        <div className="w-full flex justify-between items-center  text-white">
            <div className="cursor-pointer" onClick={()=> navigate('/')}><IoArrowBackSharp className="text-xl font-bold" /></div>
            <div className="text-xl font-bold">{profileData?.username}</div>
            <div className="text-xl text-blue-400 font-bold">Logout</div>
        </div>
        <div className="w-full flex justify-center gap-[1rem] md:gap-[1.5rem] mt-[2rem]">
            <div>
                <img src={profileData?.profileImage || dp} alt="profile image" className="w-[4rem] h-[4rem] rounded-[50%] md:w-[6rem] md:h-[6rem] lg:w-[7rem] lg:h-[7rem]" />
            </div>
            <div>
                <div className="text-lg text-white">{profileData?.username}</div>
                <div className="text-sm text-gray-300">{profileData?.name}</div>
            </div>
        </div>
        <div className="w-full flex justify-center gap-[1rem] md:gap-[3rem] mt-[2rem] items-center">
            <div>
                <div className="text-lg text-white">{profileData?.posts.length}</div>
                <div className="text-sm text-gray-300">Posts</div>
            </div>
            <div>
                <div className="flex items-center gap-[1.5rem]">
                    <div className="flex relative">
                        {/* {profileData && profileData?.followers.slice(0,3).map((user)=>{
                            <div>
                                <img src={user?.profileImage || dp} alt="profile image" className="w-[4rem] h-[4rem] rounded-[50%] md:w-[6rem] md:h-[6rem] lg:w-[7rem] lg:h-[7rem]" />
                            </div>
                        })} */}
                        <div>
                           <img src={profileData?.profileImage || dp} alt="profile image" className="w-[2rem] h-[2rem] rounded-[50%] border-[1px]" />
                        </div>
                        <div className="">
                           <img src={profileData?.profileImage || dp} alt="profile image" className="w-[2rem] h-[2rem] rounded-[50%] border-[1px]  absolute left-[8px] " />
                        </div>
                        <div className="">
                           <img src={profileData?.profileImage || dp} alt="profile image" className="w-[2rem] h-[2rem] rounded-[50%]  border-[1px] absolute left-[16px]" />
                        </div>
                    </div>
                    <div className="text-lg text-white">{profileData?.followers.length}</div>
                </div>
                <div className="text-sm text-gray-300">Followers</div>
            </div>
            <div>
                <div className="flex items-center gap-[1.5rem]">
                    <div className="flex relative">
                        {/* {profileData && profileData?.following.slice(0,3).map((user)=>{
                            <div>
                                <img src={user?.profileImage || dp} alt="profile image" className="w-[4rem] h-[4rem] rounded-[50%] md:w-[6rem] md:h-[6rem] lg:w-[7rem] lg:h-[7rem]" />
                            </div>
                        })} */}
                        <div>
                           <img src={profileData?.profileImage || dp} alt="profile image" className="w-[2rem] h-[2rem] rounded-[50%] border-[1px]" />
                        </div>
                        <div className="">
                           <img src={profileData?.profileImage || dp} alt="profile image" className="w-[2rem] h-[2rem] rounded-[50%] border-[1px]  absolute left-[8px] " />
                        </div>
                        <div className="">
                           <img src={profileData?.profileImage || dp} alt="profile image" className="w-[2rem] h-[2rem] rounded-[50%]  border-[1px] absolute left-[16px]" />
                        </div>
                    </div>
                    <div className="text-lg text-white">{profileData?.following.length}</div>
                </div>
                <div className="text-sm text-gray-300">Following</div>
            </div>
        </div>
        {profileData?._id == userData?._id && <div className="w-full flex justify-center items-center mt-[1rem]">
            <div>
                <button className="py-[0.3rem] px-[1rem] bg-white text-black text-md rounded-md">Edit Profile</button>
            </div>
        </div> }
        {profileData?._id !== userData?._id && <div className="w-full flex justify-center items-center gap-[2rem] mt-[1rem]">
            <div>
                <button className="py-[0.3rem] px-[1rem] bg-white text-black text-md rounded-md">Edit Profile</button>
            </div>
            <div>
                <button className="py-[0.3rem] px-[1rem] bg-white text-black text-md rounded-md">Follow</button>
            </div>
        </div> }
        <div className="w-full flex flex-col items-center mt-[1rem]">
            <div className="w-full max-w-[900px] bg-white min-h-[100vh] text-white rounded-tl-4xl rounded-tr-4xl">
                <Navbar />
            </div>
        </div>
    </div>
}
export default ProfilePage