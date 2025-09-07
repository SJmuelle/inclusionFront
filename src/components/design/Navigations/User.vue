<template>
  <div>
    <!-- Avatar Button -->
    <el-dropdown :hide-on-click="false">
      <div class="flex justify-between gap-4 mr-4 ">
        <span class="el-dropdown-link justify-item-end">
          <img id="avatarButton" type="button" class="w-10 h-10 rounded-full cursor-pointer border-4 border-white"
            src="https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png" alt="User dropdown">
        </span>
        <spam class="text-white capitalize mt-3"> {{ user?.nombre.split(' ')[0] }} {{ user?.apellido.split(' ')[0] }}</spam>
      </div>

      <template #dropdown>
        <!-- Dropdown menu -->
        <el-dropdown-menu class="divide-y divide-gray-100 shadow border border-blue-200">
          <el-dropdown-item disabled class="px-4 py-3 text-sm text-blue-800 capitalize">
            <div class="text-gray-500">Hola, {{ user?.nombre.split(' ')[0] }}</div>
          </el-dropdown-item>

          <el-dropdown-item href="#" @click="signOut"
            class="block px-4 py-2 text-sm hover:bg-blue-50 text-blue-700">Cerrar sesión</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { AuthService } from '@/services/authServices';
import { useRouter } from 'vue-router';
import type { userToken } from '@/interfaces/userType';
const router = useRouter();

const user: userToken | null = AuthService.getUserInfo()

const signOut = () => {
  AuthService.logout();
  router.push('/');
};
</script>

<style scoped>
/* Estilos CSS si es necesario */
</style>
