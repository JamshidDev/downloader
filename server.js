import { webhookCallback } from "grammy"
import express from "express"
import cors from 'cors';
// import {bot,token} from "./telegram-bot/bot.js"
import "./config/mongodb.js";

import permissionRouter from "./router/permissionRouter.js";
import roleRouter from "./router/roleRouter.js";
import menuRouteRouter from "./router/menuRouteRouter.js";
import menuRouter from "./router/menuRouter.js";
import organizationRouter from "./router/organizationRouter.js";




const app = express()
app.use(express.json())
app.use(cors());


app.use("/permission",permissionRouter);
app.use("/role",roleRouter);
app.use("/route",menuRouteRouter);
app.use("/menu",menuRouter);
app.use("/organization",organizationRouter);





















// app.use(`/${token}`, webhookCallback(bot, 'express'))

app.use((req, res) => {
    res.status(404).json({
        status: false,
        data: null,
        message: 'Not found Page :)',
    })
})




const port = process.env.PORT;
app.listen(port, ()=>{
    console.log(`Server is listening on ${port}`)
});
