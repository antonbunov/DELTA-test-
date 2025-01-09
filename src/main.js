import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import HighchartsVue from 'highcharts-vue'

// import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

// app.use(ElementPlus)
app.use(HighchartsVue)

app.mount('#app')

