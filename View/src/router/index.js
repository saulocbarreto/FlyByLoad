import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Visualization from '../views/Visualization.vue'
import Monitoring from '../views/Monitoring.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/monitoring',
    name: 'Monitoring',
   
    component: Monitoring
  },
  {
    path: '/Visualization',
    name: 'Visualization',
    component: Visualization
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
