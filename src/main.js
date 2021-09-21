import './css/reset.css'
import './css/variables.css'
import './css/styles.css'
import '@capacitor/core'
import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import { createI18n } from 'vue-i18n'
import messages from '@/literals'

const i18n = createI18n({
    locale: 'es',
    fallbackLocale: 'es',
    messages,
})

createApp(App)
    .use(store)
    .use(router)
    .use(i18n)
    .mount('#app')
