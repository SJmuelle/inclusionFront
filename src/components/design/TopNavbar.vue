<template>
  <nav class="w-full bg-white shadow flex flex-wrap items-center justify-between px-2 sm:px-6 py-2 border-b border-gray-200">
    <!-- Logo o nombre de la app -->
    <div class="flex items-center flex-shrink-0">
      <span class="font-bold text-base sm:text-lg text-gray-800 whitespace-nowrap">Sistema PIAR</span>
    </div>
    <!-- Botón hamburguesa solo en móviles -->
    <button @click="$emit('toggle-menu')" class="md:hidden flex items-center justify-center ml-2 p-2 rounded hover:bg-gray-100 focus:outline-none">
      <svg class="w-7 h-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
    </button>
    <div class="flex items-center space-x-2 sm:space-x-6 ml-auto mt-2 md:mt-0">
      <!-- Notificaciones -->
      <Notifications />
      <!-- Usuario -->
      <el-dropdown :hide-on-click="false">
        <span class="el-dropdown-link flex items-center cursor-pointer">
          <img class="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-gray-200" src="https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png" alt="Avatar" />
          <span class="ml-1 sm:ml-2 text-gray-900 font-semibold text-xs sm:text-base">{{ user?.nombres.split(' ')[0] }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu class="divide-y divide-gray-100 shadow border border-blue-200">
            <el-dropdown-item disabled class="px-4 py-3 text-sm text-blue-800">
              <div>Hola, {{ user?.nombres.split(' ')[0] }}</div>
              <div>{{ user?.company }}</div>
            </el-dropdown-item>
            <el-dropdown-item @click="signOut" class="block px-4 py-2 text-sm hover:bg-blue-50 text-blue-700">Cerrar sesión</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </nav>
</template>

<script setup lang="ts">
import Notifications from '@/components/design/Navigations/Notifications.vue'
import { AuthService } from '@/services/authServices';
import { useRouter } from 'vue-router';
import type { userToken } from '@/interfaces/userType';

const router = useRouter();
const user: userToken | null = AuthService.getUserInfo();

const signOut = () => {
  AuthService.logout();
  router.push('/');
};
</script>

<style scoped>
nav {
  z-index: 50;
}
@media (max-width: 640px) {
  nav {
    flex-direction: column;
    align-items: stretch;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  .el-dropdown-link span {
    font-size: 13px;
  }
  .el-dropdown-link img {
    width: 32px;
    height: 32px;
  }
  .el-dropdown-menu {
    min-width: 120px;
  }
}
</style> 