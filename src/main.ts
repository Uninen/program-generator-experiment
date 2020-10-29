import { createApp } from 'vue'
import { store, key } from './store'
import { router } from './router'
import App from './App.vue'
import './index.css'

const app = createApp(App)

app.use(store, key)
app.use(router)
app.mount('#app')

// @ts-ignore
if (window.Cypress) {
  // @ts-ignore
  window.vxstore = store
  // @ts-ignore
  console.log('Cypress: Setting store to window: ', window.vxstore)
}
