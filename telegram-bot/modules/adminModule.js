const { Composer,Keyboard } = require("grammy");

const bot = new Composer();

const pm = bot.chatType("private");



pm.command('start', async (ctx)=>{
    await ctx.reply("Salom admin")
})



module.exports = bot;