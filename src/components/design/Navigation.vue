<template>
  <div class="menu-container"> <!-- Contenedor para el scroll -->
    <el-menu
      active-text-color="#ffd04b"
      background-color="#1F2937"
      class="el-menu-vertical-demo custom-menu"
      default-active="2"
      text-color="#fff"
      @open="handleOpen"
      @close="handleClose"
    >
      <!-- Nombre de la Aplicación -->
      <div class="app-name-container">
        <span class="app-name">POS</span>
      </div>

      <!-- Dashboard -->
      <router-link to="/dashboard">
        <el-menu-item index="4" class="custom-menu-item">
          <el-icon>
            <document />
          </el-icon>
          Dashboard
        </el-menu-item>
      </router-link>

      <!-- Administración -->
      <el-sub-menu index="1" class="custom-sub-menu">
        <template #title>
          <el-icon>
            <setting />
          </el-icon>
          <span class="custom-menu-title">Administración</span>
        </template>
        <router-link to="admin/bodega">
          <el-menu-item index="1-1" class="custom-menu-item">
            <el-icon>
              <house />
            </el-icon>
            Crear bodegas
          </el-menu-item>
        </router-link>
        <router-link to="/gestionar-usuarios">
          <el-menu-item index="1-2" class="custom-menu-item">
            <el-icon>
              <user />
            </el-icon>
            Gestionar usuarios
          </el-menu-item>
        </router-link>
        <router-link to="/crear-clientes">
          <el-menu-item index="1-3" class="custom-menu-item">
            <el-icon>
              <user-filled />
            </el-icon>
            Crear clientes y terceros
          </el-menu-item>
        </router-link>
      </el-sub-menu>

      <!-- Facturación -->
      <el-sub-menu index="2" class="custom-sub-menu">
        <template #title>
          <el-icon>
            <document />
          </el-icon>
          <span class="custom-menu-title">Facturación</span>
        </template>
        <router-link to="/sale">
          <el-menu-item index="2-1" class="custom-menu-item">
            <el-icon>
              <document-checked />
            </el-icon>
            Facturación
          </el-menu-item>
        </router-link>
        <router-link to="/nota-credito">
          <el-menu-item index="2-2" class="custom-menu-item">
            <el-icon>
              <credit-card />
            </el-icon>
            Nota crédito
          </el-menu-item>
        </router-link>
        <router-link to="/nota-debito">
          <el-menu-item index="2-3" class="custom-menu-item">
            <el-icon>
              <document-remove />
            </el-icon>
            Nota débito
          </el-menu-item>
        </router-link>
      </el-sub-menu>

      <!-- Utilidades -->
      <el-sub-menu index="3" class="custom-sub-menu">
        <template #title>
          <el-icon>
            <upload />
          </el-icon>
          <span class="custom-menu-title">Utilidades</span>
        </template>
        <router-link to="/importar-archivo">
          <el-menu-item index="3-1" class="custom-menu-item">
            <el-icon>
              <upload-filled />
            </el-icon>
            Importar archivo plano
          </el-menu-item>
        </router-link>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import {
  Setting,
  House,
  User,
  UserFilled,
  Document,
  DocumentChecked,
  CreditCard,
  DocumentRemove,
  Upload,
  UploadFilled,
} from '@element-plus/icons-vue'

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style scoped>
.menu-container {
  max-height: 80vh; /* Altura máxima del menú */
  overflow-y: auto; /* Permitir scroll vertical */
  overflow-x: hidden; /* Deshabilitar scroll horizontal */
}

/* Personalización de la barra de desplazamiento */
.menu-container::-webkit-scrollbar {
  width: 12px; /* Ancho de la barra de desplazamiento */
}

.menu-container::-webkit-scrollbar-track {
  background: #2b2b2b; /* Color del fondo de la barra de desplazamiento */
}

.menu-container::-webkit-scrollbar-thumb {
  background-color: #ffd04b; /* Color de la barra de desplazamiento */
  border-radius: 10px; /* Bordes redondeados */
}

.menu-container::-webkit-scrollbar-thumb:hover {
  background-color: #e5b400; /* Color de la barra de desplazamiento al pasar el mouse */
}

.custom-menu {
  transition: width 0.3s;
}

.app-name-container {
  padding: 16px; /* Espaciado alrededor del nombre */
  text-align: center; /* Centrar el texto */
  background-color: #1F2937; /* Color de fondo del nombre */
}

.app-name {
  font-size: 24px; /* Tamaño del texto */
  color: #ffd04b; /* Color del texto */
  font-weight: bold; /* Negrita */
}

/* Estilos de los elementos del menú */
.custom-menu-item {
  transition: background-color 0.2s, transform 0.2s;
}

.custom-menu-item:hover {
  background-color: #4B5563; /* Color de fondo en hover */
  transform: translateX(5px); /* Desplazamiento ligero a la derecha */
}

/* Estilos para los submenús */
.custom-sub-menu {
  padding-left: 20px; /* Espaciado a la izquierda para submenús */
}

.custom-menu-title {
  font-weight: bold; /* Negrita para el título del submenú */
}

/* Estilo responsivo */
@media (max-width: 768px) {
  .custom-menu {
    width: 100%; /* Full width on mobile */
  }

  .custom-menu-item {
    text-align: left; /* Alinear texto a la izquierda en móviles */
  }

  .app-name {
    font-size: 20px; /* Ajustar tamaño del texto en móviles */
  }
}
</style>
