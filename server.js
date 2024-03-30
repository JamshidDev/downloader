import { webhookCallback } from "grammy"
import express from "express"
import {bot,token} from "./telegram-bot/bot.js"
import "./config/mongodb.js";


const app = express()
app.use(express.json())



app.use(`/${token}`, webhookCallback(bot, 'express'))
app.get("/", async (req, res)=>{
    await  res.json("Ok")
})




const port = process.env.PORT;
app.listen(port, ()=>{
    console.log(`Server is listening on ${port}`)
});
