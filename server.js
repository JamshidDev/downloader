const { webhookCallback } = require('grammy');
const express = require('express');
const {bot,token} =require('./telegram-bot/bot')


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
