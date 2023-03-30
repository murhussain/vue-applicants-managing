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
      path: '/edit-job',
      name: 'edit-job',
      component: () => import('@/views/EditJobView.vue')
    }
  ]
});

export default router;
