import generateToken from "../config/token.js"
import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import sendMail from "../config/mail.js"

export const signUp = async (req, res,next)=>{
    try{
        const {name, email, password, username} = req.body
        if(!name || !email|| !password || !username) return res.status(400).json({message : "All fields are  required"})
        const isUserExist = await User.findOne({
            $or:[
                {username},
                {email}
            ]
        })
        if(isUserExist){
            return res.status(400).json({
                message : "User already exist"
            })
        }else {
            if(password.length < 6) return res.status(400).json({message : "Password should be greater than 6 characters."})
            const user = new User({name, email, password, username})
            await user.save()

            const token = await generateToken(user._id) //Generate JWT
            res.cookie("token", token, {
                httpOnly : true,
                maxAge : 10*365*24*60*60*1000, //should in millisecond
                secure : false,
                sameSite : "Strict"
            })

            return res.status(201).json(user)
        }
    }
    catch(error){
        return res.status(500).json({message : `Error occured in signup : ${error}`})
    }
}

export const signIn = async (req, res)=>{
    try{
        const {username, password} = req.body
         if(!password || !username) return res.status(400).json({message : "All fields are  required"})
        const user = await User.findOne({username})
        if(!user) return res.status(400).json({message : "User does not exist by this username."})

        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if(!isPasswordMatch) return res.status(400).json({message : "Password is incorrect."})

        const token = await generateToken(user._id)
        res.cookie('token', token, {
            httpOnly : true,
            maxAge : 10*365*24*60*60*1000,
            secure : false, //we will mark it true in production
            sameSite : "Strict"
        })

        return res.status(200).json(user)
    }
    catch(error){
        return res.status(500).json({message : `Error occured in signin : ${error}`})
    }    
}

export const signOut = async (req, res, next)=>{
    try{
        res.clearCookie("token")
        return res.status(200).json({message : "You have successfully signout."})
    }
    catch(error){
        return res.status(500).json({message : `Error occured in signout: ${error}`})
    }
}

export const sendOTP = async (req, res)=>{
    try{
        const {email} = req.body
        if(!email || !email.includes('@gmail.com')) return res.status(400).json({message : "Proper Email is required"})
        const str = "123456789abcdefghijklmnopquvwrstxyz"
        let generateOTP = ''
        for(let i=0; i<4; i++){
        const index =  Math.floor(Math.random() * str.length)
            generateOTP+=str.charAt(index)
        }
        const user = await User.findOne({email})
        if(!user) return res.status(400).json({message : "User does not exist"})
        user.resetOtp = generateOTP
        user.otpExpires = Date.now() + 5*60*1000 //5mint in millisecond
        user.isOtpVerified = false
        await user.save()
        await sendMail(email, generateOTP)
        return res.status(200).json({message : "OTP send successfully"})
    }
    catch(error){
        return res.status(500).json({message : `Error occured in send OTP : ${error}`})
    }
}

export const verifyOTP = async(req, res)=>{
    try{
        const {email,otp} = req.body
        if(!otp) return res.status(400).json({message : "Correct OTP is required"})
        const user = await User.findOne({email})
        if(!user) return res.status(500).json({message: "User does not exist"}) 
        if(otp == user.resetOtp && user.otpExpires > Date.now()){
            user.isOtpVerified = true
            await user.save()
            return res.status(200).json({message : "OTP verified"})
        }else{
            return res.status(400).json({message : "OTP is incorrect or expired"})
        }
    }
    catch(error){
        return res.status(400).json({message : `Error occured in verifing token : ${error}`})
    }
}

export const resetPassword = async(req, res, next)=>{
    try{
        const {email, password, confirmPassword} = req.body
        const user = await User.findOne({email})
        if(!user.isOtpVerified) return res.status(400).json({message: "Cant reset password until OTP is verified"})
        if(password !== confirmPassword) return res.status(400).json({message: "Password and Confirm Password shoul be similar"})
        user.password = password
        await user.save()
        return res.status(400).json({message : `Reset Password successful`})
    }
    catch(error){
        return res.status(400).json({message : `Error occured in reset password : ${error}`})
    }
}