import AppLayout from '@/layout/AppLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '/',
          name: 'dashboard',
          component: () => import('@/views/Dashboard.vue')
        },
        {
          path: '/po-sales',
          name: 'posales',
          component: () => import('@/views/pages/POSales.vue')
        },
        {
          path: '/installments',
          name: 'installments',
          component: () => import('@/views/InstallmentsView.vue')
        },
      ]
    },
    
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
  linkActiveClass: 'active'
})

export default router
