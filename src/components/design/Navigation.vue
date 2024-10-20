<template>
    <nav class="bg-gray-800 text-white">
        <!-- Botón de menú para móviles -->
        <div class="md:hidden flex items-center justify-between p-4">
            <h1 class="text-xl font-semibold">Menú</h1>
            <button @click="isOpen = !isOpen" class="focus:outline-none">
                <svg v-if="!isOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7">
                    </path>
                </svg>
                <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                    </path>
                </svg>
            </button>
        </div>

        <!-- Menú completo para pantallas medianas y grandes -->
        <div :class="isOpen ? 'block' : 'hidden'" class="md:block">
            <ul class="p-4 space-y-4">
                <li><router-link to="/generar-facturas" class="block py-2 px-4 hover:bg-gray-700 rounded">Generar
                        Facturas</router-link></li>
                <li><router-link to="/subir-archivo" class="block py-2 px-4 hover:bg-gray-700 rounded">Subir
                        Archivo</router-link></li>
                <li><router-link to="/configuracion"
                        class="block py-2 px-4 hover:bg-gray-700 rounded">Administración de usuarios</router-link></li>
            </ul>
        </div>
    </nav>
</template>

<script setup>
import { ref } from 'vue';

const isOpen = ref(false);
</script>

<style scoped>
/* Puedes añadir más estilos personalizados aquí si es necesario */
</style>