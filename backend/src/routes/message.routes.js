import express from "express"
import { protectRoute } from "../middlewares/auth.middlewares.js";
import { getMessages, getUsersForSidebar, sendMessages } from "../controllers/message.controllers.js";


const router=express.Router();

router.get("/users",protectRoute,getUsersForSidebar);
router.get("/:idx",protectRoute,getMessages);

router.post("/send/:idx",protectRoute,sendMessages);

export default router;