import { Composer,Keyboard } from "grammy"
import { Menu, MenuRange }  from "@grammyjs/menu"
import movieController from "../controllers/movieController.js";
const bot = new Composer();

const pm = bot.chatType("private");






// const language_menu = new Menu("language_menu")
//     .dynamic(async (ctx, range) => {
//         let list = [
//             {
//             name: "language_uz",
//             key: "uz"
//             },
//             {
//                 name: "language_ru",
//                 key: "ru"
//             },
//             {
//                 name: "language_en",
//                 key: "en"
//             }
//
//         ]
//         list.forEach((item) => {
//             range
//                 .text(ctx.t(item.name), async (ctx) => {
//                     await ctx.answerCallbackQuery();
//                     await ctx.i18n.setLocale(item.key);
//                     await ctx.deleteMessage();
//                     await ctx.reply(ctx.t("selected_language_msg"),{
//                         parse_mode:"HTML"
//                     })
//
//                 })
//                 .row();
//         })
//     })
// pm.use(language_menu)


// pm.command('start', async (ctx)=>{
//     try{
//         await ctx.reply(`
// <b>👋 Salom <a href="tg://user?id=${ctx.from.id}">${ctx.from.first_name}</a></b>
//
// <i>Menga kino kodini yuboring!</i>
//     `,{
//             parse_mode:"HTML",
//             reply_markup:{
//                 remove_keyboard:true,
//             }
//         })
//     }catch (error){
//         console.log("/start error")
//     }
//
// })

const movieSender = async (ctx, movie)=>{
    let fileId = movie.fileId
    let caption = movie.caption+`
        
🤖Bizning bot: @${ctx.me.username}        
        `
    await ctx.api.sendVideo(ctx.from.id, fileId, {
        caption,
    })
}

pm.on("message:text", async (ctx)=>{
    try{
        const code = ctx.message.text
        const result = await movieController._searchMovieByCode(code)
        if(result.status && result.data?.length>0){
            const movies = result.data

            for(let i=0; i<movies.length; i++){
                await movieSender(ctx,movies[i])
            }
        }else if(result.status && result.data?.length===0){
            await ctx.reply(`
<b>❌ Kino topilmadi</b>

<i>Iltimos kino kodi tog'riligini tekshiring!</i>
        `, {
                parse_mode:"HTML",
            })
        }
    }catch (error){
        console.log(error)
    }

})

export default bot;