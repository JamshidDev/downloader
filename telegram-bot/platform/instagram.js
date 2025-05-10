import axios from "axios"
import { Worker, isMainThread, workerData, parentPort }  from 'worker_threads'
const port = process.env.PORT;
import {downloadMedia} from "./source.js"
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url';
dotenv.config();
import dotenv from "dotenv"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let token = process.env.BOT_TOKEN;
const storePath = './downloads'
import { v4 as uuidv4 } from 'uuid';
import {Bot, InputFile, InputMediaBuilder} from "grammy"
import * as FileType from "file-type"

let fileExn = null





export  const downloadVideoFromInstagram = async (url, chatId) =>{
    const worker = new Worker(__filename,
        { workerData: { url, token, chatId } });

    worker.on('message', (result) => {
        console.log(`Natija: ${result}`);
    });

    worker.on('error', (err) => {
        console.error('Xato:', err);
    });

    worker.on('exit', (code) => {
        if (code !== 0) console.error(`Worker ${code} kodi bilan to‘xtadi`);
    });
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
        writer.on('finish', async () => {
            try {
                const fileType = await FileType.fileTypeFromFile(filePath)
                if (fileType) {
                    fileExn = fileType.ext
                } else {
                    console.log('Fayl turi aniqlanmadi (possibly unknown or corrupted)');
                }
                resolve();
            } catch (err) {
                reject(err);
            }
        });

        writer.on('error', reject);
    });

}

const separateThread = async ()=>{

    try{
        const {token,url, chatId} = workerData
        const bot = new Bot(token)
        let mediaGroups = []
        let mediaPaths = []

        const response = await downloadMedia(url)
        for(const item of response.data){
            const uniqueName = uuidv4()

            const filePath = path.join(storePath, uniqueName)
            try{
                await downloadVideo(item.url, filePath)
                let file = null
                if(fileExn === 'mp4'){
                    file = InputMediaBuilder.video(new InputFile(filePath),{ caption:`❤️@Zornavobot orqali yuklab olindi🚀 📥`})
                }else{
                    file = InputMediaBuilder.photo(new InputFile(filePath), { caption:`❤️@Zornavobot orqali yuklab olindi🚀 📥`})
                }
                mediaGroups.push(file)
                mediaPaths.push(filePath)

            }catch (error){
                console.log(error)
            }
        }
        await bot.api.sendMediaGroup(chatId, mediaGroups)
        mediaPaths.forEach((path)=>{
            fs.unlinkSync(path)
        })







    }catch (error){
        console.log(error)
    }

}


if(!isMainThread){
   await separateThread()
}

