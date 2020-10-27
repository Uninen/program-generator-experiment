import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Index from './views/Index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: Index,
  },
]

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  strict: true,
  routes,
})
