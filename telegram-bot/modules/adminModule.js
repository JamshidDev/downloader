import { Composer,Keyboard } from "grammy"
import {createConversation} from "@grammyjs/conversations"
import channelControllers from "../controllers/channelControllers.js";
const bot = new Composer();
import keyboards from "../keyboards/keyboards.js";
const pm = bot.chatType("private");



pm.use(createConversation(base_menu))



async function base_menu(conversation, ctx){
    await ctx.reply(`⚡️ Asosy menyu ⚡️`,{
        reply_markup:keyboards.mainAdminKeyboard
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