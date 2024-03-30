import { Composer,Keyboard } from "grammy"

const bot = new Composer();

const pm = bot.chatType("private");



pm.command('client', async (ctx)=>{
    await ctx.reply("Salom client")
})



export default bot;