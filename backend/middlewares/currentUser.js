import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

const currentUser = async (req, res, next)=>{
    try{
        const token = req.cookies.token
        if(!token) return res.status(400).json({message : "token is not found"})
        
        const verifiedToken = jwt.verify(token, process.env.SECRETE_KEY)
        
        req.userId = verifiedToken.userId
        next()
    }
    catch(error){
        return res.status(400).json({message : `Error occured in getting current user :  ${error}`})
    }
}

export default currentUser