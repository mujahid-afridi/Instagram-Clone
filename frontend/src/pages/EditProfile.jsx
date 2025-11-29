import axios from "axios";
import React, { useRef, useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import dp from "../assets/dp.png"
import { setProfileData, setUserData } from "../redux/userSlice.js";
import { ClipLoader } from "react-spinners";

const EditProfile = ()=>{
    const {userData} = useSelector(state=> state.user)
    const [name, setName] = useState(userData.name || "")
    const [username, setUserame] = useState(userData.username || "")
    const [bio, setBio] = useState(userData.bio || "")
    const [profession, setProfession] = useState(userData.profession || "")
    const [gender, setGender] = useState(userData.gender || "")
    const [preview, setPreview] = useState(userData.profileImage || dp)
    const [backendImage, setBackendImage] = useState(null)

    const [loading, setLoading] = useState('flase') 

    const navigate = useNavigate()
    const imageInput = useRef() 
    const dispatch = useDispatch()

    const handleImage = (e)=>{
        const file = e.target.files[0] 
        setBackendImage(file) //file is an object which contains all the the information of file
        setPreview(URL.createObjectURL(file)) //Create tempory url of the image whenever it dos not uploaded on the server like cloudinary
    }

    const handleEditProfile = async()=>{
        try{
            setLoading('true')
            const formData = new FormData()
            formData.append("name", name)
            formData.append("username", username)
            formData.append("gender", gender)
            formData.append("bio", bio)
            formData.append("profession", profession)
            if(backendImage) {
                formData.append("profileImage", backendImage)
            }

            const result = await axios.post('http://localhost:4000/api/user/editprofile',formData, {withCredentials: true})
            dispatch(setUserData(result.data))
            dispatch(setProfileData(result.data))
            setLoading('false')
            navigate(`/profile/${userData.username}`)
        }
        catch(error){
            navigate(`/profile/${userData.username}`)
            setLoading('false')
            console.log("Error occured in editing profile : ", error)
        }
    }

    return <div className="bg-black min-h-[100vh] relative pt-[4rem]">
        <div className="text-white text-xl flex gap-[1rem] items-center fixed left-[1.5rem] top-[1rem]" >
            <IoArrowBackSharp className="cursor-pointer" onClick={()=> navigate(`/profile/${userData.username}`)}/>
            <div>Edit Profile</div>
        </div>
        <div className="w-full flex flex-col items-center gap-[1rem]">
            <div onClick={()=> imageInput.current.click()} className="cursor-pointer">
                <input type="file" accept="image/*" hidden ref={imageInput} onChange={handleImage}/>
                <img src={preview} alt="profile image" className="w-[4rem] h-[4rem] rounded-[50%] md:w-[6rem] md:h-[6rem] lg:w-[7rem] lg:h-[7rem]" />
            </div>
            <div className="text-blue-400 cursor-pointer" onClick={()=> imageInput.current.click()}>Change your profile image</div>
            <input type="text" value={name} onChange={(e)=> setName(e.target.value)} placeholder="Enter name" className="text-white outline-none p-[1rem] border-amber-100 border-1 w-[80%] md:w-[50%] rounded-xl"/>
            <input type="text" value={username} onChange={(e)=> setUserame(e.target.value)} placeholder="Enter username" className="text-white outline-none p-[1rem] border-amber-100 border-1 w-[80%] md:w-[50%] rounded-xl"/>
            <input type="text" value={gender} onChange={(e)=> setGender(e.target.value)} placeholder="Gender .." className="text-white outline-none p-[1rem] border-amber-100 border-1 w-[80%] md:w-[50%] rounded-xl"/>
            <input type="text" value={bio} onChange={(e)=> setBio(e.target.value)} placeholder="Bio..." className="text-white outline-none p-[1rem] border-amber-100 border-1 w-[80%] md:w-[50%] rounded-xl"/>
            <input type="text" value={profession} onChange={(e)=> setProfession(e.target.value)} placeholder="Profession..." className="text-white outline-none p-[1rem] border-amber-100 border-1 w-[80%] md:w-[50%] rounded-xl"/>
            <button className="text-black font-bold bg-white py-[10px] px-[3rem] rounded-xl cursor-pointer" onClick={handleEditProfile}>{loading=='true' ? <ClipLoader /> : "Save Changes"}</button>
        </div>
    </div>
}

export default EditProfile