const { Bot, webhookCallback } = require('grammy');
require('dotenv').config();
const admin_bot = require("./modules/adminModule");
const client_bot = require("./modules/clientModule");
const config_bot = require("./modules/configModule");





let _TOKEN = process.env.BOT_TOKEN;
let _DOMAIN = process.env.DOMAIN_URL;
let _WEBHOOK_URL = `${_DOMAIN}/${_TOKEN}`;






const bot = new Bot(_TOKEN);





bot.use(config_bot);
bot.use(client_bot);
bot.use(admin_bot);







bot.api.setWebhook(_WEBHOOK_URL).then((res)=>{
    console.log(`Webhook set to ${_WEBHOOK_URL}`);
}).catch((error)=>{
    console.log(error)
});


bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Error while handling update ${ctx.update.update_id}:`);
});

module.exports = {bot, token:_TOKEN};




