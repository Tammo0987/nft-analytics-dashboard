import {createApp} from 'vue'
import App from './App.vue'
import './assets/index.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import router from "./router";

createApp(App)
    .use(router)
    .mount('#app')
