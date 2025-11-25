import React from "react"
import dp from "../assets/dp.png"
import { useNavigate } from "react-router-dom"
const OtherUser = ({users})=>{
    const navigate = useNavigate()
    return (
        users && users.slice(0,4).map((user, index)=>{
            return <div className="flex items-center gap-[1rem] mt-[1rem] border-gray-900 border-b-1 pb-3" key={index} onClick={()=> navigate(`/profile/${user.username}`)}>
                    <div className="w-[4rem] cursor-pointer" >
                        <img src={user.profileImage || dp} alt="dp image" className="rounded-[50%] w-[3rem] h-[3rem]" />
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <div>
                            <p className="text-xl">{user.username}</p>
                            <p className="text-gray-400">{user.name}</p>
                        </div>
                        <div className="">
                            <button className="py-[0.5rem] px-[1rem] rounded-lg bg-white text-gray-700 cursor-pointer">Follow</button>
                            </div>
                    </div>
            </div>
        })
    )
}

export default OtherUser