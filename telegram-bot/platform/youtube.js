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
const cookies = [
    {
        domain: ".youtube.com",
        expirationDate: 1779635625.202032,
        hostOnly: false,
        httpOnly: false,
        name: "__Secure-1PAPISID",
        path: "/",
        sameSite: "unspecified",
        secure: true,
        session: false,
        storeId: "0",
        value: "n58sYYPA52adStQG/Av8lPWSO4FCWPtRaV",
        id: 1
    },
    {
        domain: ".youtube.com",
        expirationDate: 1779635625.202441,
        hostOnly: false,
        httpOnly: true,
        name: "__Secure-1PSID",
        path: "/",
        sameSite: "unspecified",
        secure: true,
        session: false,
        storeId: "0",
        value: "g.a000wAjwJF6m8Lg8kiqO_UO_6k0AvTRsW4C1KhF0YtfUyHcDJ-H2BSlQMkenFTRK-i55_iGvtgACgYKAZsSAQASFQHGX2MipTcQ1J4PdxIVvCqwOeGujBoVAUF8yKpjDLizMARig4D4jZmXxM7v0076",
        id: 2
    },
    {
        domain: ".youtube.com",
        expirationDate: 1778732121.758713,
        hostOnly: false,
        httpOnly: true,
        name: "__Secure-1PSIDCC",
        path: "/",
        sameSite: "unspecified",
        secure: true,
        session: false,
        storeId: "0",
        value: "AKEyXzXWK4f7Cywd2L-s38CYf1a1Ied9Vl59gf63Mqe2gIBz0CW7leGQtqkRZC4EaefgRSrSliE",
        id: 3
    },
    {
        domain: ".youtube.com",
        expirationDate: 1778650180.126391,
        hostOnly: false,
        httpOnly: true,
        name: "__Secure-1PSIDTS",
        path: "/",
        sameSite: "unspecified",
        secure: true,
        session: false,
        storeId: "0",
        value: "sidts-CjEBjplskDu6VqWdTVNEK8DjgpvCYHoCuaiv2XET27XrNzjxjWqBOiJK5JqH8KjLATvwEAA",
        id: 4
    },
    {
        domain: ".youtube.com",
        expirationDate: 1779635625.202093,
        hostOnly: false,
        httpOnly: false,
        name: "__Secure-3PAPISID",
        path: "/",
        sameSite: "no_restriction",
        secure: true,
        session: false,
        storeId: "0",
        value: "n58sYYPA52adStQG/Av8lPWSO4FCWPtRaV",
        id: 5
    },
    {
        domain: ".youtube.com",
        expirationDate: 1779635625.202479,
        hostOnly: false,
        httpOnly: true,
        name: "__Secure-3PSID",
        path: "/",
        sameSite: "no_restriction",
        secure: true,
        session: false,
        storeId: "0",
        value: "g.a000wAjwJF6m8Lg8kiqO_UO_6k0AvTRsW4C1KhF0YtfUyHcDJ-H2l9a-rHux1IMiBtAjtJ9SVgACgYKAYoSAQASFQHGX2Mi6ribF_1PtIx5UXjBMnEHfRoVAUF8yKrvmh37po3oa1yE6kJL0aaA0076",
        id: 6
    },
    {
        domain: ".youtube.com",
        expirationDate: 1778732121.758769,
        hostOnly: false,
        httpOnly: true,
        name: "__Secure-3PSIDCC",
        path: "/",
        sameSite: "no_restriction",
        secure: true,
        session: false,
        storeId: "0",
        value: "AKEyXzUucrppjtvKFkwaCJIF4H0H6_OL164BHSKxDz_zGJ5gH8_QV6RoazmyhpfnAN_VuqAksTC0",
        id: 7
    },
    {
        domain: ".youtube.com",
        expirationDate: 1778650180.126761,
        hostOnly: false,
        httpOnly: true,
        name: "__Secure-3PSIDTS",
        path: "/",
        sameSite: "no_restriction",
        secure: true,
        session: false,
        storeId: "0",
        value: "sidts-CjEBjplskDu6VqWdTVNEK8DjgpvCYHoCuaiv2XET27XrNzjxjWqBOiJK5JqH8KjLATvwEAA",
        id: 8
    },
    {
        domain: ".youtube.com",
        expirationDate: 1779635625.201898,
        hostOnly: false,
        httpOnly: false,
        name: "APISID",
        path: "/",
        sameSite: "unspecified",
        secure: false,
        session: false,
        storeId: "0",
        value: "f40TuMFDEwsaYI37/AlxhaIKlGqSjzDctR",
        id: 9
    },
    {
        domain: ".youtube.com",
        expirationDate: 1747196720,
        hostOnly: false,
        httpOnly: false,
        name: "CONSISTENCY",
        path: "/",
        sameSite: "unspecified",
        secure: true,
        session: false,
        storeId: "0",
        value: "AKreu9vbKRwOZoaO0u2AYMCwBGakBz7qgKHMJ7GJNXRRl2-i7UHF6Se1obh0guN4EZy3r4GstlBl9GTe6mWSwIBhcAAw_FHP20z0oWK6n1wPZWVEsLF0szH8f57QgCrt3LgwmbwT7s4LlpabGS-SyiN8",
        id: 10
    },
    {
        domain: ".youtube.com",
        expirationDate: 1779635625.20161,
        hostOnly: false,
        httpOnly: true,
        name: "HSID",
        path: "/",
        sameSite: "unspecified",
        secure: false,
        session: false,
        storeId: "0",
        value: "AjjCW3jhTj-Zu5ipX",
        id: 11
    },
    {
        domain: ".youtube.com",
        expirationDate: 1760531881.247295,
        hostOnly: false,
        httpOnly: true,
        name: "LOGIN_INFO",
        path: "/",
        sameSite: "no_restriction",
        secure: true,
        session: false,
        storeId: "0",
        value: "AFmmF2swRgIhAIqiZru0VtrTG-oUP_iK1JMlR3YMv9dRA0GABnXfgMVyAiEA5b100RuDe6L5s0ZRW-NNCNiii280Nzi9d1z4e9ugFfk:QUQ3MjNmelNfYXhPamFlcXR4b1FyV1Z4QzdOblQ0c29ONEZOT1BtckJxWldnWDB4VGNKNFlOdzFMYjljaldQdWtEaWFiOXk4WXZnSmVFSE9yR3JsdmtOdkhDeVRrX2dablpQWjBpQjhNSlFmTWlzS1BTZDlRSnRPRXhDXzJVV3Z0N1Nzd1pIaGJlWE1kZk5sYVZXWWMwVVQ5WDMtYzlfVS1B",
        id: 12
    },
    {
        domain: ".youtube.com",
        expirationDate: 1781756120.167435,
        hostOnly: false,
        httpOnly: false,
        name: "PREF",
        path: "/",
        sameSite: "unspecified",
        secure: true,
        session: false,
        storeId: "0",
        value: "tz=Asia.Tashkent&f7=100&f5=30000",
        id: 13
    },
    {
        domain: ".youtube.com",
        expirationDate: 1779635625.20199,
        hostOnly: false,
        httpOnly: false,
        name: "SAPISID",
        path: "/",
        sameSite: "unspecified",
        secure: true,
        session: false,
        storeId: "0",
        value: "n58sYYPA52adStQG/Av8lPWSO4FCWPtRaV",
        id: 14
    },
    {
        domain: ".youtube.com",
        expirationDate: 1779635625.202378,
        hostOnly: false,
        httpOnly: false,
        name: "SID",
        path: "/",
        sameSite: "unspecified",
        secure: false,
        session: false,
        storeId: "0",
        value: "g.a000wAjwJF6m8Lg8kiqO_UO_6k0AvTRsW4C1KhF0YtfUyHcDJ-H2dpv8pWbcti0MUTeJw43nUgACgYKAQ0SAQASFQHGX2MiU-vrTtA9hIv-CCg_m5OSUBoVAUF8yKq5LDOapgVa0B39JhrfZzYI0076",
        id: 15
    },
    {
        domain: ".youtube.com",
        expirationDate: 1778732121.758616,
        hostOnly: false,
        httpOnly: false,
        name: "SIDCC",
        path: "/",
        sameSite: "unspecified",
        secure: false,
        session: false,
        storeId: "0",
        value: "AKEyXzWnbR8X70txTx6Csxj2rYFxwcYe2EhpNIaWlLf4OaxSUEo3ALclisD8bvv65SjdmjPn8Ao",
        id: 16
    },
    {
        domain: ".youtube.com",
        expirationDate: 1779635625.201837,
        hostOnly: false,
        httpOnly: true,
        name: "SSID",
        path: "/",
        sameSite: "unspecified",
        secure: true,
        session: false,
        storeId: "0",
        value: "AOl9leY4flH1AU3VI",
        id: 17
    },
    {
        domain: ".youtube.com",
        expirationDate: 1747196125,
        hostOnly: false,
        httpOnly: false,
        name: "ST-3opvp5",
        path: "/",
        sameSite: "unspecified",
        secure: false,
        session: false,
        storeId: "0",
        value: "session_logininfo=AFmmF2swRgIhAIqiZru0VtrTG-oUP_iK1JMlR3YMv9dRA0GABnXfgMVyAiEA5b100RuDe6L5s0ZRW-NNCNiii280Nzi9d1z4e9ugFfk%3AQUQ3MjNmelNfYXhPamFlcXR4b1FyV1Z4QzdOblQ0c29ONEZOT1BtckJxWldnWDB4VGNKNFlOdzFMYjljaldQdWtEaWFiOXk4WXZnSmVFSE9yR3JsdmtOdkhDeVRrX2dablpQWjBpQjhNSlFmTWlzS1BTZDlRSnRPRXhDXzJVV3Z0N1Nzd1pIaGJlWE1kZk5sYVZXWWMwVVQ5WDMtYzlfVS1B",
        id: 18
    },
    {
        domain: ".youtube.com",
        expirationDate: 1747196125,
        hostOnly: false,
        httpOnly: false,
        name: "ST-hcbf8d",
        path: "/",
        sameSite: "unspecified",
        secure: false,
        session: false,
        storeId: "0",
        value: "session_logininfo=AFmmF2swRgIhAIqiZru0VtrTG-oUP_iK1JMlR3YMv9dRA0GABnXfgMVyAiEA5b100RuDe6L5s0ZRW-NNCNiii280Nzi9d1z4e9ugFfk%3AQUQ3MjNmelNfYXhPamFlcXR4b1FyV1Z4QzdOblQ0c29ONEZOT1BtckJxWldnWDB4VGNKNFlOdzFMYjljaldQdWtEaWFiOXk4WXZnSmVFSE9yR3JsdmtOdkhDeVRrX2dablpQWjBpQjhNSlFmTWlzS1BTZDlRSnRPRXhDXzJVV3Z0N1Nzd1pIaGJlWE1kZk5sYVZXWWMwVVQ5WDMtYzlfVS1B",
        id: 19
    },
    {
        domain: ".youtube.com",
        expirationDate: 1747196124,
        hostOnly: false,
        httpOnly: false,
        name: "ST-tladcw",
        path: "/",
        sameSite: "unspecified",
        secure: false,
        session: false,
        storeId: "0",
        value: "session_logininfo=AFmmF2swRgIhAIqiZru0VtrTG-oUP_iK1JMlR3YMv9dRA0GABnXfgMVyAiEA5b100RuDe6L5s0ZRW-NNCNiii280Nzi9d1z4e9ugFfk%3AQUQ3MjNmelNfYXhPamFlcXR4b1FyV1Z4QzdOblQ0c29ONEZOT1BtckJxWldnWDB4VGNKNFlOdzFMYjljaldQdWtEaWFiOXk4WXZnSmVFSE9yR3JsdmtOdkhDeVRrX2dablpQWjBpQjhNSlFmTWlzS1BTZDlRSnRPRXhDXzJVV3Z0N1Nzd1pIaGJlWE1kZk5sYVZXWWMwVVQ5WDMtYzlfVS1B",
        id: 20
    },
    {
        domain: ".youtube.com",
        expirationDate: 1747196125,
        hostOnly: false,
        httpOnly: false,
        name: "ST-xuwub9",
        path: "/",
        sameSite: "unspecified",
        secure: false,
        session: false,
        storeId: "0",
        value: "session_logininfo=AFmmF2swRgIhAIqiZru0VtrTG-oUP_iK1JMlR3YMv9dRA0GABnXfgMVyAiEA5b100RuDe6L5s0ZRW-NNCNiii280Nzi9d1z4e9ugFfk%3AQUQ3MjNmelNfYXhPamFlcXR4b1FyV1Z4QzdOblQ0c29ONEZOT1BtckJxWldnWDB4VGNKNFlOdzFMYjljaldQdWtEaWFiOXk4WXZnSmVFSE9yR3JsdmtOdkhDeVRrX2dablpQWjBpQjhNSlFmTWlzS1BTZDlRSnRPRXhDXzJVV3Z0N1Nzd1pIaGJlWE1kZk5sYVZXWWMwVVQ5WDMtYzlfVS1B",
        id: 21
    }
]
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

                const agent = createAgent(cookies)
                const info = await getInfo(url, { agent });
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

