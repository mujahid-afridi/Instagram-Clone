import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/instagram-logo.webp"
import axios from 'axios'
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const SignIn= ()=>{
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [inputText, setInputText] = useState({
        username : false,
        password : false
    })
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSignin  = async()=>{
        try{
            setError("")
            const result = await axios.post('http://localhost:4000/api/auth/signin', {username, password}, {withCredentials : true})
            dispatch(setUserData(result.data))
            setUsername('')
            setPassword('')
            setLoading(false)
            navigate('/signin')
            console.log("Result = ", result.data)
        }
        catch(error){
            console.log("Error response = ", error.response?.data)
            setError(error.response?.data?.message)
            setLoading(false)
        }
    }

    return <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 h-[100vh] w-full  flex items-center justify-center p-[1rem]">
        <div className="w-[25rem] h-[70%] bg-white p-[1rem] rounded-md flex flex-col justify-center items-center">
            <h1 className="font-black text-[20px]">Signin to <span className="font-extrabold text-3xl">Instagram</span></h1>
            {/* Error */}
            {error ? <h1 className="w-full text-start text-red-600 mt-[1rem]">{error}</h1> : ""}
            {/* Username */}
            <div className="w-[100%] h-[3.5rem] p-[6px] border-2 border-black rounded-lg relative mt-[1rem]" onClick={()=> setInputText({...inputText, username:true})}>
                <label htmlFor="username" className={`bg-white absolute left-2  ${inputText.username ? '-top-3 text-sm' : 'top-1/2 -translate-y-1/2 text-base'}`}>Enter Username</label>
                <input type="text" name="username" id="username" value={username} placeholder="" className="border-none outline-none w-[100%] h-[100%]" onChange={(e)=> setUsername(e.target.value)}/>
            </div>
            {/* Password */}
            <div className="w-[100%] h-[3.5rem] p-[6px] border-2 border-black rounded-lg relative mt-[1rem]" onClick={()=> setInputText({...inputText, password:true})}>
                <label htmlFor="password" className={`bg-white absolute left-2  ${inputText.password ? '-top-3 text-sm' : 'top-1/2 -translate-y-1/2 text-base'}`}>Enter Password</label>
                <input type="password" name="password" value={password} id="password" placeholder="" className="border-none outline-none w-[100%] h-[100%]" onChange={(e)=> setPassword(e.target.value)}/>
            </div>
            {/* Forgoet Password */}
            <p className="mt-[1rem] font-black font-bold w-full"><Link to={'/forgot-password'}>Forgot password</Link></p>

            {/* Button */}
            <button className="bg-black rounded-lg text-white font-bold mt-[1rem] w-[10rem] p-[0.5rem] cursor-pointer" onClick={()=> {
                    setLoading(true)
                    handleSignin()
            }}> {loading ? <ClipLoader size={30} color="white"/> : 'Submit'}
            </button>
            <p className="mt-1">Want to create New Account? <span className="text-lg font-bold cursor-pointer"><Link to="/signup">Sign Up</Link> </span></p>
        </div>
        <div className="w-[25rem] h-[70%] bg-black p-[1rem] -ml-2 rounded-4xl flex flex-col justify-center items-center">
            <img src={`${Logo}`} className="h-[10rem] w-[10rem]" alt="logo" />
            <p className="text-white text-lg" >Not Just a Platform, its a VYBE</p>
        </div>
    </div>
}

export default SignIn