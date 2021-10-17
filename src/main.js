import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

const Portfolio = createApp(App)

Portfolio.use(store)

Portfolio.mount('#app')
