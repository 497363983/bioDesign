import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import { pinia } from './store'
import { router } from './router'
import App from './App.vue'
import Particles from 'vue3-particles'
import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App)
app.use(ElementPlus).use(router).use(pinia).use(Particles).mount('#app')