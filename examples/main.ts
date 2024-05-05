import { createApp } from 'vue'
import App from './App.vue'
// import '@arcgis/core/assets/esri/themes/light/main.css'
import { createPinia } from 'pinia'
import { GPU } from 'gpu.js';
import '@/assets/style.css';

const app = createApp(App)
const gpu = new GPU();
app.use(createPinia())
app.provide<GPU>('gpu', gpu);
app.mount('#app')
