
import './assets/index.scss'
import App from './App.vue'
import apiService from "@/service/apiService.js";


import naive from 'naive-ui'
const app = createApp(App);
const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)


import { createApp } from 'vue'
import router from './router';


app.use(naive);
app.use(router);
window.$ApiService = apiService;
app.mount('#app')
