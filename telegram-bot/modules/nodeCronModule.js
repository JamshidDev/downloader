import {Composer, Keyboard, MemorySessionStorage, session} from "grammy"
import {Worker} from "worker_threads"
import userControllers from "../controllers/userControllers.js";
import {createConversation} from "@grammyjs/conversations"

const bot = new Composer();

bot.use(createConversation(sendMessage))


async function sendMessage(conversation, ctx){
    await ctx.reply(`
    <b>⚠️ Barcha foydalanuvchilarga xabar jo'natish</b> 
    
    <i>‼️ Xabar matnini yozing yoki xabarni botga forward qiling ↗️</i>
        `, {
        parse_mode: "HTML",
    })
    const message_text = await conversation.wait();
    let keyborad = new Keyboard()
        .text("❌ Bekor qilish xabarni")
        .text("✅ Tasdiqlash xabarni")
        .resized();
    await ctx.reply(`
    <i>Xabarni barcha foydalanuvchilarga yuborish uchun <b>✅ Tasdiqlash xabarni</b> tugmasini bosing!</i> 
       
        `, {
        reply_markup: keyborad,
        parse_mode: "HTML",
    });
    const msg = await conversation.wait()


    if (msg.message?.text == '✅ Tasdiqlash xabarni'){
        await ctx.reply("Barchaga xabar yuborish tugallanishini kuting...⏳")
        const result = await userControllers.allUser()
        if(result.status && result.data.length>0){
            const messageId = [message_text.message.message_id]
            const useridList = result.data.map(v=>v.telegramId)
            const worker_one = new Worker("./telegram-bot/workers/worker_one.js")
            worker_one.postMessage({
                users:useridList,
                messageId:messageId,
            });
            worker_one.on('message', (result)=>{
                console.log(result)
            })
        }
    }
}





bot.command('job', async(ctx)=>{
    console.log("/job-start")
    const id = ctx.from.id
    const fileName = "./telegram-bot/modules/Worker_one.js"
    const result = await userControllers.allUser()
    console.log(result.data)


    // const worker_one = new Worker("./telegram-bot/workers/worker_one.js")
    // // const worker_two = new Worker("./telegram-bot/workers/worker_two.js")
    //
    // worker_one.postMessage({
    //     id:433453,
    //     message:"dsfsdfsdf"
    // });
    // worker_one.on('message', (result)=>{
    //     console.log(result)
    // })
    // worker_two.postMessage("Start two");
    // worker_two.on('message', (result)=>{
    //     console.log(result)
    // })
})

bot.command('thread', async(ctx)=>{
    console.log("/thread")
    let useridList = []
    const result = await userControllers.allUser()

    if(result.status && result.data.length>0){
        useridList = result.data.map(v=>v.telegramId)
    }

    const worker_one = new Worker("./telegram-bot/workers/worker_one.js")
    worker_one.postMessage({
        users:useridList,
        message:"Test message!"
    });
    worker_one.on('message', (result)=>{
        console.log(result)
    })
} )

bot.command('send', async (ctx)=>{
    await ctx.reply('ok')
    await ctx.conversation.enter("sendMessage");
})

bot.on("message", async (ctx)=>{

    console.log(ctx.message)
    const text = 'ok'
    ctx.api.sendMessage(ctx.from.id, text
        )
})













export default bot;