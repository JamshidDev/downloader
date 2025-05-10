
import { Composer } from "grammy"
import dotenv from 'dotenv';
dotenv.config();

const bot = new Composer();
let AdminIdList = process.env.SUPER_ADMINS?.split(',')

bot.use(async (ctx, next)=>{
    const superAdminTelegramIdList = AdminIdList
    const overwriteCommandsList = ["🛑 Bekor qilish"];
    if (overwriteCommandsList.includes(ctx.message?.text)) {
        const stats = await ctx.conversation.active();
        for (let key of Object.keys(stats)) {
            await ctx.conversation.exit(key);
        }
    }
    ctx.config = {
        superAdmin: superAdminTelegramIdList.includes(ctx.from?.id)
    }
   await next();
})




export default bot;