import { Composer,Keyboard } from "grammy"
const bot = new Composer();
import movieController from "../controllers/movieController.js";
import {createConversation} from "@grammyjs/conversations";
import keyboards from "../keyboards/keyboards.js";
const pm = bot.chatType("private");







pm.use(createConversation(uploadMovieConversation))



async function uploadMovieConversation(conversation, ctx){
    let movieCode = null
    let movies = []
    let keyboardBtn = new Keyboard()
        .text("✅ Yuklash")
        .row()
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
    movieCode = ctx.message.text






    while(true){
        await ctx.reply(`Kino videosini yuboring`, {
            reply_markup:keyboardBtn,
            parse_mode:"HTML"
        })
        ctx = await conversation.wait();


        if(ctx.message.text === '✅ Yuklash'){
            break
        }

        if (!ctx.message?.video) {
            do {
                await ctx.reply("⚠️ <b>Noto'g'ri ma'lumot</b>\n\n <i>Kino videosini yuboring!</i> ", {
                    parse_mode: "HTML",
                });
                ctx = await conversation.wait();
            } while (!ctx.message?.video);
        }
        let fileId = ctx.message.video.file_id
        let caption = ctx.message.caption || null
        movies.push({
            fileId,
            caption
        })
    }

    let data = {
        movieCode,
        movies,
    }
    const result = await movieController._create(data)

    if(result.status){

        await ctx.reply(`✅ Kino muvofaqiyati yuklandi`,{
            reply_markup:keyboards.mainAdminKeyboard
        })

    }else{
        await ctx.reply(`🤯 Kutilmagan xatolik yuz berdi`, {
            reply_markup:keyboardBtn,
            parse_mode:"HTML"
        })
    }
}


bot.hears("⬇️ Kino yuklash", async (ctx)=>{
    await ctx.conversation.enter("uploadMovieConversation");
})




export default bot;