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
        const admin_buttons = new Keyboard()
            .text("⬇️ Kino yuklash")
            .text("⭐ Admin kanallar")
            .row()
            .text("✍️ Xabar yozish")
            .text("🔗 Link qo'shish")
            .row()
            .text("📈 Dashboard")
            .resized()

        await ctx.reply(`⚡️ Asosy menyu ⚡️`,{
            reply_markup:admin_buttons
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