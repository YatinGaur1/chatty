import jwt from "jsonwebtoken";

export const generateToken=(userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_SCERET,{expiresIn:"7d"})

    res.cookie("x",token,{
        maxAge:7*24*60*60*1000,//milisecond
        httpOnly:true,//prevent XSS attacks cross-site scripting attacks
        sameSite:true,//CSRF attack cross-site request  forgery attacks
        secure:process.env.NODE_ENV!=="development",
    } 
    )
    return token;
}