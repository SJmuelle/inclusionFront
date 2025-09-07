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
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('../views/dashboard/dashboard.vue'),
        meta: { requireAuth: true },
      },
      {
        path: 'estudiantes',
        name: 'estudiantes',
        component: () => import('../components/StudentForm.vue'),
        meta: { requireAuth: true },
      },
      {
        path: 'piar',
        name: 'piar',
        component: () => import('../views/piar/piarListados.vue'),
        meta: { requireAuth: true },
      },
      {
        path: 'piarForm/:tipo/:id',
        name: 'piarForm',
        component: () => import('../views/piar/PiarForm.vue'),
        meta: { requireAuth: true },
      },
      {
        path: 'seguimiento',
        name: 'seguimiento',
        component: () => import('../views/seguimiento/SeguimientoForm.vue'),
        meta: { requireAuth: true },
      },
      {
        path: 'actores',
        name: 'actores',
        component: () => import('../views/actores/ActoresForm.vue'),
        meta: { requireAuth: true },
      },
      {
        path: 'reportes',
        name: 'reportes',
        component: () => import('../views/reportes/ReportesView.vue'),
        meta: { requireAuth: true },
      },
      {
        path: 'configurar-roles',
        name: 'configurar-roles',
        component: () => import('../views/admin/ConfigurarRoles.vue'),
        meta: { requireAuth: true, requireAdmin: true },
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
