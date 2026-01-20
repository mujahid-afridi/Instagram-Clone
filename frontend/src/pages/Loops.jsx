import React, { useEffect } from "react";
import useGetAllLoops from "../hooks/useGetAllLoops";
import { useSelector } from "react-redux";
import LoopCard from "../components/LoopCard.jsx";
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";


const Loops = ()=>{
    useGetAllLoops()
    const navigate = useNavigate('')   
    const {loopData} = useSelector(state=> state.loop) 
    const {userData} = useSelector(state=> state.user)

    return <div className="w-full h-full bg-black flex flex-col items-center relative">
        <div className="text-white text-xl flex gap-[0.5rem] sm:gap-[1rem] items-center fixed z-10 left-[1rem] top-[1rem] sm:left-[1.5rem] sm:top-[1rem]" >
            <IoArrowBackSharp className="cursor-pointer" onClick={()=> navigate(`/`)}/>
            <div>Loops</div>
        </div>
        <div className=" w-screen h-screen  md:w-[500px] md:border-x-2 md:border-gray-600 overflow-y-scroll snap-y snap-mandatory hide-scrollbar">
            {loopData.map((loop, index)=>{
                return <LoopCard loop={loop} userData={userData} key={index}/>
            })}
        </div>
    </div>
}

export default Loops