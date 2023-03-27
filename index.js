const express = require("express")
const { connection } = require("./config/db")
const { auth } = require("./middleware/auth.middleware")
const { userRouter } = require("./routes/users.routes")
require("dotenv").config()
const cors  =require('cors')
const { postRouter } = require("./routes/post.routes")
const app = express()

app.use(express.json())


app.use("/users", userRouter)
app.use(auth)
app.use('/posts', postRouter)






app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Connected to DB")
    } catch (error) {
        console.log({"msg":error})
    }
    console.log(`Server is runnign at ${process.env.port}`)

})