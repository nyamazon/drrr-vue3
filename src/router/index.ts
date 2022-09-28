import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHashHistory } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/chatroom',
    name: 'chatroom',
    component: () => import('@/components/ChatRoom/Index.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/components/Login/Index.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
