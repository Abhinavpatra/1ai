import express from "express"
import { CreateChatType } from "./types"

const app = express()

app.use(express.json())

app.post("/chat", (req,res)=>{
    const {success, data}= CreateChatType.safeParse(req.body);
    if(!success){
        res.status(411).json({
            message: "Incorrect inputs"
        })
        return
    }
    create
    const {message} = data;
})