import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)
// create a new Pinia instance
const pinia = createPinia()

// install Pinia in your app
app.use(pinia)
app.use(router)

app.mount('#app')
