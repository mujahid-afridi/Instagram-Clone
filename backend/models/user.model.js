import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    profileImage : {
        type : String
    },
    bio : {
        type : String
    },
    profession : {
        type : String
    },
    gender : {
        type :String,
        enum : ['male', 'female', 'others']
    },
    followers : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        }
    ],
    following : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    posts : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Post"
        }
    ],
    saved : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Post"
        }
    ],
    loops : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Loop"
        }
    ],
    story : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Story"
    },
    resetOtp : {
        type : String
    },
    otpExpires : {
        type : Date
    },
    isOtpVerified : {
        type : Boolean,
        default : false
    }
}, {timestamps : true})


userSchema.pre("save", async function () {

    if (!this.isModified("password")) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


const User = mongoose.model("User", userSchema)

export default User