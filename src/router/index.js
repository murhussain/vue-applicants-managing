import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/add-job',
      name: 'add-job',
      component: () => import('@/views/AddJobView.vue')
    },
    {
      path: '/JobForm',
      name: 'JobForm',
      component: () => import('@/views/EditJobView.vue')
    }
  ]
});

export default router;
