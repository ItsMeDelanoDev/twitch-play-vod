import { createApp } from 'vue'
import router from "./router/index"
import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'

import App from './App.vue'
import './index.css'

const pinia = createPinia()
pinia.use(piniaPluginPersistedState)

createApp(App)
  .use(router)
  .use(pinia)
  .mount('#app')
