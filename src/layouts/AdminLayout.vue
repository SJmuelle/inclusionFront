<template>


    <div class="flex flex-col h-screen">
        <div class="flex flex-grow">
            <!-- Menú lateral izquierdo -->
            <nav class="w-64 bg-gray-800 text-white flex-shrink-0">
                <Navigation></Navigation>
            </nav>

            <!-- Contenido principal -->
            <main class="flex-grow overflow-y-auto">
                <router-view></router-view>
                <!-- Footer al final de la página -->
                <footer class="bg-gray-200">
                    <Footer></Footer>
                </footer>
            </main>
        </div>


    </div>



</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Footer from '@/components/design/Footer.vue'
import Navigation from '@/components/design/Navigation.vue'
import Shortcuts from '@/components/design/Shortcuts.vue'

</script>
