import { createApp } from 'vue'
import BootstrapVue from '@coreui/bootstrap-vue'
import {
    cilX
} from '@coreui/icons'

import './style.scss'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.css'

const app = createApp(App)

app.use(BootstrapVue)

const icons = {
    cilX
}

app.provide('icons', icons)

app.mount('#app')