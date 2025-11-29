import express from "express"
import { getCurrentUser, suggestedUser , editProfile, getProfile, follow} from "../controllers/user.controller.js"
import currentUser from "../middlewares/currentUser.js" // This middleware add current "userId" in req.userId
import upload from "../middlewares/multer.js"
const userRouter = express.Router()

userRouter.get('/current', currentUser, getCurrentUser) //Get current user
userRouter.get('/suggested',currentUser, suggestedUser) //get suggested user exclude current user
userRouter.get('/getProfile/:username', getProfile)
userRouter.post('/editprofile', currentUser, upload.single("profileImage"), editProfile)
userRouter.get('/follow/:targetUserId',currentUser , follow)

export default userRouter