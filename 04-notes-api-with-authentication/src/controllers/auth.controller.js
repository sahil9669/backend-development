const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const registerUser = async (req,res)=>{

    const {username ,email ,password} = req.body

    const existingUser = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(existingUser){
        return res.status(409).json({
            message:"user already exist"
        })
    }

    const hashedPassword = await bcrypt.hash(password,10)

    const user = await userModel.create({
        username,
        email,
        password:hashedPassword
    })

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

    res.cookie("token",token)

    user.password = undefined

    res.status(201).json({
        message: "user registered successfully",
        user
    })
}

const loginUser = async (req,res)=>{

    const { username,email, password } = req.body

    const user = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(!user){
        return res.status(401).json({
            message:"Invalid username/email or password"
        })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        return res.status(401).json({
            message: "Invalid username/email or password"
        })
    }

    const token = jwt.sign(

        { id: user._id },
        process.env.JWT_SECRET

    )


    res.cookie("token", token)

    user.password = undefined

    res.status(200).json({
        message: "Login successful",
        user
    })
}

module.exports = {loginUser,registerUser}