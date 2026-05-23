

import jwt from "jsonwebtoken";
import User from "../models/User";

export async function signup(req,res){
   const {email,password,fullName}=req.body;

    try {
        if(!email||!password||!fullName){
            return res.status(400).json({
                message:"All fields are required";
            });
        }

        if(password.length<6){
            return res.status(400).json({
                message:"Password must be at least 6 chacaters"
            });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    const existingUser=User.findOne({email});
    if(existingUser){
        return res.status(400).json({
            message:"Email already exist"
        });
    }

    const avatar=`https://api.dicebear.com/9.x/pixel-art/svg?seed=Jane&hair=long01,long02,long03,long04,long05`;
    const newUser= new User.create({
        email,
        fullName,

        password,
        profilePic:avatar,
    });
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "7d",
      });
      

       
    } catch (error) {
        
    }




}

export async function login(req,res){
    res.send("login routeiiiii");
}


export  async function logout(req,res){
    res.send("logout route");
}

