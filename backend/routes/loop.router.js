import express from "express"
import currentUser from "../middlewares/currentUser.js"
import upload from "../middlewares/multer.js"
import { uploadLoop, like, comment, getAllLoops} from "../controllers/loop.controller.js"

const loopRouter = express.Router()

loopRouter.post('/uploadLoop', currentUser, upload.single('media'), uploadLoop)
loopRouter.get('/loops',currentUser, getAllLoops)
loopRouter.get('/like/:loopId',currentUser , like)
loopRouter.post('/comment/:loopId',currentUser, comment)



export default loopRouter