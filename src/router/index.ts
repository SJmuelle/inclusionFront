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
        path: 'sale',
        name: 'sale',
        component: () => import('../views/sale/sale.vue'),
        meta: { requireAuth: true },
      },
      {
        path: 'perfil',
        name: 'perfil',
        component: () => import('../views/perfil/formPerfil.vue'),
        meta: { requireAuth: true },
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('../views/dashboard/dashboard.vue'), // Asegúrate de que exista este componente
        meta: { requireAuth: false},
      },


      {
        path: 'bodega',
        name: 'bodega',
        component: () => import('../views/bodegas/bodega.vue'), // Asegúrate de que exista este componente
        meta: { requireAuth: false},
      },

      {
        path: 'tercero',
        name: 'tercero',
        component: () => import('../views/terceros/terceros.vue'), // Asegúrate de que exista este componente
        meta: { requireAuth: false},
      },
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'dashboard' }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach(requireAuth);

export default router;
