import {parentPort} from "worker_threads"
import userControllers from "../controllers/userControllers.js";
import mongoose from "mongoose"
import {Bot} from "grammy";
import dotenv from "dotenv";
dotenv.config();

let _TOKEN = process.env.BOT_TOKEN;
const bot = new Bot(_TOKEN);

const DB_CONNECTION_STRING = process.env.DB_URL;





parentPort.on('message', async (data) => {
    try{
        console.log(DB_CONNECTION_STRING)
       const connectionDB = await mongoose.connect(DB_CONNECTION_STRING,).then(()=>{
            parentPort.postMessage({
                status:true,
                isFinish:false,
                msg:"Connect db"
            })
        }).catch((error)=>{
           console.log(error)
            parentPort.postMessage({
                status:false,
                userId:null,
                msg:error,
            })
        })
        const {users, messageId, fromId} = data
        for(let i=0; i<users.length; i++){
            const userId = users[i]
            try {
               const result = await bot.api.copyMessages(userId,fromId,messageId)
                parentPort.postMessage({
                    status:true,
                    isFinish:false,
                    msg:result
                })
            }catch (error){
                await userControllers.remove(userId)
                parentPort.postMessage({
                    status:false,
                    userId:userId,
                    msg:error,
                })
            }

        }
        parentPort.postMessage({
            status:true,
            isFinish:true,
            msg:"Complete task"
        })
    }catch (error){
        parentPort.postMessage({
            status:false,
            userId:null,
            msg:error,
        })
    }
});