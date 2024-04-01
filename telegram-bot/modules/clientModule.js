import { Composer,Keyboard } from "grammy"
import { Menu, MenuRange }  from "@grammyjs/menu"

const bot = new Composer();

const pm = bot.chatType("private");






const language_menu = new Menu("language_menu")
    .dynamic(async (ctx, range) => {
        let list = [
            {
            name: "language_uz",
            key: "uz"
            },
            {
                name: "language_ru",
                key: "ru"
            },
            {
                name: "language_en",
                key: "en"
            }

        ]
        list.forEach((item) => {
            range
                .text(ctx.t(item.name), async (ctx) => {
                    await ctx.answerCallbackQuery();
                    await ctx.i18n.setLocale(item.key);
                    await ctx.deleteMessage();
                    await ctx.reply(ctx.t("selected_language_msg"),{
                        parse_mode:"HTML"
                    })

                })
                .row();
        })
    })
pm.use(language_menu)
pm.command('start', async (ctx)=>{
    await ctx.reply(ctx.t("select_language_msg",{
        fullname:ctx.from.first_name +" "+(ctx.from.last_name || '')
    }),{
        parse_mode:"HTML",
        reply_markup:language_menu
    })
})



export default bot;