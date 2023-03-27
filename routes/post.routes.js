const express = require("express")
const { PostModel } = require("../model/post.model")

const postRouter = express.Router()


postRouter.post("/post", async(req,res)=>{
try {
    const Post = new PostModel(req.body)
    await Post.save()
    res.send({"msg":"New post created"})
} catch (error) {
    res.send({"msg":error})
}
})

postRouter.get("/",async(req,res)=>{
    try {
        const data = await PostModel.find();
        res.send(data)
    } catch (error) {
        res.send({"msg":error})
    }
})

postRouter.get("/:id", async(req,res)=>{
    try {
        const post  = await PostModel.findById(req.params.id)
        res.send(post)
    } catch (error) {
        res.send({"msg":error})
    }
})


postRouter.patch("/update/:id", async(req,res)=>{
    const id = req.params.id
try {
    await PostModel.findByIdAndUpdate({_id:id},req.body)
    res.status(200).send(`Update the post whose id:${id}`)
} catch (error) {
    res.status(400).send({"msg":"something went wrong", error})
}
})


postRouter.delete("/delete/:id", async(req,res)=>{
    let ID = req.params.id
    try {
        await PostModel.findByIdAndDelete({_id:ID})
        res.status(200).send(`Deleted the post whose id:${ID}`)
    } catch (error) {
        res.status(400).send({"msg":"something went wrong", error})
    }
})

module.exports = {
    postRouter
}