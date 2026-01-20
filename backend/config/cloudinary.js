import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'
dotenv.config()
import fs from 'fs'

const uploadOnCloudinary = async(filePath)=>{
    try{
        cloudinary.config({ 
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
            api_key: process.env.CLOUDINARY_API_KEY, 
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: 'auto',
        })

        fs.unlinkSync(filePath)

        return result.secure_url
    }
    catch(error){
        console.log("Cloudinary upload error", error)
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        return null;
    }
}
export default uploadOnCloudinary
