import { parentPort, workerData } from "worker_threads";
import { Bot } from "grammy";
import fs from "fs";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import path from "path";

(async () => {
    const { token, url } = workerData
    const bot = new Bot(token)

    try {



    } catch (error) {
        console.error("Xatolik:", error.message);
        await bot.api.sendMessage(chatId, "Video yuborishda xatolik yuz berdi.");
    }
})();
