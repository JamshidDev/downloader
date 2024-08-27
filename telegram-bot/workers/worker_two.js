import userControllers from "../controllers/userControllers.js";
import {parentPort} from "worker_threads"

parentPort.on('message', async (message) => {

    setTimeout(()=>{
        parentPort.postMessage('worker_two:Finish '+message)
    },6000)
});