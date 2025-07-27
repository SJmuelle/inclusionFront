<template>
  <div class="flex flex-col h-screen">
    <TopNavbar @toggle-menu="toggleMenu" />
    <div class="flex flex-grow relative">
      <!-- Menú lateral izquierdo -->
      <nav
        class="w-64 bg-slate-900 text-white flex-shrink-0 md:block transition-all duration-300"
        :class="{
          'fixed top-0 left-0 h-full z-50 block md:relative md:z-auto md:h-auto': showMenu,
          'hidden': !showMenu && isMobile,
          'w-4/5 max-w-xs': showMenu && isMobile,
          'w-64': !isMobile || !showMenu
        }"
        style="min-width: 0;"
      >
        <Navigation />
      </nav>
      <!-- Overlay para cerrar el menú en móviles -->
      <div v-if="showMenu && isMobile" class="fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300" @click="closeMenu"></div>
      <!-- Contenido principal -->
      <main class="flex-grow overflow-y-auto bg-gray-50">
        <router-view></router-view>
        <!-- Footer al final de la página -->
        <footer class="bg-white border-t border-gray-200">
          <Footer />
        </footer>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterView } from 'vue-router'
import Footer from '@/components/design/Footer.vue'
import Navigation from '@/components/design/Navigation.vue'
import TopNavbar from '@/components/design/TopNavbar.vue'

console.log('AdminLayout.vue montado');

const showMenu = ref(false)
const isMobile = ref(window.innerWidth < 768)

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}
const closeMenu = () => {
  showMenu.value = false
}

const handleResize = () => {
  isMobile.value = window.innerWidth < 768
  if (!isMobile.value) showMenu.value = false
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>
