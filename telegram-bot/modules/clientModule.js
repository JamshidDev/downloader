import {Composer} from "grammy"
import {detectPlatformByUrl, Platforms} from "../../utils/index.js"
import {downloadVideoFromYouTuBe, downloadVideoFromInstagram} from "../platform/index.js"
import dotenv from "dotenv"
dotenv.config();
import  fs from 'fs'
import path from "path"
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const bot = new Composer()
const pm = bot.chatType("private");
let token = process.env.BOT_TOKEN

const cookiePath = path.join(__dirname, "./cookie.json");
import cookiesJson from '../platform/cookie.json' assert {type :'json'}



pm.on("message:text", async (ctx)=>{
    try{
        const url = ctx.message.text
        const chatId = ctx.from.id
        const platform = detectPlatformByUrl(url)

        if(platform === Platforms.unknown){
            await ctx.reply("Nomalum buyruq!")
            return
        }
        const msg = await ctx.reply("Kuting...")

        const option = {
            chatId:chatId,
            msgId:msg.message_id,
            format:null,
            lang:'uz',
            token,
        }
        if(platform === Platforms.instagram){
            await downloadVideoFromInstagram(url, chatId)
        }else if(platform === Platforms.youtube){
            await downloadVideoFromYouTuBe(url,option)
        }



    }catch (error){
        console.log(error)
    }
})
pm.on('callback_query:data', async (ctx)=>{
    const data = ctx.callbackQuery.data.toString().split('*')
    const messageId = ctx.callbackQuery.message.message_id
    const chatId = ctx.from.id
    const url ="https://www.youtube.com/"+data?.[0]
    const msg = await ctx.reply("Kuting...")
    const option = {
        chatId:chatId,
        msgId:msg.message_id,
        format:null,
        lang:'uz',
        token,
    }

    await ctx.deleteMessages([messageId])
    console.log(data)
    if(data?.[1] === 'video'){
        option.format = 'video'
        await downloadVideoFromYouTuBe(url,option)
    }else if(data?.[1] === 'audio'){
        option.format = 'audio'
        await downloadVideoFromYouTuBe(url,option)
    }






})


export default bot;