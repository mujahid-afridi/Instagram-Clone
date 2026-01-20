import axios from "axios"
import React, { useEffect } from "react"
import { useDispatch , useSelector} from "react-redux"
import { setSuggestedUser } from "../redux/userSlice.js"

const useGetSuggestedUsers =()=>{
    const dispatch = useDispatch()
    const {userData} = useSelector(state=>state.user)
    useEffect(()=>{
        const getSuggestedUsers = async()=>{
            try{
                const result = await axios.get('http://localhost:4000/api/user/suggested', {withCredentials : true})
                dispatch(setSuggestedUser(result.data))
                console.log("Suggested users= ", result.data)
            }
            catch(error){
                console.log(`Error occur in getting suggested user : ${error}`)
            }
        }
        getSuggestedUsers()
    }, [userData])
}


export default useGetSuggestedUsers