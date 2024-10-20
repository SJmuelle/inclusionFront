<template>
  <div>
    <!-- Avatar Button -->
    <el-dropdown :hide-on-click="false">
      <span class="el-dropdown-link">
        <img id="avatarButton" type="button" class="w-10 h-10 rounded-full cursor-pointer border-4 border-white"
          src="https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png" alt="User dropdown">
      </span>
      <template #dropdown>
        <!-- Dropdown menu -->
        <el-dropdown-menu class="  divide-y divide-gray-100 shadow  border border-white">
          <el-dropdown-item disabled class="px-4 py-3 text-sm text-violet-950">
            <div>Holaaa, {{ user?.nombres.split(' ')[0] }}</div>
            <div>{{ user?.company }}</div>
          </el-dropdown-item>
          <el-dropdown-item class="py-2 text-sm text-violet-950">Perfil</el-dropdown-item>
          <el-dropdown-item href="#" @click="signOut"
            class="block px-4 py-2 text-sm  hover:bg-violet-950 ">Cerrar sesión</el-dropdown-item>
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
