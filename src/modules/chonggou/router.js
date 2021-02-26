import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'Chonggou',
        component: () => import('chonggou/index/index'),
      },
    ],
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('@/views/other/notFound'),
  },
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
