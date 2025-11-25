import React from "react";
import LeftHome from "../components/LeftHome.jsx";
import Feed from "../components/Feed.jsx";
import RightHome from "../components/RightHome.jsx";

const Home = ()=>{
    return <div className="flex justify-center items-center overflow-x-hidden ">
       <LeftHome/>
       <Feed/>
       <RightHome/>
    </div>
}

export default Home 