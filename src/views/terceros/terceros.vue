<template>
  
    <div class="max-w-7xl mx-auto p-8 bg-white shadow-lg rounded-lg space-y-8">
      <!-- Encabezado del formulario -->
      <h1 class="new-section-title">
        <el-icon class="new-section-icon"><tools /></el-icon>
        Creación de Terceros
      </h1>
  
      <!-- Formulario -->
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Fila 1 -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label for="id" class="block text-sm font-medium text-gray-700">ID</label>
            <input
              type="text"
              id="id"
              v-model="form.id"
              class="mt-1 block w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 transition"
            />
          </div>
          <div>
            <label for="buscar" class="block text-sm font-medium text-gray-700">Buscar</label>
            <input
              type="text"
              id="buscar"
              v-model="form.buscar"
              class="mt-1 block w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 transition"
            />
          </div>
          <div>
            <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              id="nombre"
              v-model="form.nombre"
              class="mt-1 block w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 transition"
            />
          </div>
        </div>
  
        <!-- Fila 2 -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label for="nit" class="block text-sm font-medium text-gray-700">NIT/C</label>
            <input
              type="text"
              id="nit"
              v-model="form.nit"
              class="mt-1 block w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 transition"
            />
          </div>
          <div>
            <label for="razon" class="block text-sm font-medium text-gray-700">Razón Social</label>
            <input
              type="text"
              id="razon"
              v-model="form.razon"
              class="mt-1 block w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 transition"
            />
          </div>
          <div>
            <label for="telefono" class="block text-sm font-medium text-gray-700">Teléfono</label>
            <input
              type="text"
              id="telefono"
              v-model="form.telefono"
              class="mt-1 block w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 transition"
            />
          </div>
        </div>
  
        <!-- Botón de guardar -->
        <div class="flex justify-end">
          <button
            type="submit"
            class="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
          >
            Guardar
          </button>
        </div>
      </form>
  
      <!-- Tabla de registros -->
      <div class="mt-8">
        <h2 class="text-2xl font-semibold mb-4 text-gray-800">Lista de Terceros</h2>
        <table class="min-w-full table-auto bg-white border border-gray-300 rounded-lg shadow-md">
          <thead class="bg-gray-200 text-gray-600">
            <tr>
              <th class="px-4 py-2 text-left">ID</th>
              <th class="px-4 py-2 text-left">Nombre</th>
              <th class="px-4 py-2 text-left">NIT/C</th>
              <th class="px-4 py-2 text-left">Razón Social</th>
              <th class="px-4 py-2 text-left">Teléfono</th>
              <th class="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(tercero, index) in terceros" :key="index" class="border-t">
              <td class="px-4 py-2">{{ tercero.id }}</td>
              <td class="px-4 py-2">{{ tercero.nombre }}</td>
              <td class="px-4 py-2">{{ tercero.nit }}</td>
              <td class="px-4 py-2">{{ tercero.razon }}</td>
              <td class="px-4 py-2">{{ tercero.telefono }}</td>
              <td class="px-4 py-2">
                <button
                  class="text-blue-500 hover:underline"
                  @click="editarTercero(index)"
                >
                  Editar
                </button>
                |
                <button
                  class="text-red-500 hover:underline"
                  @click="eliminarTercero(index)"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        form: {
          id: '',
          buscar: '',
          nombre: '',
          nit: '',
          razon: '',
          telefono: '',
        },
        terceros: [], // Lista de registros
      };
    },
    methods: {
      handleSubmit() {
        // Guardar el nuevo registro en la lista de terceros
        this.terceros.push({ ...this.form });
        // Limpiar formulario
        this.form = {
          id: '',
          buscar: '',
          nombre: '',
          nit: '',
          razon: '',
          telefono: '',
        };
      },
      editarTercero(index) {
        // Llenar el formulario con los datos seleccionados para edición
        this.form = { ...this.terceros[index] };
        // Eliminar de la lista temporalmente para editar
        this.terceros.splice(index, 1);
      },
      eliminarTercero(index) {
        // Eliminar el tercero de la lista
        this.terceros.splice(index, 1);
      },
    },
  };
  </script>
  
  <style scoped>
  .new-section-title {
    display: flex; /* Para alinear el icono y el texto */
    align-items: center; /* Centrar verticalmente */
    margin-bottom: 20px; /* Espacio entre secciones */
    font-size: 2.5em;
    color: #007bff; /* Color del texto */
    transition: color 0.3s, text-shadow 0.3s; /* Transiciones suaves */
  }
  </style>
  