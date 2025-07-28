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
    {
      path: '/inprogress',
      name: 'in progress',
      component: () => import('../pages/Inprogress.vue'),
    },
    {
      path: '/todo',
      name: 'todo',
      component: () => import('../pages/Todo.vue'),
    },
  ],
})

export default router
