import jwt from "jsonwebtoken";
import {User} from "../model/user.model.js";

export const protectRoute=async(req,res,next)=>{
   try {
     const token=req.cookies.x;//here jwt is cookie name if we give cookie name x then we have to write x instead of jwt.
 
     if(!token){
         return res.status(401).json({message:"Unauthorized -No Token Provided"})
     }
     const decode=jwt.verify(token,process.env.JWT_SCERET);
 
     if(!decode){

         return res.status(401).json({message:"Unauthorized-Invalid token"});
     }
 
     const user=await User.findById(decode.userId).select("-password");
 
     if(!user){
         return res.status(401).json({message:"User not found"});
     }
     
     req.user=user;
     next();
 
   } catch (error) {
    console.log("Error in protectRoute middleware",error.message);
    res.status(501).json({message:"Internal server error"});
   }
};