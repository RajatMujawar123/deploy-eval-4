const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const express = require("express")
const { UserModel } = require('../model/user.model')

const userRouter = express.Router()


userRouter.post("/register", async(req,res)=>{
    try {
        const payload = req.body
        const user = await UserModel.findOne({email: payload.email})
        if(user){
            return res.send({"msg":"user already exist"})
        }
        else{
            const hashpass = await bcrypt.hashSync(payload.password,5)
            payload.password = hashpass

            const newUser = new UserModel(payload)
            await newUser.save()

            return res.send({"msg":"user Register"})
        }
    } catch (error) {
        res.send({"msg":error})
    }
})



userRouter.post("/login", async(req,res)=>{
    try {
        const payload = req.body
        const user  = await UserModel.findOne({email:payload.email})
        if(!user){
            return res.send({"msg":"please signup first"})
        }else{
            const passCorrect = await bcrypt.compareSync(payload.password, user.password)
            if(passCorrect){
                const token = await jwt.sign({email:user,userId:user._id}, "masai")
                res.send({msg: "Login Successful", token})
            }
            else{
                res.send("invalid Credentials")
            }
        }

    } catch (error) {
        res.send({"msg":error})
    }
})

module.exports = {
    userRouter
}