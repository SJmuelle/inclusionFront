import { createRouter, createWebHistory } from 'vue-router';
import { requireAuth } from "@/guards/auth-guard";

const routes = [
  {
    path: '/',
    name: 'auth',
    component: () => import('../layouts/AuthLayout.vue'),
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('../views/auth/login.vue'),
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('../layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'sale',
        component: () => import('../views/sale/sale.vue'),
        meta: { requireAuth: true },
      },
      {
        path: 'perfil',
        name: 'perfil',
        component: () => import('../views/perfil/formPerfil.vue'),
        meta: { requireAuth: true },
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'login' }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach(requireAuth);

export default router;
