import jwt from "jsonwebtoken";

const generateToken = async (userId)=>{
    try{
        const token = await jwt.sign({userId},process.env.SECRETE_KEY, {expiresIn : "10y"})
        return token
    }
    catch(error){
        return res.status(500).json({message : `Error occured in generating toke : ${error}`})
    }
}

export default generateToken