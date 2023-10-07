import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

// 重置样式
import 'normalize.css'
import '@/assets/base.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
