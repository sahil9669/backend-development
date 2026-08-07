const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")

const auth = async (req, res, next) => {

    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"unauthorized"
        })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await userModel.findById(decoded.id)

    if (!user) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    req.user = user

    next()
}

module.exports = {auth}