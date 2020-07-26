import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import List from '../views/List.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* ç: "about" */ '../views/About.vue')
  },
  {
    path: '/list',
    name: 'List',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* ç: "list" */ '../views/List.vue')
  },
  {
    path: '/modal',
    name: 'Modal',
    component :()=> import(/* ç: "modal" */ '../views/Modal.vue')
  }
]

const router = new VueRouter({
  // mode: 'hash', // hash history
  base: process.env.BASE_URL,
  routes
})

export default router
