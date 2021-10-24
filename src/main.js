import { createApp } from 'vue'
import App from './App.vue'

import store from './store'
import router from './router'

const Portfolio = createApp(App)

Portfolio.use(store)
Portfolio.use(router)

Portfolio.mount('#app')
