// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Vuetify styles
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

// Vuetify setup
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createRouter, createWebHistory } from "vue-router";



document.isAutenticated = true; 
// router.beforeEach((to, from) => { 
//   if(to.path == '/dashbord' && document.isAutenticated == false) { 
//     next({ name: '/' }); 
//     console.log("You are not authenticated, redirecting to home page");
//   }else if(to.path == '/user_dashbord' && document.isAutenticated == false) {
//     next({ name: '/' });
//     console.log("You are not authenticated, redirecting to home page");
//   }
// })

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)

app.use(router)

app.mount('#app')

app.use(vuetify)