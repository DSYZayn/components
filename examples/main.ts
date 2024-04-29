import { createApp } from 'vue'
import App from './App.vue'
// import '@arcgis/core/assets/esri/themes/light/main.css'
import { createPinia } from 'pinia'
import '@/assets/style.css';

const app = createApp(App)
app.use(createPinia())
app.mount('#app')
