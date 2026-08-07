const express = require("express")
const app = express()
const postModel=require('./models/post.model')
const cors = require("cors")

const multer = require('multer')
const uploadFile = require("./services/storage.service")

const upload = multer({storage:multer.memoryStorage()})

app.use(cors())
app.use(express.json())

app.post("/create-post",upload.single("image"),async (req,res)=>{

    const result = await uploadFile(req.file.buffer)

    await postModel.create({
        image:result.url,
        caption:req.body.caption
    })
    
    res.status(201).json({
        message:"post created"
    })
})

app.get("/posts",async (req,res)=>{

    const posts = await postModel.find()

    res.status(200).json({
        message:'posts fetched',
        posts
    })
})

module.exports = app