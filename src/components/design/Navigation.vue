<template>
  <div :class="['menu-container', 'hidden', 'md:block', 'flat-menu', collapsed ? 'collapsed' : '']">
    <button @click="toggleCollapse" class="w-full flex items-center justify-end px-3 py-2 focus:outline-none text-slate-400 hover:text-blue-400 transition mb-2">
      <svg v-if="!collapsed" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5"/></svg>
      <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14"/></svg>
    </button>
    <el-menu
      active-text-color="#2563eb"
      background-color="transparent"
      class="el-menu-vertical-demo custom-menu simple-menu"
      default-active="1"
      text-color="#ffffff"
      router
    >
      <el-menu-item
        v-for="item in menuOptions"
        :key="item.route"
        :index="item.route"
        :route="item.route"
        class="custom-menu-item"
      >
        <span class="active-bar" />
        <el-tooltip v-if="collapsed" :content="item.label" placement="right">
          <el-icon class="menu-icon-fuse">
            <!-- Puedes mapear iconos aquí si lo deseas -->
            <User v-if="item.key === 'perfil'" />
            <UserFilled v-else-if="item.key === 'estudiantes' || item.key === 'actores'" />
            <Document v-else-if="item.key === 'piar' || item.key === 'seguimiento'" />
            <PieChart v-else-if="item.key === 'reportes'" />
          </el-icon>
        </el-tooltip>
        <el-icon v-else class="menu-icon-fuse">
          <User v-if="item.key === 'perfil'" />
          <UserFilled v-else-if="item.key === 'estudiantes' || item.key === 'actores'" />
          <Document v-else-if="item.key === 'piar' || item.key === 'seguimiento'" />
          <PieChart v-else-if="item.key === 'reportes'" />
        </el-icon>
        <span v-if="!collapsed" class="menu-label hidden md:inline">{{ item.label }}</span>
      </el-menu-item>
      <div class="my-4 border-t border-slate-700 mx-4"></div>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { User, Document, Bell, UserFilled, DocumentChecked, PieChart } from '@element-plus/icons-vue'
// Si tienes un ícono de grupo, por ejemplo UserGroup, impórtalo aquí:
// import { UserGroup } from '@element-plus/icons-vue'
import { AuthService } from '@/services/authServices';
import { useRouter } from 'vue-router';
import type { userToken } from '@/interfaces/userType';
import { MENU_OPTIONS, ROLE_MENU_CONFIG } from '@/data/roleMenuConfig';

const router = useRouter();
const user: userToken | null = AuthService.getUserInfo();

// Obtener el rol del usuario autenticado (ajusta el campo según tu estructura)
// Por ejemplo, si el rol viene en user.company o en getPropExt().tipoActor
const userRole = user?.company || 'admin'; // Cambia esto por el campo real de rol/actor

// Leer configuración de menú desde localStorage o usar la configuración por defecto
let roleMenuConfig: Record<string, string[]> = ROLE_MENU_CONFIG;
const localConfig = localStorage.getItem('roleMenuConfig');
if (localConfig) {
  try {
    roleMenuConfig = JSON.parse(localConfig);
  } catch (e) {
    // Si hay error, usa la configuración por defecto
    roleMenuConfig = ROLE_MENU_CONFIG;
  }
}

const allowedMenuKeys = roleMenuConfig[userRole] || [];
const menuOptions = MENU_OPTIONS.filter(option => allowedMenuKeys.includes(option.key));

const signOut = () => {
  AuthService.logout();
  router.push('/');
};

const collapsed = ref(false);
const toggleCollapse = () => {
  collapsed.value = !collapsed.value;
};
</script>

<style scoped>
.flat-menu {
  max-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  background: #18181b;
  width: 4.5rem;
  transition: width 0.2s;
  margin: 0;
  box-shadow: none;
  padding: 1.2rem 0.2rem;
  border-radius: 0;
  border: none;
}
.flat-menu:not(.collapsed) {
  width: 15rem;
  padding: 1.2rem 0.7rem;
}
.flat-menu.collapsed .menu-label {
  display: none !important;
}
.flat-menu.collapsed {
  width: 4.5rem !important;
  padding: 1.2rem 0.2rem;
}
.active-bar {
  display: block;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%) scaleY(0.7);
  width: 3px;
  height: 60%;
  border-radius: 2px;
  background: #2563eb;
  opacity: 0;
  transition: opacity 0.2s, height 0.2s;
}
.custom-menu-item.is-active .active-bar {
  opacity: 1;
  height: 80%;
}
.menu-icon-fuse {
  font-size: 2.1rem !important;
  color: #cbd5e1;
  background: transparent !important;
  border-radius: 0;
  padding: 0.2rem 0.4rem;
  margin: 0 0.5rem 0 0.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-shadow: none !important;
  transition: color 0.2s;
}
.only-icons-menu .custom-menu-item {
  justify-content: flex-start;
  padding-left: 0 !important;
  padding-right: 0 !important;
}
.custom-menu-item {
  transition: color 0.2s;
  border-left: none;
  padding-top: 1rem !important;
  padding-bottom: 1rem !important;
  font-size: 1.08rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  display: flex;
  align-items: center;
  border-radius: 0;
  margin: 0;
  position: relative;
  padding-left: 1.2rem !important;
  padding-right: 0.7rem !important;
  min-height: 52px;
  box-shadow: none !important;
  background: none !important;
}
.custom-menu-item:hover {
  color: #2563eb !important;
  background: transparent !important;
  box-shadow: none !important;
}
.custom-menu-item:hover .menu-icon-fuse {
  color: #2563eb !important;
}
.custom-menu-item.is-active {
  color: #2563eb !important;
  background: transparent !important;
  box-shadow: none !important;
  border-radius: 0 !important;
}
.custom-menu-item.is-active .menu-icon-fuse {
  color: #2563eb !important;
}
.menu-label {
  flex: 1;
  font-size: 1rem;
  color: #fff;
  letter-spacing: 0.01em;
  z-index: 1;
  position: relative;
  margin-left: 0.5rem;
  transition: color 0.2s;
}
.custom-menu-item.is-active .menu-label {
  color: #2563eb;
  font-weight: 700;
}
/* Separador visual */
.modern-menu .my-4 {
  border-top: 1.5px solid #334155;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}

.custom-menu {
  transition: width 0.3s;
  border-right: none;
}

.app-name-container {
  padding: 20px 16px;
  text-align: center;
  background-color: #0f172a;
  border-bottom: 1px solid #1e40af;
}

.app-name {
  font-size: 18px;
  color: #ffffff;
  font-weight: bold;
}

/* Estilos para submenús */
:deep(.el-sub-menu__title) {
  color: #ffffff !important;
}

:deep(.el-sub-menu__title:hover) {
  background-color: #1e40af !important;
}

:deep(.el-menu-item) {
  color: #ffffff !important;
  background-color: #0f172a !important;
}

:deep(.el-menu-item:hover) {
  background-color: #1e40af !important;
}

:deep(.el-menu-item.is-active) {
  background-color: #1e40af !important;
  color: #ffffff !important;
}

:deep(.el-sub-menu .el-menu-item) {
  background-color: #0f172a !important;
  padding-left: 48px !important;
}

:deep(.el-sub-menu .el-menu-item:hover) {
  background-color: #1e40af !important;
}

.user-block {
  box-shadow: 0 4px 24px 0 rgba(30,64,175,0.10);
  border: 1.5px solid #334155;
  position: relative;
  z-index: 2;
}

.only-icons-menu .custom-menu-item {
  justify-content: center;
  padding-left: 0 !important;
  padding-right: 0 !important;
}
.menu-icon-only {
  font-size: 2.5rem !important;
  color: #60a5fa;
  background: transparent !important;
  border-radius: 0;
  padding: 0.2rem;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: none !important;
  transition: color 0.2s;
}
.custom-menu-item:hover .menu-icon-only {
  color: #93c5fd;
  background: transparent !important;
}
.custom-menu-item.is-active .menu-icon-only {
  color: #fff;
  background: transparent !important;
}
.menu-icon-actores {
  color: #38bdf8 !important;
}
.menu-icon-reportes-adjusted {
  color: #2563eb !important;
  font-size: 2.3rem !important;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

/* Fuerza que Element Plus no ponga fondo en hover/activo */
.el-menu-item.is-active,
.el-menu-item:hover,
.el-menu-item:focus {
  background: transparent !important;
  box-shadow: none !important;
}

@media (max-width: 767px) {
  .menu-container {
    display: none;
  }

  .custom-menu {
    width: 100%;
  }

  .custom-menu-item {
    text-align: left;
  }

  .app-name {
    font-size: 16px;
  }
}
</style>
