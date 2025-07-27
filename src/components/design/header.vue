<template>
  <header class="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
    <div class="flex items-center justify-between">
      <!-- Información del usuario -->
      <div class="flex items-center space-x-4">
        <div class="flex items-center space-x-3">
          <img 
            src="https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png" 
            alt="Avatar" 
            class="w-10 h-10 rounded-full border-2 border-gray-200"
          />
          <div>
            <h2 class="text-lg font-semibold text-gray-900">MANUEL VEGA</h2>
            <p class="text-sm text-gray-600">Profesor</p>
          </div>
        </div>
      </div>

      <!-- Mensaje de bienvenida -->
      <div class="flex-1 mx-8">
        <h1 class="text-xl font-bold text-gray-900">Bienvenido MANUEL</h1>
        <p class="text-sm text-gray-600">Revisa la última Información</p>
      </div>

      <!-- Controles del lado derecho -->
      <div class="flex items-center space-x-4">
        <!-- Barra de búsqueda -->
        <div class="relative">
          <el-input 
            placeholder="Buscar"
            class="search-input"
            style="width: 200px;"
          >
            <template #prefix>
              <el-icon class="text-gray-400">
                <Search />
              </el-icon>
            </template>
          </el-input>
        </div>

        <!-- Dropdowns -->
        <div class="flex items-center space-x-3">
          <el-select 
            v-model="departamento" 
            placeholder="Departamento"
            class="custom-select"
            style="width: 150px;"
          >
            <el-option label="Atlántico" value="atlantico" />
            <el-option label="Bolívar" value="bolivar" />
            <el-option label="Córdoba" value="cordoba" />
          </el-select>

          <el-select 
            v-model="municipio" 
            placeholder="Municipio"
            class="custom-select"
            style="width: 150px;"
          >
            <el-option label="Soledad" value="soledad" />
            <el-option label="Barranquilla" value="barranquilla" />
            <el-option label="Cartagena" value="cartagena" />
          </el-select>

          <el-date-picker 
            v-model="fecha" 
            type="date" 
            placeholder="DD/MM/AAAA"
            class="custom-date-picker"
            style="width: 150px;"
          />
        </div>

        <!-- Notificaciones y usuario -->
        <Notifications class="ml-4" />
        <el-dropdown :hide-on-click="false">
          <span class="el-dropdown-link flex items-center cursor-pointer">
            <img class="w-10 h-10 rounded-full border-2 border-gray-200" src="https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png" alt="Avatar" />
            <span class="ml-2 text-gray-900 font-semibold">{{ user?.nombres.split(' ')[0] }}</span>
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
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import Notifications from '@/components/design/Navigations/Notifications.vue'
import { AuthService } from '@/services/authServices';
import { useRouter } from 'vue-router';
import type { userToken } from '@/interfaces/userType';

const departamento = ref('atlantico')
const municipio = ref('soledad')
const fecha = ref('')

const router = useRouter();
const user: userToken | null = AuthService.getUserInfo();

const signOut = () => {
  AuthService.logout();
  router.push('/');
};
</script>

<style scoped>
/* Estilos para la barra de búsqueda */
.search-input :deep(.el-input__wrapper) {
  border: 1px solid #d1d5db;
  background-color: white;
  box-shadow: none;
}

.search-input :deep(.el-input__wrapper:hover) {
  border-color: #9ca3af;
}

.search-input :deep(.el-input__wrapper.is-focus) {
  border-color: #3b82f6;
  box-shadow: 0 0 0 1px #3b82f6;
}

/* Estilos para selects */
.custom-select :deep(.el-input__wrapper) {
  border: 1px solid #d1d5db;
  background-color: white;
  box-shadow: none;
}

.custom-select :deep(.el-input__wrapper:hover) {
  border-color: #9ca3af;
}

.custom-select :deep(.el-input__wrapper.is-focus) {
  border-color: #3b82f6;
  box-shadow: 0 0 0 1px #3b82f6;
}

/* Estilos para date picker */
.custom-date-picker :deep(.el-input__wrapper) {
  border: 1px solid #d1d5db;
  background-color: white;
  box-shadow: none;
}

.custom-date-picker :deep(.el-input__wrapper:hover) {
  border-color: #9ca3af;
}

.custom-date-picker :deep(.el-input__wrapper.is-focus) {
  border-color: #3b82f6;
  box-shadow: 0 0 0 1px #3b82f6;
}
</style>
  