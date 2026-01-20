import mongoose from "mongoose";

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('DB connected successfully')  
    }
    catch(error){
        console.log("Error occured in connecting with DB = ", error.message)
        throw error
    }
}

export default connectDB