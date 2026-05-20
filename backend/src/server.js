import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js"
import { connectDB } from "./lib/db.js";
dotenv.config();

const Port=process.env.PORT;
const app=express();

app.use("/api/auth",authRoutes);
app.listen(Port, ()=>{
    console.log("server is runnning ");
    connectDB();
})