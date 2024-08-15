import { Composer,Keyboard } from "grammy"
const bot = new Composer();
import movieController from "../controllers/movieController.js";
import {createConversation} from "@grammyjs/conversations";

const pm = bot.chatType("private");







pm.use(createConversation(uploadMovieConversation))



async function uploadMovieConversation(conversation, ctx){
    let data = {
        movieCode:null,
        fileId:null,
        caption:null,
    }
    let keyboardBtn = new Keyboard()
        .text("🛑 Bekor qilish")
        .resized()
    await ctx.reply(`Kino kodini yozing`, {
        reply_markup:keyboardBtn,
        parse_mode:"HTML"
    })

    ctx = await conversation.wait();
    if (!ctx.message?.text) {
        do {
            await ctx.reply("⚠️ <b>Noto'g'ri ma'lumot</b>\n\n <i>Kino kodini yozing!</i> ", {
                parse_mode: "HTML",
            });
            ctx = await conversation.wait();
        } while (!ctx.message?.text);
    }
    data.movieCode = ctx.message.text

    await ctx.reply(`Kino videosini yuboring`, {
        reply_markup:keyboardBtn,
        parse_mode:"HTML"
    })
    ctx = await conversation.wait();
    if (!ctx.message?.video) {
        do {
            await ctx.reply("⚠️ <b>Noto'g'ri ma'lumot</b>\n\n <i>Kino videosini yuboring!</i> ", {
                parse_mode: "HTML",
            });
            ctx = await conversation.wait();
        } while (!ctx.message?.video);
    }
    data.fileId = ctx.message.video.file_id
    data.caption = ctx.message.caption || null
    const result = await movieController._create(data)

    if(result.status){
        await ctx.reply(`✅ Kino muvofaqiyati yuklandi`, {
            reply_markup:keyboardBtn,
            parse_mode:"HTML"
        })
    }else{
        await ctx.reply(`🤯 Kutilmagan xatolik yuz berdi`, {
            reply_markup:keyboardBtn,
            parse_mode:"HTML"
        })
    }
}


pm.command("add_movie", async (ctx)=>{
    await ctx.conversation.enter("uploadMovieConversation");
})


pm.on("msg:video", async(ctx)=>{
    let fileId = ctx.message.video.file_id
    let caption = ctx.message.caption
    console.log(ctx.message)
    await ctx.api.sendVideo(ctx.from.id, fileId)
})




export default bot;