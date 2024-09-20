import { Composer,Keyboard } from "grammy"
import dashboardController from "../controllers/dashboardController.js";
import {createConversation} from "@grammyjs/conversations";
const composer = new Composer();

const bot = composer.chatType("private");


bot.use(createConversation(dashboardConversation))



async function dashboardConversation(conversation, ctx){
    const admin_buttons = new Keyboard()
        .text("⬇️ Kino yuklash")
        .text("⭐ Admin kanallar")
        .row()
        .text("✍️ Xabar yozish")
        .text("🔗 Link qo'shish")
        .row()
        .text("📈 Dashboard")
        .resized()

    const result = await dashboardController.dashboardBot()

    if(result.status){

        await ctx.reply(`
<b>📈 DASHBOARD BOT📈 </b> 


👥 Yangi foydalunchilar: <b>${result.data.todayUsers}</b>   
🎥 Yangi kinolar: <b>${result.data.todayMovies}</b>   
🔎 Kunlik qidiruvlar: <b>-:-</b>  

📈 Barcha foydalunchilar: <b>${result.data.allUsers}</b>  
📊 Barcha kinolar: <b>${result.data.allMovies}</b>   
🔋 Barcha qidiruvlar: <b>-:-</b>    
    `, {
            reply_markup:admin_buttons,
            parse_mode:"HTML"
        })


    }else{
        await ctx.reply(`🤯 Kutilmagan xatolik yuz berdi`, {
            reply_markup:admin_buttons,
            parse_mode:"HTML"
        })
    }
}







bot.hears("📈 Dashboard", async (ctx)=>{
    await ctx.conversation.enter("dashboardConversation");
})

export default bot;