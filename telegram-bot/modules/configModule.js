import { Composer, MemorySessionStorage, session } from "grammy"
import {chatMembers } from "@grammyjs/chat-members"
import {conversations} from "@grammyjs/conversations"
import {i18n} from "../i18n/index.js"


const adapter = new MemorySessionStorage();
const bot = new Composer();

bot.use(i18n);
bot.use(session({
    type: "multi",
    session_db: {
        initial: () => {
            return {
                client: {
                    phone: null,
                    full_name: null,
                },
                channels:[],
                adminChannels:[],
                selectedChannelId:null
            }
        },
        storage: new MemorySessionStorage(),
    },
    conversation: {},
    __language_code: {},
}));

bot.use(chatMembers(adapter));
bot.use(conversations());








export default bot;