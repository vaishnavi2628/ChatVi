import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/user.route.js"
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
dotenv.config();

const Port=process.env.PORT;
const app=express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.listen(Port, ()=>{
    console.log("server is runnning ");
    connectDB();
})