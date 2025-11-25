import React from "react";
import dp from "../assets/dp.png"

const StoryDp = (user)=>{
    return <div>
        <div className=" flex justify-center items-center bg-gradient-to-l from-blue-800 to-blue-400 w-[4.5rem] h-[4.5rem] rounded-[50%]">
            <img src={user.profileImage || dp} alt="dp" className="rounded-[50%] w-[4rem] h-[4rem]" />
        </div>
        <p className="text-white truncate w-[4.5rem] text-center">{user.username || 'mujahid123423232'}</p>
    </div>
}

export default StoryDp