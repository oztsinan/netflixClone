import Vue from 'vue'
import App from './App.vue'
import { store } from './store/store'
import VueRouter from 'vue-router'
import {routes} from './routes'
import VueResource from 'vue-resource'
import axios from "axios"



axios.defaults.baseURL = "https://netflix-clone-d49e9-default-rtdb.firebaseio.com"

Vue.use(VueRouter,VueResource)

const router = new VueRouter({
  routes,
  mode : 'history',
})



new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})

