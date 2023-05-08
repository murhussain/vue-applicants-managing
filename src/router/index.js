import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
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
      path: '/jobs/update/:jobId',
      name: '/jobs/update/:jobId',
      component: () => import('@/views/EditJobView.vue')
    },
    {
      path: '/jobs/applicants/:code',
      name: '/jobs/applicants/:code',
      component: () => import('@/views/JobApplicantView.vue')
    }
  ]
});

export default router;
