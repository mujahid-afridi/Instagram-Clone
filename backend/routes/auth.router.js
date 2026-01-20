import express from "express"
import { signUp , signIn, signOut, sendOTP, verifyOTP, resetPassword} from "../controllers/auth.controller.js"
const authRouter = express.Router()
import currentUser from "../middlewares/currentUser.js"

authRouter.post('/signup', signUp)
authRouter.post('/signin', signIn)
authRouter.get('/signout', signOut)
authRouter.post('/send-otp', sendOTP)
authRouter.post('/verify-otp', verifyOTP)
authRouter.post('/reset-password', resetPassword)


export default authRouter