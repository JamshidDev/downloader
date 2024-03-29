const { Composer,Keyboard } = require("grammy");

const bot = new Composer();

const pm = bot.chatType("private");



pm.command('config', async (ctx)=>{
    await ctx.reply("Salom config")
})



module.exports = bot;