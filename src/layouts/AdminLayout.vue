<template>
  <div class="flex flex-col h-screen">
    <div class="flex flex-grow">
      <!-- Menú lateral izquierdo -->
      <Navigation class="bg-gray-800 text-white flex-shrink-0 w-64 hidden " :class="drawer2 == true?'md:block':'hidden'" ></Navigation>


      <!-- Contenido principal -->
      <main class="flex-grow overflow-y-auto">
        <nav class="bg-gray-800 ">
          <div class="w-screen-xl flex   flex-row  items-center justify-between ">

            <div class="div">
              <button data-collapse-toggle="navbar-search" type="button" @click="drawer = true"
                class="md:hidden  inline-flex items-center p-2 m-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg  hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200  "
                aria-controls="navbar-search" aria-expanded="false">
                <svg class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <button data-collapse-toggle=" navbar-search" type="button" @click="drawer2 = !drawer2"
                class="md:inline-flex hidden items-center p-2 m-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg  hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200  "
                aria-controls="navbar-search" aria-expanded="false">
                <svg class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>


            <div class="grid grid-cols-2 sm:order-2  ">

              <FullScreen></FullScreen>

              <User></User>

            </div>
          </div>
        </nav>

        <router-view></router-view>
        <!-- Footer al final de la página -->

      </main>
    </div>

    <div class="bg-gray-200  buttom-0 ">
      <Footer></Footer>
    </div>
  </div>


  <el-drawer v-model="drawer" title="" size="16rem" class="bg-gray-800 text-white flex-shrink-0" direction="ltr"
    :before-close="handleClose">
    <Navigation></Navigation>
  </el-drawer>

</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import type { DrawerProps } from 'element-plus'
import { RouterView } from 'vue-router'
import Footer from '@/components/design/Footer.vue'
import Navigation from '@/components/design/Navigation.vue'
import FullScreen from '@/components/design/Navigations/FullScreen.vue';
import User from '@/components/design/Navigations/User.vue';
const drawer = ref(false)
const drawer2 = ref(false)
const direction = ref<DrawerProps['direction']>('rtl')
const radio1 = ref('Option 1')
const handleClose = (done: () => void) => {
  done()
}
function cancelClick() {
  drawer2.value = false
}
function confirmClick() {
  drawer2.value = false
}
</script>