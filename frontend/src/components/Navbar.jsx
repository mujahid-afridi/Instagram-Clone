import React from "react";
import { GoHomeFill } from "react-icons/go";
import { IoSearchSharp } from "react-icons/io5";
import { GoVideo } from "react-icons/go";
import dp from "../assets/dp.png"
import { FaRegPlusSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = ()=>{
    const navigate = useNavigate()
    const {userData} = useSelector(state=> state.user)
    return <div className=" w-[80%] sm:w-[50%] md:w-[45%] lg:w-[40%]  bg-black p-[10px] rounded-3xl fixed bottom-4 left-1/2 -translate-x-1/2">
        <div className="text-white flex justify-around items-center">
            <GoHomeFill className="text-xl cursor-pointer" onClick={()=> navigate('/')}/>
            <IoSearchSharp className="text-xl cursor-pointer"/>
            <FaRegPlusSquare className="text-xl cursor-pointer" onClick={()=> navigate('/upload')} />
            <GoVideo className="text-xl cursor-pointer" onClick={()=> navigate('/loops')}/>
            <div className=" flex justify-center items-center    cursor-pointer rounded-[50%]" onClick={()=> navigate(`/profile/${userData?.username}`)}>
                <img src={userData?.profileImage || dp} alt="dp" className="rounded-[50%] w-[2rem] h-[2rem]" />
            </div>
        </div>
    </div>
}


export default Navbar