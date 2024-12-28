import DashboardLayout from '@/layout/DashboardLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index.vue'),
      meta: {
        layout: DashboardLayout,
      },
    },
    {
      path: '/tansactions',
      name: 'transactions',
      component: () => import('@/views/dashboard/transactions.vue'),
      meta: {
        layout: DashboardLayout,
      },
    },
  ],
})

export default router
