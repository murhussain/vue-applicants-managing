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
      path: '/jobs/add-new',
      name: '/jobs/add-new',
      component: () => import('@/views/AddJobView.vue')
    },
    {
      path: '/jobs/update',
      name: '/jobs/update',
      component: () => import('@/views/EditJobView.vue')
    }
  ]
});

export default router;
