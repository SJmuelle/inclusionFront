<template>
  <div class="dashboard-container">
    <h1 class="dashboard-title">
      <el-icon class="dashboard-icon"><house /></el-icon>
      Dashboard 
    </h1>
    <div class="cards-container">
      <!-- Indicadores de Bodegas -->
      <el-card class="card bg-blue-100 shadow-lg transition-transform duration-300 hover:-translate-y-1">
        <div class="card-header flex items-center border-b-2 border-gray-200 pb-2">
          <el-icon class="text-blue-600"><house /></el-icon>
          <h3 class="ml-2 text-lg font-semibold">Bodegas</h3>
        </div>
        <div class="card-body p-4">
          <p class="indicator-value text-3xl font-bold text-blue-600">{{ warehouseData.total }}</p>
          <p class="indicator-description text-gray-600">Total de Bodegas Registradas</p>
          <el-button class="mt-2 bg-blue-600 hover:bg-blue-700 text-white" type="primary" @click="goTo('/admin/bodegas')">Ver Detalles</el-button>
        </div>
      </el-card>

      <!-- Indicadores de Facturación -->
      <el-card class="card bg-green-100 shadow-lg transition-transform duration-300 hover:-translate-y-1">
        <div class="card-header flex items-center border-b-2 border-gray-200 pb-2">
          <el-icon class="text-green-600"><credit-card /></el-icon>
          <h3 class="ml-2 text-lg font-semibold">Facturación</h3>
        </div>
        <div class="card-body p-4">
          <p class="indicator-value text-3xl font-bold text-green-600">{{ billingData.total }}</p>
          <p class="indicator-description text-gray-600">Total Facturado Este Mes</p>
          <el-button class="mt-2 bg-green-600 hover:bg-green-700 text-white" type="primary" @click="goTo('/admin/facturacion')">Ver Detalles</el-button>
        </div>
      </el-card>

      <!-- Notas de Crédito -->
      <el-card class="card bg-yellow-100 shadow-lg transition-transform duration-300 hover:-translate-y-1">
        <div class="card-header flex items-center border-b-2 border-gray-200 pb-2">
          <el-icon class="text-yellow-600"><document-checked /></el-icon>
          <h3 class="ml-2 text-lg font-semibold">Notas de Crédito</h3>
        </div>
        <div class="card-body p-4">
          <p class="indicator-value text-3xl font-bold text-yellow-600">{{ creditNotesData.total }}</p>
          <p class="indicator-description text-gray-600">Total de Notas de Crédito Emitidas</p>
          <el-button class="mt-2 bg-yellow-600 hover:bg-yellow-700 text-white" type="primary" @click="goTo('/admin/notas-credito')">Ver Detalles</el-button>
        </div>
      </el-card>

      <!-- Notas de Débito -->
      <el-card class="card bg-red-100 shadow-lg transition-transform duration-300 hover:-translate-y-1">
        <div class="card-header flex items-center border-b-2 border-gray-200 pb-2">
          <el-icon class="text-red-600"><document-remove /></el-icon>
          <h3 class="ml-2 text-lg font-semibold">Notas de Débito</h3>
        </div>
        <div class="card-body p-4">
          <p class="indicator-value text-3xl font-bold text-red-600">{{ debitNotesData.total }}</p>
          <p class="indicator-description text-gray-600">Total de Notas de Débito Emitidas</p>
          <el-button class="mt-2 bg-red-600 hover:bg-red-700 text-white" type="primary" @click="goTo('/admin/notas-debito')">Ver Detalles</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { House, CreditCard, DocumentChecked, DocumentRemove } from '@element-plus/icons-vue';

const warehouseData = ref({ total: 15 });
const billingData = ref({ total: '$25,000' });
const creditNotesData = ref({ total: 5 });
const debitNotesData = ref({ total: 2 });

const router = useRouter();
const goTo = (path) => {
  router.push(path);
};
</script>

<style scoped>
.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.card {
  border-radius: 12px;
}

.indicator-value {
  font-size: 2.5em;
  font-weight: bold;
  color: #007bff; /* Este estilo se maneja ahora con Tailwind */
}

.indicator-description {
  color: #666; /* Este estilo se maneja ahora con Tailwind */
}

.dashboard-container {
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 10px;
}

.dashboard-title {
  display: flex; /* Para alinear el icono y el texto */
  align-items: center; /* Centrar verticalmente */
  margin-bottom: 30px;
  font-size: 2.5em;
  color: #007bff; /* Color del texto */
  transition: color 0.3s, text-shadow 0.3s; /* Transiciones suaves */
}

.dashboard-title:hover {
  color: #0056b3; /* Color al pasar el mouse */
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.3); /* Sombra al pasar el mouse */
}

.dashboard-icon {
  margin-right: 10px; /* Espacio entre el icono y el texto */
  font-size: 1.5em; /* Tamaño del icono */
  color: #007bff; /* Color del icono */
}
</style>
