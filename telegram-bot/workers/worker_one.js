import userControllers from "../controllers/userControllers.js";
import {parentPort} from "worker_threads"
import {Bot} from "grammy";
import dotenv from "dotenv";
dotenv.config();

let _TOKEN = process.env.BOT_TOKEN;
const bot = new Bot(_TOKEN);