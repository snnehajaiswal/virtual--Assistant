import mongoose, { Mongoose } from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import genToken from "../config/token.js";
 export const signUp=async (req,res)=>{
    try{
       const {name,email,password}=req.body;
       const emailExist=await User.findOne({email})

       if(emailExist){
        return res.status(400).json({message:"Email are already exist !"})
       }

       if(password.length < 6){
        return res.status(400).json({message:"password must be atleast 6 characters !"})
       }

       const hashedPassword=await bcrypt.hash(password,10)

       const user=await User.create({
        name,
        password:hashedPassword,
        email
       })
       const token=await genToken(user._id)

       res.cookie("token",token,{
        httpOnly:true,
        maxAge:7*24*60*60*1000,
        sameSite:"strict",
        secure:false
       })

       return res.status(201).json(user)
    }catch(error){
      return res.status(500).json({message:`Sign Up error ${error}`})
    }
 }


export const Login=async (req,res)=>{
    try{
       const {email,password}=req.body;
       const user=await User.findOne({email})

       if(!user){
        return res.status(400).json({message:"Email does not exists !"})
       }
       const isMatch=await bcrypt.compare(password,user.password)

       if(!isMatch){
         return res.status(400).json({message:"Incorrect password"})
       }
      
       const token=await genToken(user._id)

       res.cookie("token",token,{
        httpOnly:true,
        maxAge:7*24*60*60*1000,
        sameSite:"strict",
        secure:false
       })

       return res.send(200).json(user)
    }catch(error){
      return res.status(500).json({message:`LogIn error ${error}`})
    }
 }

 export const Logout=async (req,res)=>{
   try{
     res.clearCookie("token")
     return res.status(200).json({message:"Logout Successfully"})
   }catch(error){
      return res.status(500).json(`Logout error ${error}`)
   }
 }

 