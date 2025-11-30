import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setProfileData } from "../redux/userSlice.js";
import { IoArrowBackSharp } from "react-icons/io5";
import dp from '../assets/dp.png'
import Navbar from "../components/Navbar.jsx";
import FollowBtn from "../components/FollowBtn.jsx";
import Post from "../components/Post.jsx";

const ProfilePage = ()=>{
    const navigate = useNavigate()
    const {username} = useParams()
    const dispatch = useDispatch()
    const {profileData, userData} = useSelector(state=> state.user)
    const {postData} = useSelector(state=> state.post)
    const [postType, setPostType] = useState("AllPosts")
    
    const handleProfile = async()=>{
        try{
           const result = await axios.get(`http://localhost:4000/api/user/getProfile/${username}`, {withCredentials:true})
            dispatch(setProfileData(result.data))
            console.log("profile data = ", result.data)
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
                        {profileData && profileData?.followers?.slice(0,3).map((user, index)=>{
                            return <div>
                                <img src={user?.profileImage || dp} alt="profile image" className={`w-[2rem] h-[2rem] rounded-[50%] border-[1px] ${index > 0 ? `absolute left-[${index*8}px]` : ""}` }/>
                            </div>
                        })}                        
                    </div>
                    <div className="text-lg text-white">{profileData?.followers.length}</div>
                </div>
                <div className="text-sm text-gray-300">Followers</div>
            </div>
            <div>
                <div className="flex items-center gap-[1.5rem]">
                    <div className="flex relative">
                        {profileData && profileData?.following?.slice(0,3).map((user, index)=>{
                           return  <div key={index}>
                                <img src={user?.profileImage || dp} alt="profile image" className={`w-[2rem] h-[2rem] rounded-[50%] border-[1px] ${index> 0 ? `absolute left-[${index*8}px] `: ""}`} />
                            </div>
                        })}
                    </div>
                    <div className="text-lg text-white">{profileData?.following.length}</div>
                </div>
                <p className="text-sm text-gray-300">Following</p>
            </div>
        </div>
        {profileData?._id == userData?._id && <div className="w-full flex justify-center items-center mt-[1rem]">
            <div>
                <button className="py-[0.3rem] px-[1rem] bg-white text-black text-md rounded-md" onClick={()=> navigate('/editprofile')}>Edit Profile</button>
            </div>
        </div> }
        {profileData?._id !== userData?._id && <div className="w-full flex justify-center items-center gap-[2rem] mt-[1rem]">
            <div>
                <button className="py-[0.3rem] px-[1rem] bg-white text-black text-md rounded-md">Edit Profile</button>
            </div>
            <FollowBtn tailwind={"py-[0.3rem] px-[1rem] bg-white text-black text-md rounded-md"} targetUserId={profileData?._id} onFollowChange={handleProfile} />
        </div>}
        <div className="w-full flex flex-col items-center mt-[1rem]">
            <div className="w-[100%] md:max-w-[50vw] bg-amber-100 rounded-tl-4xl rounded-tr-4xl min-h-[100vh] px-[1rem] pt-[1rem]  pb-[5rem] flex flex-col gap-[1rem] ">

                <div className="w-full flex justify-center">
                    <div className="w-[90%] lg:w-full lg:max-w-[40%] p-[0.5rem] rounded-4xl bg-white flex justify-center gap-[10px]">
                        <div className={`py-[5px] px-[1.5rem] text-center text-black hover:bg-black rounded-4xl hover:text-white font-bold cursor-pointer ${postType =="AllPosts"? "bg-black text-white" : "bg-white text-black"}`} onClick={()=> setPostType('AllPosts')}>All Posts</div>
                        { profileData?._id == userData?._id &&  <div className={`py-[5px] px-[1.5rem] text-center text-black hover:bg-black rounded-4xl hover:text-white font-bold cursor-pointer ${postType =="SavedPosts"? "bg-black text-white" : "bg-white text-black"}`} onClick={()=> setPostType('SavedPosts')}>Saved Posts</div>}
                     </div>
                </div>
                

                {postType == "AllPosts" &&  postData.map((post, index)=>{
                        return post.author?._id == profileData?._id && ( <Post post={post} key={index}/>)
                    })
                }
                {console.log("UserData = ", userData)}

                {profileData?._id == userData?._id &&   <>
                     {(postType === "SavedPosts" &&
                    postData.filter(post => userData?.saved?.some(savedPost => savedPost._id === post._id)).map((post, index) => (<Post post={post} key={index} />)))}
                </>
                }
                
                <Navbar />
            </div>
        </div>
    </div>
}
export default ProfilePage