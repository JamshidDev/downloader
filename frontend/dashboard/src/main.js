
import './index.css'
import App from './App.vue'

import { createApp } from 'vue'
import naive from 'naive-ui'
const app = createApp(App);
const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)


app.use(naive)
app.mount('#app')
