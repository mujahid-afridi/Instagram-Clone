import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : "user",
    initialState : {
        userData : null,
        suggestedUser : [],
        profileData : null
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
        }
    }
})


export const {setUserData, setSuggestedUser, setProfileData} = userSlice.actions //export reducers
export default userSlice.reducer