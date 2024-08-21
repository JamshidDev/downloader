import { Composer,Keyboard } from "grammy"
import {createConversation} from "@grammyjs/conversations"
import channelControllers from "../controllers/channelControllers.js";
const bot = new Composer();

const pm = bot.chatType("private");



pm.use(createConversation(base_menu))



async function base_menu(conversation, ctx){
    const admin_buttons = new Keyboard()
        .text("⬇️ Kino yuklash")
        .text("⭐ Admin kanallar")
        .row()
        .text("✍️ Xabar yozish")
        .text("🔗 Link qo'shish")
        .row()
        .text("📈 Umumiy statistika")
        .text("📊 Kunlik statistika")
        .resized()

    await ctx.reply(`⚡️ Asosy menyu ⚡️`,{
        reply_markup:admin_buttons
    })
}



pm.command("add_link", async (ctx)=>{

    let data = {
        telegramId:null,
        userId:ctx.from.id,
        title:"Link",
        type:'link',
        channelLink:'https://timeweb.cloud'
    }
    const result = await channelControllers.store(data)
    console.log(result)
})

bot.hears("🛑 Bekor qilish", async (ctx)=>{
    await ctx.conversation.enter("base_menu");
})




export default bot;