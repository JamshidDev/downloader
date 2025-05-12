import { Worker, isMainThread, workerData, parentPort }  from 'worker_threads'
import ytdl from "@distube/ytdl-core"
import pkg from '@distube/ytdl-core';
const { createAgent, getInfo } = pkg;
import  fs from 'fs'
import {Bot, InlineKeyboard, InputFile, InputMediaBuilder} from "grammy"
import {fileURLToPath} from "url"
const __filename = fileURLToPath(import.meta.url)
const storePath = './downloads'
import { v4 as uuidv4 } from 'uuid';
import path from "path"
import {i18n} from "../i18n/index.js"
import cookiesJson from './cookie.json' assert {type :'json'}
const cookies = cookiesJson.map((v)=>({
    name:v.name,
    value:v.value,
}))
const agentOptions = {
    pipelining:0,
    maxRedirections: 3,
    timeout: 10000,
};


export  const downloadVideoFromYouTuBe = async (url,option) =>{
    try {

        const worker = new Worker(__filename,
            { workerData: { url,option}});

        worker.on('message', (msg) => {
            if(msg === 'STOP'){
                worker.terminate().then((v) => {
                    console.log(`Thread stopped : ${v}`);
                });
            }
        });

        worker.on('error', (err) => {
            console.error('Xato:', err);
        });

        worker.on('exit', (code) => {
            if (code !== 0) console.error(`Worker ${code} kodi bilan to‘xtadi`);
        });

    } catch (error) {
        console.error('Error downloading:', error);
    }
}

const separateThread = async ()=>{
            try{
                const {url,option} = workerData
                const bot = new Bot(option.token)

                const agent = createAgent(cookies, agentOptions)
                const info = await getInfo(url, { agent });
                console.log(info)
                // const info = await ytdl.getInfo(url)
                const thumbnails = info.videoDetails.thumbnails
                const vThumbnail = info.videoDetails.thumbnails[thumbnails.length - 1].url
                const vTitle =info.videoDetails.title
                const urlParam = url.toString().replaceAll('https://youtube.com/','')

                if(!option.format){
                    await bot.api.deleteMessages(option.chatId, [option.msgId])
                    await bot.api.sendPhoto(option.chatId, vThumbnail, {
                        caption:`
📹 <b>${vTitle}</b>

${i18n.t('uz','media_caption')}`
                        ,
                        parse_mode:"HTML",
                        reply_markup:new InlineKeyboard()
                            .text('📹 Video',`${urlParam}*video` )
                            .row()
                            .text('🎵 Music',`${urlParam}*audio` )
                    })

                    parentPort.postMessage('STOP')
                }
                else{
                    const uniqueName = uuidv4()
                    const filePath = path.join(storePath, uniqueName)
                    const formats = info.formats
                    const format = ytdl.chooseFormat(formats, {
                        ...(option.format === 'audio'? {
                            quality: 'highestaudio',
                            filter: 'audioonly',
                        }:{
                            quality: 'highest',
                            filter: (f) => f.hasVideo && f.hasAudio,
                        })

                    });

                    ytdl.downloadFromInfo(info, {format}).pipe(fs.createWriteStream(filePath)) .on('finish', async () => {
                        console.log(`✅ Download complete: ${filePath}`);

                        const videoUrl = new InputFile(filePath)
                        await bot.api.deleteMessages(option.chatId, [option.msgId])

                        if(option.format === 'audio'){
                            await bot.api.sendAudio(option.chatId,videoUrl, {
                                caption:`
📹 <b>${vTitle}</b>

${i18n.t('uz','media_caption')}`,
                                parse_mode:"HTML",
                            })
                        }else{
                            await bot.api.sendVideo(option.chatId,videoUrl, {
                                caption:`
📹 <b>${vTitle}</b>

${i18n.t('uz','media_caption')}`,
                                parse_mode:"HTML",
                            })
                        }

                        fs.unlinkSync(filePath)
                    });


                }















            }catch (error){
                console.log(error)
            }
}



if(!isMainThread){
    await separateThread()
}

