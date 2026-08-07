const mongoose = require("mongoose")

const connectDB=async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)

        console.log("mongoDB connected...");
        
    }catch(err){
        console.log("MongoDB Failed...")
    }  
}

module.exports = connectDB