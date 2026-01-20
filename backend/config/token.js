import jwt from "jsonwebtoken";

const generateToken =  (userId)=>{
    try{
        const token = jwt.sign({userId},process.env.SECRETE_KEY, {expiresIn : "10y"})
        return token
    }
    catch(error){
        console.log("Error in generating token = ", error.message)
        throw error
    }
}

export default generateToken