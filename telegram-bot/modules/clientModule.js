import {Composer, InputFile, InputMediaBuilder} from "grammy"
import {detectPlatformByUrl, Platforms} from "../../utils/index.js"
import {downloadVideoFromYouTuBe, downloadVideoFromInstagram} from "../platform/index.js"
import axios from "axios"
import fs from "fs"
import path from 'path';

import { v4 as uuidv4 } from 'uuid';
const bot = new Composer();

const pm = bot.chatType("private");




pm.on("message:text", async (ctx)=>{
    try{
        const url = ctx.message.text
        const chatId = ctx.from.id
        const platform = detectPlatformByUrl(url)

        if(platform === Platforms.unknown){
            await ctx.reply("Nomalum buyruq!")
            return
        }
        await ctx.reply("Kuting...")

        if(platform === Platforms.instagram){
            await downloadVideoFromInstagram(url, chatId)
        }else if(platform === Platforms.youtube){
            await downloadVideoFromYouTuBe(url, chatId)
        }



    }catch (error){
        console.log(error)
    }

})


const sendVideo = async(videos, ctx)=>{

    for(const item of videos){
        const uniqueName = uuidv4() + '.mp4'
        const filePath = path.join('./downloads', uniqueName)
        console.log(filePath)
        try{
            await downloadVideo(item.url, filePath);
            const video = InputMediaBuilder.video(new InputFile(filePath));
        }catch (error){
            console.log(error)
        }
    }

}

const downloadVideo = async (url, filePath)=>{
    const writer = fs.createWriteStream(filePath);
    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream',
    });
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
        writer.on('finish', resolve)
        writer.on('error', reject)
    });

}

export default bot;