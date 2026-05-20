import mongoose from "mongoose"

export const connectDB=async()=>{
    try{ 
     const conn=   await mongoose.connect(process.env.MONGO_URI);
        console.log("connection done");
    }
    catch(error){
   console.log("connection failed to mongodb");
    }
}