<template>
  <div class="login-bg min-h-screen flex items-center justify-center">
    <div class="login-card w-full max-w-md bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
      <div class="mb-6 flex flex-col items-center">
        <img src="/public/img/favicon.jpg" alt="Logo" class="w-16 h-16 rounded-full mb-2" />
        <h1 class="text-2xl font-bold text-gray-800 mb-1">Sistema PIAR</h1>
        <p class="text-gray-500 text-sm">Bienvenido, inicia sesión para continuar</p>
      </div>
      <el-form ref="loginForm" class="w-full" label-position="top" :model="form" :rules="rules" @submit.prevent="handleSubmit">
        <el-form-item class="mb-4" prop="usuario" label="Usuario">
          <el-input v-model="form.usuario" placeholder="Usuario" size="large">
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item class="mb-4" prop="password" label="Contraseña">
          <el-input v-model="form.password" type="password" placeholder="Contraseña" show-password size="large">
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleSubmit" class="w-full bg-blue-600 text-white font-semibold text-lg py-3 rounded-xl hover:bg-blue-700 transition" size="large">Iniciar sesión</el-button>
        </el-form-item>
        <el-alert v-if="error" :title="error" type="error" show-icon class="mb-2" />
      </el-form>
      <div class="mt-4 text-sm text-gray-500">¿Olvidaste tu contraseña? <a href="#" class="text-blue-600 hover:underline">Recupérala aquí</a></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormProps } from 'element-plus'
import { AuthService } from '@/services/authServices';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'

const labelPosition = ref<FormProps['labelPosition']>('right')
const router = useRouter();
const error = ref<string>('');
const form = reactive({
    usuario: '',
    password: '',
})

const rules = {
    usuario: [
        { required: true, message: 'Por favor, ingrese su usuario', trigger: 'blur' },
    ],
    password: [
        { required: true, message: 'Por favor, ingrese su contraseña', trigger: 'blur' },
    ],
};

const handleSubmit = async () => {
    router.push('/admin');
    // try {
    //     const response = await AuthService.login({ username: form.usuario, password: form.password });
    //     if (response.success) {
    //         router.push('/admin');
    //     } else {
    //         error.value = response.message;
    //         if (response.type == 2) {
    //             ElMessageBox.alert(`${response.message}`, 'Autenticación exitosa', {
    //                 confirmButtonText: 'OK',
    //             })
    //         }
    //     }
    // } catch (err: any) {
    //     error.value = err.message;
    // }
};
</script>

<style scoped>
.login-bg {
  background: linear-gradient(120deg, #f0f4f8 0%, #e0e7ef 100%);
}
.login-card {
  box-shadow: 0 8px 32px 0 rgba(31, 41, 55, 0.10);
}
</style>
