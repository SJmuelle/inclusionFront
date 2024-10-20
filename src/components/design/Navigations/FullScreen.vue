<template>
  <button data-collapse-toggle="navbar-search" type="button" @click="toggleFullScreen"
    class="inline-flex items-center p-2 mx-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg  hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-gray-200  "
    aria-controls="navbar-search" aria-expanded="false">
    <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
    </svg>
  </button>
</template>
<script lang="ts" setup>

const toggleFullScreen = () => {
  // alert("holi")
  let elem = document.documentElement;
  if (!document.fullscreenElement) {
    // Solicitar pantalla completa
    elem.requestFullscreen().catch(err => {
      alert(`Error al intentar entrar en modo de pantalla completa: ${err.message} (${err.name})`);
    });
  } else {

    // Salir de pantalla completa
    document.exitFullscreen().catch(err => {

      alert(`Error al intentar salir del modo de pantalla completa: ${err.message} (${err.name})`);
    });
  }
}
</script>r