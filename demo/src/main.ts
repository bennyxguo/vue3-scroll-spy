import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// eslint-disable-next-line
import { registerScrollSpy, Easing } from 'vue3-scroll-spy'

const app = createApp(App).use(router)

// or custom global options
registerScrollSpy(app, {
  easing: Easing.Cubic.In
})

app.mount('#app')
