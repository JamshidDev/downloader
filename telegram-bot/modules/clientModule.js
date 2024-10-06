import { Composer,Keyboard } from "grammy"
import { Menu, MenuRange }  from "@grammyjs/menu"
import movieController from "../controllers/movieController.js";
const bot = new Composer();

const pm = bot.chatType("private");


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
                let movie = movies[i]
                if(movie?.movies && Array.isArray(movie?.movies) && movie.movies.length>0){
                    for(let j=0; j<movie.movies.length; j++){
                        await movieSender(ctx,movie.movies[j])
                    }
                }else{
                    await movieSender(ctx,movie)
                }

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