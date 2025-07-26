import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../pages/Inbox.vue'),
    },
    {
      path: '/today',
      name: 'today',
      component: () => import('../pages/Today.vue'),
    },
    {
      path: '/upcoming',
      name: 'upcoming',
      component: () => import('../pages/Upcoming.vue'),
    },
    {
      path: '/completed',
      name: 'completed',
      component: () => import('../pages/Completed.vue'),
    },
    {
      path: '/trash',
      name: 'trash',
      component: () => import('../pages/Trash.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../pages/Settings.vue'),
    },
  ],
})

export default router
