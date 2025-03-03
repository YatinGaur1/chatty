//const express=require("express");

import express from "express";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js"
import cookieParser from "cookie-parser";
import cors from "cors"
import dotenv from "dotenv";
import { connectDB } from "./libs/db.libs.js";
import { app,server } from "./utiles/socket.js";
import path from "path"


dotenv.config(
    {
        path:"./src/.env"
    }
);
const PORT=process.env.PORT;
const __dirname=path.resolve();

app.use(express.json());//from this we can get a json data from req.body etc
app.use(cookieParser());//allow u to grap jwt from cookie;
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))//this is for connected frontend to backend

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })
}

server.listen(PORT,()=>{
    console.log("server is running on port",PORT);
    connectDB();
}) 
//project completed
