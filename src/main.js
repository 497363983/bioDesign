import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import { pinia } from './store'
import { init } from '@/store/plugins/init.js'
import { router } from './router'
import App from './App.vue'
import Particles from 'vue3-particles'
import 'element-plus/theme-chalk/el-message.css'

pinia.use(init())
const app = createApp(App)
app.use(pinia).use(ElementPlus).use(router).use(Particles).mount('#app')