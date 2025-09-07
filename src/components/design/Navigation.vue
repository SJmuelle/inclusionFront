<template>

  <el-menu :default-active="activeIndex.link" active-text-color="#C7D2FE" background-color="#1F2937"
    class="el-menu-vertical-demo custom-menu" text-color="#fff" @open="handleOpen" @close="handleClose" router>

    <!-- LOGO + TEXTO -->
    <div class="flex items-center px-6 ">
      <img src="@/assets/logoBlanco.svg" alt="Logo" class="w-16" />
      <div>
        <span class="logo-text ">Sistema Integrado Educación Inclusiva</span>
      </div>

    </div>

    <!-- Dashboard -->
    <el-menu-item index="/admin/dashboard" class="custom-menu-item">
      <router-link to="/admin/dashboard">
        <el-icon>
          <Document />
        </el-icon>
        <span class="custom-menu-title">Home</span>
      </router-link>
    </el-menu-item>

    <!-- Administración -->
    <el-sub-menu index="2" class="custom-sub-menu">
      <template #title>

        <el-icon>
          <Refresh />
        </el-icon>
        <span class="custom-menu-title">Piar</span>
      </template>

      <el-menu-item index="/admin/piar" class="custom-menu-item">
        <router-link to="/admin/piar">
          <el-icon>
            <user />
          </el-icon>
          Registro
        </router-link>
      </el-menu-item>

    </el-sub-menu>

  </el-menu>

</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue'
import {
  Setting,
  House,
  User,
  UserFilled,
  Document,
  DocumentChecked,
  CreditCard,
  Download,
  Upload,
  UploadFilled,
  Tickets,
  Refresh
} from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const activeIndex = reactive({ link: route.path })

watch(
  () => route.path,
  (newPath) => {
    activeIndex.link = newPath
  }
)

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>
<style scoped>
ul.el-menu.el-menu--vertical.el-menu-vertical-demo.custom-menu.bg-gray-800.text-white.flex-shrink-0.w-64.hidden.md\:block {
  border: none;
}
</style>