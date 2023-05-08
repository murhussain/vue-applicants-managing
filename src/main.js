import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import i18n from "./i18n"

import './assets/main.css'

const app = createApp(App)
// create a new Pinia instance
const pinia = createPinia()

// install Pinia in your app
app.use(pinia)
app.use(router)

app.use(i18n).mount('#app')
