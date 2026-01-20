import React from "react";
import { useSelector } from "react-redux";
import StoryCard from "../components/StoryCard";

const StoryPage = () =>{
    const {storyData} = useSelector(state=> state.story)

    return <div className="w-full max-w-[1600px] bg-black flex justify-center">
        <StoryCard story={storyData} />
    </div>
}

export default StoryPage