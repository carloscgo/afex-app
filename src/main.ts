import { createApp } from 'vue'
import BootstrapVue from '@coreui/bootstrap-vue'

import './style.scss'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.css'

const app = createApp(App)

app.use(BootstrapVue)

app.mount('#app')