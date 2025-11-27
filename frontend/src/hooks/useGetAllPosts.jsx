import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPostData } from "../redux/postSlice";

const useGetAllPosts = ()=>{
    const dispatch= useDispatch()
    useEffect(()=>{
        const handleGetAllPosts = async()=>{
            try{
                const result = await axios.get('http://localhost:4000/api/post/allPosts', {withCredentials:true})
                // console.log("All posts : ", result.data)
                dispatch(setPostData(result.data))
            }
            catch(error){
                console.log(error)
            }
        }
        handleGetAllPosts()
    }, [dispatch])
}

export default useGetAllPosts