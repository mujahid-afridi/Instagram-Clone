import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPostData } from "../redux/postSlice";

const useGetAllPosts = ()=>{
    const dispatch= useDispatch()
    const {userData} = useSelector(state=> state.user)
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
    }, [dispatch, userData])
}

export default useGetAllPosts