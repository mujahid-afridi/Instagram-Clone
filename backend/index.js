import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import authRouter from "./routes/auth.router.js"
import userRouter from "./routes/user.router.js"
import postRouter from "./routes/post.router.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import loopRouter from "./routes/loop.router.js"
import storyRouter from "./routes/story.router.js"

const app = express()
dotenv.config()
 
app.use(cors({
    origin : "http://localhost:5173",
    methods : ['GET', 'POST', 'DELETE', 'PATCH', "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials : true,
}))
app.use(express.json()) //Convert incomming JSON data into a usable JS object & without this req.body is undefine
app.use(cookieParser()) //Allow us to access cookies in req without that req.cookies is undefine

app.use("/api/auth",authRouter) // All routes of Authentication and authorzation are handle here
app.use("/api/user", userRouter) // All routes of user
app.use('/api/post', postRouter)
app.use('/api/loop', loopRouter)
app.use('/api/stories', storyRouter)



connectDB()
.then(()=>{
    app.listen(process.env.PORT, ()=>{
    console.log("Server is running on PORT = ",process.env.PORT)})
})
.catch((error)=>{
    console.log("Server failed.Could not connect to DB.")
    process.exit(1)
})