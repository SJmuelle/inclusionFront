// Opciones de menú disponibles
export const MENU_OPTIONS = [
  { key: 'perfil', label: 'Perfil', route: '/admin/perfil' },
  { key: 'estudiantes', label: 'Estudiantes', route: '/admin/estudiantes' },
  { key: 'piar', label: 'PIAR', route: '/admin/piar' },
  { key: 'seguimiento', label: 'Seguimiento', route: '/admin/seguimiento' },
  { key: 'actores', label: 'Gestión de Actores', route: '/admin/actores' },
  { key: 'reportes', label: 'Reportes', route: '/admin/reportes' }
];

// Roles/actores del sistema
export const ROLES = [
  'admin',
  'docente',
  'directivo',
  'familiar',
  'psicologo',
  'terapeuta',
  'otro'
];

// Configuración inicial de visibilidad de menú por rol
export const ROLE_MENU_CONFIG: Record<string, string[]> = {
  admin: ['perfil', 'estudiantes', 'piar', 'seguimiento', 'actores', 'reportes'],
  docente: ['perfil', 'estudiantes', 'piar', 'seguimiento', 'reportes'],
  directivo: ['perfil', 'estudiantes', 'piar', 'seguimiento', 'reportes'],
  familiar: ['perfil', 'seguimiento'],
  psicologo: ['perfil', 'seguimiento'],
  terapeuta: ['perfil', 'seguimiento'],
  otro: ['perfil']
}; 