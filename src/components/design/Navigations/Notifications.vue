<template>
  <div>
    <el-dropdown :hide-on-click="false">
      <span class="el-dropdown-link">
        <el-badge :value="notifications.length" :hidden="notifications.length === 0">
          <el-icon class="text-blue-600 text-xl cursor-pointer hover:text-blue-800">
            <Bell />
          </el-icon>
        </el-badge>
      </span>
      <template #dropdown>
        <el-dropdown-menu class="divide-y divide-gray-100 shadow border border-blue-200">
          <el-dropdown-item disabled class="px-4 py-3 text-sm text-blue-800">
            <div>Notificaciones</div>
          </el-dropdown-item>
          <el-dropdown-item 
            v-for="(notification, index) in notifications" 
            :key="index"
            class="py-2 text-sm text-blue-700 hover:bg-blue-50"
          >
            {{ notification }}
          </el-dropdown-item>
          <el-dropdown-item 
            v-if="notifications.length === 0"
            class="py-2 text-sm text-gray-500"
          >
            No hay notificaciones
          </el-dropdown-item>
          <el-dropdown-item 
            v-if="notifications.length > 0"
            @click="clearNotifications"
            class="py-2 text-sm text-blue-600 hover:bg-blue-50"
          >
            Limpiar todas
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Bell } from '@element-plus/icons-vue';

const notifications = ref([
  'Nuevo PIAR creado para Juan Carlos',
  'Evaluación pendiente para María Isabel',
  'Acta de acuerdo firmada por todos los actores'
]);

const clearNotifications = () => {
  notifications.value = [];
};
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>