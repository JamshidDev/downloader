import {Composer, Keyboard} from "grammy"
import channelControllers from "../controllers/channelControllers.js";
import userControllers from "../controllers/userControllers.js";
import requestController from "../controllers/requestController.js";
const bot = new Composer();

import keyboards from "../keyboards/keyboards.js";

bot.command('start', async (ctx)=>{

    try{
        let data = {
            telegramId:ctx.from.id,
            firstname:ctx.from.first_name,
            lastname:ctx.from?.last_name,
            username:ctx.from?.username,
            languageCode:ctx.from.language_code,
            active:true,
        }
        await userControllers.store(data)
        if(!ctx.config?.superAdmin){
            await ctx.reply(`
👋 Salom [${ctx.from.first_name}](tg://user?id=${ctx.from.id})

_Menga kino kodini yuboring!_
    `,{
                parse_mode:"Markdown",
                reply_markup:{
                    remove_keyboard:true,
                }
            })
        }
        else{

            await ctx.reply(`⚡️ Asosy menyu ⚡️`,{
                reply_markup:keyboards.mainAdminKeyboard
            })
        }
    }catch (error){
        console.log("error")
    }



})




bot.on("my_chat_member", async (ctx) => {
    const status = ctx.update.my_chat_member.new_chat_member.status;
    const type = ctx.update.my_chat_member.chat.type;
    console.log(status)
    if(type === 'channel'){
        if(status === 'administrator'){
            let data = {
                telegramId: ctx.update.my_chat_member.chat.id,
                userId: ctx.update.my_chat_member.from.id,
                title: ctx.update.my_chat_member.chat.title,
                username: ctx.update.my_chat_member.chat.username,
                type: Boolean(ctx.update.my_chat_member.chat?.username)? 'PublicChannel' : 'PrivateChannel',
                newChat: ctx.update.my_chat_member.new_chat_member,
            }
            await channelControllers.store(data)
        }
        else{
            // status is left or member
            let telegram_id = ctx.update.my_chat_member.chat.id;
            await channelControllers.remove(telegram_id)
        }
    }
    else if(type === 'private'){
        if(status ==='kicked'){
            const stats = await ctx.conversation.active();
            for (let key of Object.keys(stats)) {
                await ctx.conversation.exit(key);
            }
            await userControllers.remove(ctx.from.id)
        }else{
            //     status is member
            let data = {
                telegramId:ctx.from.id,
                firstname:ctx.from.first_name,
                lastname:ctx.from?.last_name,
                username:ctx.from?.username,
                languageCode:ctx.from.language_code,
                active:true,
            }
            await userControllers.store(data)
        }
    }
});


bot.on("chat_join_request", async(ctx)=>{
    let data = {
        telegramId:ctx.update.chat_join_request.from.id,
        firstname:ctx.update.chat_join_request.from.first_name,
        lastname:ctx.update.chat_join_request.from?.last_name,
        username:ctx.update.chat_join_request.from?.username,
        languageCode:ctx.update.chat_join_request.from.language_code,
        active:true,
    }

    let data2 = {
        channelId:ctx.update.chat_join_request.chat.id,
        userId:ctx.update.chat_join_request.from.id,
    }
    // await userControllers.store(data)
    await requestController.store(data2)
})








export default bot;