import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : "user",
    initialState : {
        userData : null,
        suggestedUser : [],
        profileData : null,
        following : []
    },
    reducers : {
        setUserData : (state, action)=>{
            state.userData = action.payload
        },
        setSuggestedUser : (state, action)=>{
            state.suggestedUser = action.payload
        },
        setProfileData : (state, action)=>{
            state.profileData = action.payload
        },
        setFollowing : (state, action)=>{
            state.following = action.payload
        },
        setToggle : (state, action)=>{
            const targetUserId = action.payload
            const isFollowing = state.following.includes(targetUserId)
            if(isFollowing){
                state.following = state.following.filter(id=> id !== targetUserId)
            }else{
                state.following.push(targetUserId)
            }
        }
    }
})


export const {setUserData, setSuggestedUser, setProfileData, setFollowing ,setToggle} = userSlice.actions //export reducers
export default userSlice.reducer