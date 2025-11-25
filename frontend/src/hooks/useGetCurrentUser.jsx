import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice.js";

const useGetCurrentUser = () =>{
    const dispatch = useDispatch()
    const {userData} = useSelector(state=>state.user)
    useEffect(()=>{
        const fetchUser = async ()=>{
            try{
                const result = await axios.get('http://localhost:4000/api/user/current', {withCredentials:true})
                console.log("Current user = ", result.data)
                dispatch(setUserData(result.data))
            }
            catch(error){
                console.log(`Current User = ${error}`)
            }
        }
        fetchUser()
    }, [])
}

export default useGetCurrentUser