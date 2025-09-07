<template>
  <div class="config-roles-container">
    <div class="config-header">
      <el-icon class="config-title-icon"><Setting /></el-icon>
      <div>
        <h1 class="config-title">Configurar visibilidad de menú por rol</h1>
        <div class="config-desc">
          <el-icon class="desc-icon"><InfoFilled /></el-icon>
          <span>
            Selecciona qué opciones de menú puede ver cada tipo de usuario. <br>
            <el-icon class="desc-icon"><UserGroup /></el-icon> <b>Estudiantes</b>,
            <el-icon class="desc-icon"><Notebook /></el-icon> <b>PIAR</b>,
            <el-icon class="desc-icon"><Histogram /></el-icon> <b>Seguimiento</b>,
            <el-icon class="desc-icon"><Tickets /></el-icon> <b>Actores</b>,
            <el-icon class="desc-icon"><PieChart /></el-icon> <b>Reportes</b>
          </span>
        </div>
      </div>
    </div>
    <el-divider><el-icon><Menu /></el-icon> Opciones de menú</el-divider>
    <el-table :data="roles" class="config-table" border>
      <el-table-column prop="role" label="Rol/Actor" width="160" />
      <el-table-column
        v-for="option in menuOptions"
        :key="option.key"
        :label="''"
        align="center"
        min-width="120"
      >
        <template #header>
          <span class="header-icon-label">
            <el-icon :size="22">
              <component :is="getMenuIcon(option.key)" />
            </el-icon>
            <span>{{ option.label }}</span>
          </span>
        </template>
        <template #default="{ row }">
          <el-checkbox
            v-model="roleMenu[row.role]"
            :label="option.key"
            @change="saveConfig"
          />
        </template>
      </el-table-column>
    </el-table>
    <el-divider>
      <el-icon><CircleCheck /></el-icon>
      Guardar cambios
    </el-divider>
    <el-button type="primary" class="mt-4" @click="saveConfig">
      <el-icon><CircleCheck /></el-icon>
      Guardar configuración
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MENU_OPTIONS, ROLES, ROLE_MENU_CONFIG } from '@/data/roleMenuConfig';
import {
  User, UserFilled, Document, PieChart, Setting, Check,
  Avatar, Notebook, Histogram, Tickets, InfoFilled, Menu, CircleCheck
} from '@element-plus/icons-vue';
import { ElNotification } from 'element-plus';

const menuOptions = MENU_OPTIONS;
const roles = ROLES.map(role => ({ role }));

const roleMenu = ref<Record<string, string[]>>({ ...ROLE_MENU_CONFIG });

function saveConfig() {
  localStorage.setItem('roleMenuConfig', JSON.stringify(roleMenu.value));
  ElNotification({
    title: 'Éxito',
    message: '¡Configuración guardada!',
    type: 'success',
    duration: 2500
  });
}

function getMenuIcon(key: string) {
  switch (key) {
    case 'perfil': return Avatar;
  
    case 'piar': return Notebook;
    case 'seguimiento': return Histogram;
    case 'actores': return Tickets;
    case 'reportes': return PieChart;
    default: return Setting;
  }
}
</script>

<style scoped>
.config-roles-container {
  padding: 2rem;
  background: #f8fafc;
  border-radius: 16px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.06);
  max-width: 1000px;
  margin: 2rem auto;
}
.config-header {
  display: flex;
  align-items: flex-start;
  gap: 1.2rem;
  margin-bottom: 1.5rem;
}
.config-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.config-title-icon {
  font-size: 2.2rem;
  color: #2563eb;
  margin-top: 0.2rem;
}
.config-desc {
  font-size: 1.1rem;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 0.5em;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
}
.desc-icon {
  color: #2563eb;
  vertical-align: middle;
  margin-right: 0.2em;
}
.config-table {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
}
.header-icon-label {
  display: flex;
  align-items: center;
  gap: 0.5em;
  justify-content: center;
}
.mt-4 {
  margin-top: 1.5rem;
}
</style> 