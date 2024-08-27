import { Composer,Keyboard } from "grammy"
const composer = new Composer();
import {createConversation} from "@grammyjs/conversations";
import channelControllers from "../controllers/channelControllers.js";
import {Menu} from "@grammyjs/menu";

const bot = composer.chatType("private");

const admin_buttons = new Keyboard()
    .text("⬇️ Kino yuklash")
    .text("⭐ Admin kanallar")
    .row()
    .text("✍️ Xabar yozish")
    .text("🔗 Link qo'shish")
    .row()
    .text("📈 Dashboard")
    .resized()





bot.use(createConversation(addLinkConversation))
bot.use(createConversation(adminChannelConversation23))


const adminChannel = new Menu("adminChannel")
    .dynamic(async (ctx,range)=>{
        let list = await ctx.session.session_db.adminChannels
        list.forEach((item)=>{
            range
                .text(`${item.ad? '🟢' : '🟡'}  ${item.name}`, async (ctx)=>{

                    const result = await channelControllers.updateStatus(item.id, !item.ad)
                    if(result.success){
                        ctx.session.session_db.adminChannels = result.data.map((item)=>({
                            id:item._id,
                            name:item.channelLink===null? item.username : item.channelLink,
                            ad:item.ad
                        }))

                        await ctx.menu.update();


                    }
                })
                .row()
        })
    })
bot.use(adminChannel)










async function addLinkConversation(conversation, ctx){
    let data = {
        telegramId:null,
        userId:ctx.from.id,
        title:"Link",
        type:'link',
        channelLink:null,
    }
    let keyboardBtn = new Keyboard()
        .text("🛑 Bekor qilish")
        .resized()
    await ctx.reply(`Linkni yuboring
    
Masalan: <i>https://timeweb.cloud.com</i>
    `, {
        reply_markup:keyboardBtn,
        parse_mode:"HTML"
    })
    ctx = await conversation.wait()

    if (!ctx.message?.text?.includes("http")) {
        do {
            await ctx.reply("⚠️ <b>Noto'g'ri ma'lumot</b>\n\n <i>Linkni yuboring!</i> ", {
                parse_mode: "HTML",
            });
            ctx = await conversation.wait();
        } while (!ctx.message?.text?.includes("http"));
    }

    data.channelLink = ctx.message.text
    const result = await channelControllers.store(data)

    if(result.success){
        await ctx.reply(`✅ Link muvofaqiyati qo'shildi`, {
            reply_markup:keyboardBtn,
            parse_mode:"HTML"
        })
        await ctx.reply(`⚡️ Asosy menyu ⚡️`,{
            reply_markup:admin_buttons
        })

    }else{
        await ctx.reply(`🤯 Kutilmagan xatolik yuz berdi`, {
            reply_markup:keyboardBtn,
            parse_mode:"HTML"
        })
    }




}



async function adminChannelConversation23(conversation, ctx){
    ctx.session.session_db.adminChannels = []
    let keyboardBtn = new Keyboard()
        .text("🛑 Bekor qilish")
        .resized()

        let list = await channelControllers.adminChannels()
        if(list.data.length === 0){
            await ctx.reply("☹️ Sizda admin kanallar yo'q")
            ctx.conversation.exit()

        }else{
            ctx.session.session_db.adminChannels = list.data.map((item)=>({
                id:item._id,
                name:item.channelLink===null? item.username : item.channelLink,
                ad:item.ad
            }))

            await ctx.reply(`
<b>Admin kanallar</b>

🟢 Aktiv kanal
🟡 Passiv kanal

<i>Kerakli kanalni ustiga bosish orqali uning statusini teskari statusga o'zgartirasiz</i>

            `, {
                reply_markup:adminChannel,
                parse_mode:"HTML"
            })


        }

}





bot.hears("🔗 Link qo'shish", async (ctx)=>{
    await ctx.conversation.enter("addLinkConversation");
})
bot.hears("⭐ Admin kanallar", async (ctx)=>{
    await ctx.conversation.enter("adminChannelConversation23");
})





export default bot;