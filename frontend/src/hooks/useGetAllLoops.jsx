import axios from "axios"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setLoopData } from "../redux/loopSlice.js"


const useGetAllLoops = ()=>{
    const dispatch = useDispatch()
    const {userData} = useSelector(state=> state.user)
    const {loopData} = useSelector(state=> state.loop)
    useEffect(()=>{
        const getAllLoops = async()=>{
            try{
                const result = await axios.get('http://localhost:4000/api/loop/loops', {withCredentials:true})
                console.log("All loops : ", result.data)
                dispatch(setLoopData(result.data))
            }
                catch(error){
                console.log(error)
            }
        }
        getAllLoops()
    }, [dispatch, userData])    
}

export default useGetAllLoops