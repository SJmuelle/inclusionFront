<template>
  <div class="contenedor-principal">
    <h2>Componente Principal</h2>
    <el-button type="primary" @click="drawerVisible = true">
      Abrir Drawer Interno
    </el-button>

    <!-- Contenedor donde se mostrará el drawer -->
    <div class="drawer-wrapper">
      <el-drawer
        v-model="drawerVisible"
        title="Drawer Interno"
        direction="rtl"
        size="250px"
        :append-to-body="false"
      >
        <p>Este drawer está contenido dentro del div.</p>
        <el-button type="danger" @click="drawerVisible = false">
          Cerrar
        </el-button>
      </el-drawer>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const drawerVisible = ref(false)

// Accedemos a la ruta actual
const route = useRoute()

// Si tu parámetro se llama `id`
const id = route.params.id as string

console.log('ID:', id)
</script>

<style scoped>
.contenedor-principal {
  border: 2px solid #ccc;
  padding: 20px;
  width: 600px;
  height: 400px;
  position: relative;
}

.drawer-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px dashed #999;
  margin-top: 20px;
}
</style>