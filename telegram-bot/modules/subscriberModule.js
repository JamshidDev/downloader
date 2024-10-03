import { Composer, MemorySessionStorage, session } from "grammy"
import {Menu} from "@grammyjs/menu";
import channelControllers from "../controllers/channelControllers.js";
import requestController from "../controllers/requestController.js";



const bot = new Composer();








const subscribeButton = new Menu("subscribeButton")
    .dynamic(async (ctx,range)=>{
        let list = await ctx.session.session_db.channels
        console.log(list)
        list.forEach((item)=>{
            range
                .url("➕ Obuna bo'lish", item.type ==='PublicChannel'? `https://t.me/${item.link}` : item.link)
                .row()
        })
    })

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

            if(channel.type !== 'Link'){
                console.log(channel.telegramId)
                const chatMembers = await ctx.chatMembers.getChatMember(channel.telegramId, ctx.from.id)
                console.log(chatMembers.status)
                if(chatMembers.status === 'left'){
                    let joinRequest = await requestController.userSendJoinRequest(channel.telegramId, ctx.from.id)
                    console.log(joinRequest)
                    if(joinRequest.success && !joinRequest.joinRequest){
                        subscribeStatus = true
                        ctx.session.session_db.channels.push({
                            link:channel.type === 'PublicChannel'? channel.username : channel.channelLink ,
                            type:channel.type,
                        })
                    }
                }
            }else{
                ctx.session.session_db.channels.push({
                    link:channel.channelLink,
                    type:channel.type
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