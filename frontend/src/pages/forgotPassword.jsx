import React, { useState } from "react";
import axios from 'axios'
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const ForgotPassword = ()=>{
    const navigate = useNavigate()
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const [inputText, setInputText] = useState({
            email : false,
            otp : false,
            password : false,
            confirmPassword : false
    })
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    //Error handling
    const [error, setError] = useState('')

    //Send OTP on this email
    const handleSendOTP  = async()=>{
        try{
            setError("")
            const result = await axios.post('http://localhost:4000/api/auth/send-otp', {email}, {withCredentials : true})
            console.log("Result = ",result)
            setLoading(false)
            setStep(2)
        }
        catch(error){
            console.log("Error response = ", error.response?.data)
            setError(error.response?.data?.message)
            setStep(1)
            setLoading(false)
        }
    }
    //Enter the OTP which send on the above email and verify it
    const handleVerifyOTP = async()=>{
        try{
            setError("")
            const result = await axios.post('http://localhost:4000/api/auth/verify-otp', {email, otp}, {withCredentials : true})
            console.log("Result = ",result)
            setLoading(false)
            setStep(3)
        }
        catch(error){
            setError(error.response?.data?.message)
            console.log("Error response = ", error.response?.data)
            setStep(2)
            setLoading(false)
        }
    }
    const handleResetPassword = async()=>{
        try{
            setError("")
            const result = await axios.post('http://localhost:4000/api/auth/reset-password', {email, password, confirmPassword}, {withCredentials : true})
            console.log("Result = ",result)
            setLoading(false)
            navigate('/')
        }
        catch(error){
            setError(error.response?.data?.message)
            console.log("Error response = ", error.response?.data)
            setStep(2)
            setLoading(false)
        }
     }
    return <div>
        {step == 1 && <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 h-[100vh] w-full  flex items-center justify-center p-[1rem]">
            <div className="w-[25rem] h-[70%] bg-white p-[1rem] rounded-md flex flex-col justify-center items-center">
                <h1 className="font-black text-[20px]">Forgot Password</h1>
                {/* Email */}
                {error ? <h1 className="w-full text-start text-red-600 mt-[0.5rem]">{error}</h1> : ""}
                <div className="w-[100%] h-[3.5rem] p-[6px] border-2 border-black rounded-lg relative mt-[1rem]" onClick={()=> setInputText({...inputText, email : true})}>
                    <label htmlFor="email" className={`bg-white absolute left-2  ${inputText.email ? '-top-3 text-sm' : 'top-1/2 -translate-y-1/2 text-base'}`}>Enter Email</label>
                    <input type="email" name="email" id="email" value={email} placeholder="" className="border-none outline-none w-[100%] h-[100%]" onChange={(e)=> setEmail(e.target.value)}/>
                </div>
                <button className="bg-black rounded-lg text-white font-bold mt-[2rem] w-[10rem] p-[0.5rem] cursor-pointer" onClick={()=> {
                    setLoading(true)
                    handleSendOTP()
            }}> {loading ? <ClipLoader size={30} color="white"/> : 'Send OTP'}
            </button>
            </div>
        </div>}

        {step == 2 && <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 h-[100vh] w-full  flex items-center justify-center p-[1rem]">
            <div className="w-[25rem] h-[70%] bg-white p-[1rem] rounded-md flex flex-col justify-center items-center">
                <h1 className="font-black text-[20px]">Forgot Password</h1>
                {/* OTP */}
                {error ? <h1 className="w-full text-start text-red-600 mt-[0.5rem]">{error}</h1> : ""}
                <div className="w-[100%] h-[3.5rem] p-[6px] border-2 border-black rounded-lg relative mt-[1rem]" onClick={()=> setInputText({...inputText, otp:true})}>
                    <label htmlFor="otp" className={`bg-white absolute left-2  ${inputText.otp ? '-top-3 text-sm' : 'top-1/2 -translate-y-1/2 text-base'}`}>Enter OTP</label>
                    <input type="text" name="otp" id="otp" value={otp} placeholder="" className="border-none outline-none w-[100%] h-[100%]" onChange={(e)=> setOtp(e.target.value)}/>
                </div>
                <button className="bg-black rounded-lg text-white font-bold mt-[2rem] w-[10rem] p-[0.5rem] cursor-pointer" onClick={()=> {
                    setLoading(true)
                    handleVerifyOTP()
            }}> {loading ? <ClipLoader size={30} color="white"/> : 'Enter OTP'}
            </button>
            </div>
        </div>}

       {step == 3 && <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 h-[100vh] w-full  flex items-center justify-center p-[1rem]">
            <div className="w-[25rem] h-[70%] bg-white p-[1rem] rounded-md flex flex-col justify-center items-center">
                <h1 className="font-black text-[20px]">Reset Password</h1>
                {/* Error */}
                {error ? <h1 className="w-full text-start text-red-600 mt-[0.5rem]">{error}</h1> : ""}
                {/* Email */}
                <div className="w-[100%] h-[3.5rem] p-[6px] border-2 border-black rounded-lg relative mt-[1rem]" onClick={()=> setInputText({...inputText, password:true})}>
                    <label htmlFor="password" className={`bg-white absolute left-2  ${inputText.password ? '-top-3 text-sm' : 'top-1/2 -translate-y-1/2 text-base'}`}>Enter New Password</label>
                    <input type="password" name="password" id="password" value={password} placeholder="" className="border-none outline-none w-[100%] h-[100%]" onChange={(e)=> setPassword(e.target.value)}/>
                </div>
                <div className="w-[100%] h-[3.5rem] p-[6px] border-2 border-black rounded-lg relative mt-[1rem]" onClick={()=> setInputText({...inputText, confirmPassword:true})}>
                    <label htmlFor="confirmPassword" className={`bg-white absolute left-2  ${inputText.confirmPassword ? '-top-3 text-sm' : 'top-1/2 -translate-y-1/2 text-base'}`}>Enter Confirm Password</label>
                    <input type="password" name="confirmPassword" id="confirmPassword" value={confirmPassword} placeholder="" className="border-none outline-none w-[100%] h-[100%]" onChange={(e)=> setConfirmPassword(e.target.value)}/>
                </div>
                <button className="bg-black rounded-lg text-white font-bold mt-[2rem] w-[10rem] p-[0.5rem] cursor-pointer" onClick={()=> {
                    setLoading(true)
                    handleResetPassword()
            }}> {loading ? <ClipLoader size={30} color="white"/> : 'Reset Password'}
            </button>
            </div>
        </div>}

    </div>
}

export default ForgotPassword