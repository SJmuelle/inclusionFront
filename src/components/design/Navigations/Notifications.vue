<template>
  <el-button ref="buttonRef" v-click-outside="onClickOutside"
    class="bg-violet-900 border-none relative inline-flex items-center p-2 mx-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-gray-200">
    <svg class="h-6 w-6 text-white" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
      fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
      <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
    </svg>
    <span class="sr-only">Notificaciones</span>
    <div
      class="absolute  inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-violet-900 rounded-full -top-2 -end-2">
      2
    </div>
  </el-button>

  <el-popover ref="popoverRef" :virtual-ref="buttonRef" trigger="click" virtual-triggering
    class=" w-full max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow ">
    <div class="block px-4 py-2 font-medium text-center text-blue-50 rounded-t-lg bg-gradient-to-b from-slate-50 via-blue-600 to-blue-600">
      Notificaciones
    </div>
    <div class="divide-y divide-gray-100 ">
      <a href="#" class="flex px-4 py-3 hover:bg-gray-100 " v-for="notification in notifications"
        :key="notification.id">
        <div class="flex-shrink-0">
          <img :src="notification.imgSrc" :alt="notification.alt" class="rounded-full w-11 h-11" />
          <div :class="[
            'absolute flex items-center justify-center w-5 h-5 ms-6 -mt-5',
            notification.bgColor,
            'border border-white rounded-full ',
          ]">
            <svg class="w-2 h-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
              viewBox="0 0 18 18">
              <path :d="notification.iconPath" />
            </svg>
          </div>
        </div>
        <div class="w-full ps-3">
          <div class="text-gray-500 text-sm mb-1.5 ">
            <span v-html="notification.message"></span>
          </div>
          <div class="text-xs text-blue-600 ">
            {{ notification.time }}
          </div>
        </div>
      </a>
    </div>
    <a href="#"
      class="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100 ">
      <div class="inline-flex items-center">
        <svg class="w-4 h-4 me-2 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
          fill="currentColor" viewBox="0 0 20 14">
          <path
            d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
        </svg>
        Ver todos
      </div>
    </a>
  </el-popover>
</template>

<script setup lang="ts">
import { ref, unref } from 'vue'
import { ClickOutside as vClickOutside } from 'element-plus'
import type { Notification } from '@/interfaces/notificatiosType';
const notifications = ref<Notification[]>([
  {
    id: 1,
    imgSrc: "https://angular-material.fusetheme.com/images/avatars/brian-hughes.jpg",
    alt: "Jese image",
    bgColor: "bg-blue-600",
    iconPath:
      "M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z M4.439 9a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239Z",
    message:
      'Hoy descuento en los productos de belleza',
    time: "2 minutos aproximadamente",
  },
  // Añade más notificaciones aquí...
]);
const buttonRef = ref()
const popoverRef = ref()
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.()
}
</script>
<style>
.el-popper.is-light {
  background: #fff;
  border: 0px solid var(--el-border-color-light);
  padding: 0px;
  width: 200px !important;
}
</style>