const { Composer,Keyboard } = require("grammy");

const bot = new Composer();

const pm = bot.chatType("private");



pm.command('client', async (ctx)=>{
    await ctx.reply("Salom client")
})



module.exports = bot;