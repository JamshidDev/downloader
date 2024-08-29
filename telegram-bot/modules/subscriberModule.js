import { Composer, MemorySessionStorage, session } from "grammy"
import {Menu} from "@grammyjs/menu";
import channelControllers from "../controllers/channelControllers.js";



const bot = new Composer();








const subscribeButton = new Menu("subscribeButton")
    .dynamic(async (ctx,range)=>{
        let list = await ctx.session.session_db.channels
        list.forEach((item)=>{
            range
                .url("➕ Obuna bo'lish", item.type ==='channel'? `https://t.me/${item.link}` : item.link)
                .row()
        })
    }).text("✅ Tekshirish")

bot.use(subscribeButton)

bot.use(async (ctx, next)=>{
    let subscribeStatus = false
    ctx.session.session_db.channels = []
    let result = await channelControllers.index(true, true)

    if(result.data.length===0){
        await next()
        return
    }

    if(result.success && result.data.length > 0){
        const channels = result.data
        for(let i=0; i<channels.length; i++ ){
            const channel = channels[i]
            if(channel.channelLink === null){
                const chatMembers = await ctx.chatMembers.getChatMember(channel.telegramId, ctx.from.id)
                console.log(chatMembers.status)
                if(chatMembers.status === 'left'){
                    subscribeStatus = true
                    ctx.session.session_db.channels.push({
                        link:channel.username,
                        type:'channel'
                    })
                }
            }else{
                ctx.session.session_db.channels.push({
                    link:channel.channelLink,
                    type:'link'
                })
            }
        }


        if(subscribeStatus){
            await ctx.reply(`
<i>🙅‍♂️ Kechirasiz <a href="tg://user?id=${ctx.from.id}">${ctx.from.first_name}</a> botimizdan foydalanish uchun ushbu kanallarga a'zo bo'lishingiz shart!</i>
        `, {
                reply_markup:subscribeButton,
                parse_mode:"HTML"
            })

        }else{
            await  next()
        }

    }
})







export default bot;