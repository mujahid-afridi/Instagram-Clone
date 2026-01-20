import express from 'express'
import { comment, getAllPosts, like, saved, uploadPost} from '../controllers/post.controller.js'
import currentUser from '../middlewares/currentUser.js'
import upload from '../middlewares/multer.js'


const postRouter = express.Router()

postRouter.post('/uploadPost',currentUser,upload.single("media"), uploadPost)
postRouter.get('/allPosts',currentUser, getAllPosts)
postRouter.get('/like/:postId',currentUser , like)
postRouter.post('/comment/:postId',currentUser, comment)
postRouter.get('/saved/:postId',currentUser , saved)


export default postRouter