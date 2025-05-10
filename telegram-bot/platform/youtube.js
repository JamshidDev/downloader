
import youtubedl from 'youtube-dl-exec'
import ytdl from "@distube/ytdl-core"
// import ytdl from 'ytdl-core';
import  fs from 'fs'
export  const downloadVideoFromYouTuBe = async (url, chatId) =>{
    // const videoUrl = "https://vt.tiktok.com/ZShrbFcMm/"
    try {
        // youtubedl(url, {
        //     dumpSingleJson: true,
        //     format: 'best',
        //     noCheckCertificates: true,
        //     noWarnings: true,
        //     preferFreeFormats: true,
        //     addHeader: ['referer:youtube.com', 'user-agent:googlebot']
        // }).then(data => {
        //     data.formats.forEach((v)=>{
        //         if(v.ext === 'mp4'){
        //             console.log(v)
        //         }
        //
        //     })
        //
        // })

// TypeScript: import ytdl from '@distube/ytdl-core'; with --esModuleInterop
// TypeScript: import * as ytdl from '@distube/ytdl-core'; with --allowSyntheticDefaultImports
// TypeScript: import ytdl = require('@distube/ytdl-core'); with neither of the above

// Download a video

        const info = await ytdl.getInfo(url)

        const format = ytdl.chooseFormat(info.formats, {
            quality: '18'
        });
        console.log(format)
        const stream = ytdl.downloadFromInfo(info, { format })
        stream.pipe(fs.createWriteStream(`video.mp4`))


        ytdl.getBasicInfo(url).then(info => {
            console.log(info.videoDetails.title);
        });

        stream.on('end', () => {
            console.log(`✅ Yuklab olindi: video.mp4`);
        })

        stream.on('error', (err) => {
            console.error('❌ Yuklab olishda xatolik:', err.message);
        });


    } catch (error) {
        console.error('Error downloading:', error);
    }
}

