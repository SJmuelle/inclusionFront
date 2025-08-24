<template>
    <div class="bg-gray-800 text-white grid grid-cols-1 ">
        <p class="mx-6  text-gray-300  items-center p-1">
            {{ currentYear }} &copy; <span id="currentYear"></span> Sistema Piar- Todos los derechos
            reservados.</p>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const currentYear = ref(new Date().getFullYear());
</script>