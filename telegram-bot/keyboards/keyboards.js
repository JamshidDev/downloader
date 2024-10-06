import {Keyboard} from "grammy";

const mainAdminKeyboard =  new Keyboard()
    .text("⬇️ Kino yuklash")
    .text("⭐ Reklama")
    .row()
    .text("✍️ Xabar yozish")
    .text("🔗 Link qo'shish")
    .row()
    .text("📈 Dashboard")
    .row()
    .text("🗑 Kino o'chirish")
    .resized()





export default {mainAdminKeyboard}