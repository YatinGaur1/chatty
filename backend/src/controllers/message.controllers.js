import {User} from "../model/user.model.js"
import Message from "../model/message.model.js";
import cloudinary from "../utiles/cloudnary.utile.js";
import { getReceiverSocketId ,io} from "../utiles/socket.js";

export const getUsersForSidebar=async(req,res)=>{
try {
    const loggedInUserId= req.user._id;
    const filteredUsers=await User.find({_id:{$ne:loggedInUserId}}).select("-password");

    res.status(200).json(filteredUsers);
} catch (error) {
    console.log("Error in message controllers",error.message);
    res.status(500).json({message:"Internal Server error"});
}
};

export const getMessages=async(req,res)=>{
try {
    const {idx:userToChatId}=req.params;
    const myId=req.user._id;
    const messages=await Message.find({
        $or:[
            {senderId:myId,receiverId:userToChatId},
            {receiverId:myId,senderId:userToChatId}
        ]
    })
    res.status(200).json(messages);
} catch (error) {
    console.log("Errror in message controller in get message",error.message);
    res.status(500).json({message:"Internal Server error"});
}
};

export const sendMessages=async(req,res)=>{
try {
    const{text,image}=req.body;
    const {idx:receiverId}=req.params;
    const senderId=req.user._id;

    let imageUrl;
    if(image){
        //upload base64 image to cloudinary;
        const uploadResponse=await cloudinary.uploader.upload(image);
        imageUrl=uploadResponse.secure_url;
    }

    const newMessage= new Message({
        receiverId,
        senderId,
        text,
        image:imageUrl
    });
    await newMessage.save();

    //todo:realtime functionality goes here -->socket.io
    const receiverSocketId=getReceiverSocketId(receiverId);
    if(receiverSocketId){
        io.to(receiverSocketId).emit("newMessage",newMessage);
    }
    res.status(201).json(newMessage);
} catch (error) { 
    console.log("Error in sendMessage controller",error.message);
    res.status(500).json({message:"Internal Server error"});
}
};