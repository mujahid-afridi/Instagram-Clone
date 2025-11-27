import express from "express"
import curretUser from '../middlewares/currentUser.js'
import upload from '../middlewares/multer.js'
import { getStoryByUsername, uploadStory, viewStory } from "../controllers/stroy.controller.js"


const storyRouter = express.Router()

storyRouter.post('/uploadStory',curretUser, upload.single('media'), uploadStory)
storyRouter.get('/getStoryByUsername/:username',curretUser, getStoryByUsername)
storyRouter.get('/view/:storyId',curretUser, viewStory)


export default storyRouter