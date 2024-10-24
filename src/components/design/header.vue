<template>
    <div class="bg-white shadow-md">
      <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 class="text-xl font-bold">Mi Aplicación</h1>
        <div class="relative">
          <button @click="toggleDropdown" class="relative focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
  
          <!-- Contenedor de notificaciones -->
          <div v-if="isDropdownOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
            <div class="py-2">
              <h2 class="text-gray-800 font-semibold px-4">Notificaciones</h2>
              <div class="border-b border-gray-200"></div>
              <ul>
                <li v-for="(notification, index) in notifications" :key="index" class="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  {{ notification }}
                </li>
              </ul>
              <div class="border-b border-gray-200"></div>
              <div class="px-4 py-2">
                <button @click="clearNotifications" class="text-blue-500 hover:underline">Limpiar Notificaciones</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isDropdownOpen: false,
        notifications: [
          "Notificación 1: Tienes un nuevo mensaje.",
          "Notificación 2: Se ha actualizado un evento.",
          "Notificación 3: Tienes una nueva solicitud.",
        ],
      };
    },
    methods: {
      toggleDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen;
      },
      clearNotifications() {
        this.notifications = [];
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos adicionales si es necesario */
  </style>
  