import {Composer, Keyboard, MemorySessionStorage, session} from "grammy"
import {Worker} from "worker_threads"
import mongoose from "mongoose"
import userControllers from "../controllers/userControllers.js";
import {createConversation} from "@grammyjs/conversations"

const bot = new Composer();

bot.use(createConversation(sendMessage))


async function sendMessage(conversation, ctx){

    const admin_buttons = new Keyboard()
        .text("⬇️ Kino yuklash")
        .text("⭐ Admin kanallar")
        .row()
        .text("✍️ Xabar yozish")
        .text("🔗 Link qo'shish")
        .row()
        .text("📈 Dashboard")
        .resized()

    await ctx.reply(`
    <b>⚠️ Barcha foydalanuvchilarga xabar jo'natish</b> 
    
    <i>‼️ Xabar matnini yozing yoki xabarni botga forward qiling ↗️</i>
        `, {
        parse_mode: "HTML",
    })
    const message_text = await conversation.wait();
    let keyborad = new Keyboard()
        .text("❌ Bekor qilish")
        .text("✅ Tasdiqlash")
        .resized();
    await ctx.reply(`
    <i>Xabarni barcha foydalanuvchilarga yuborish uchun <b>✅ Tasdiqlash</b> tugmasini bosing!</i> 
       
        `, {
        reply_markup: keyborad,
        parse_mode: "HTML",
    });
    const msg = await conversation.wait()


    if (msg.message?.text == '✅ Tasdiqlash'){
        await ctx.reply("Xabar yuborish boshlandi...",{
            reply_markup:admin_buttons,
            parse_mode:"HTML"
        })
        const result = await userControllers.allUser()
        if(result.status && result.data.length>0){
            const messageId = [message_text.message.message_id]
            const useridList = result.data.map(v=>v.telegramId)
            const worker_one = new Worker("./telegram-bot/workers/worker_one.js")
            let successMessagedCount = 0
            worker_one.postMessage({
                users:useridList,
                messageId:messageId,
                fromId:ctx.from.id
            });
            worker_one.on('message', async (msg)=>{

                if(!msg?.status && msg.userId){
                    // user blocked error
                    console.log(msg.userId)
                }else if(msg?.status && !msg.isFinish){
                    //success send message
                    successMessagedCount ++
                    console.log(successMessagedCount)
                }else if(msg?.status && msg.isFinish){
                    //finish task
                    await ctx.reply(`Xabar yuborish yakunlandi! ${successMessagedCount -1}`,{
                        reply_markup:admin_buttons,
                        parse_mode:"HTML"
                    })

                }else{
                    //unexpected error
                    console.log(msg)
                }
            })
        }
    }
}






bot.hears("✍️ Xabar yozish", async (ctx)=>{
    await ctx.conversation.enter("sendMessage");
})













export default bot;