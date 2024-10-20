<template>
    <div class="w-full max-w-80 sm:w-80 mx-auto sm:mx-0">
        <div class="mt-8 text-4xl font-semibold tracking-tight leading-tight">Inicia sesión</div>
        <div class="flex items-baseline mt-0.5 font-medium">
            <div>¿No tienes una cuenta?</div>
            <a class="ml-1 text-primary-500 hover:underline">Registrarse
            </a>
        </div>

        <el-form ref="loginForm" class="mt-8" label-position="top" :model="form" :rules="rules"
            @submit.prevent="handleSubmit">
            <el-form-item class="mb-4" prop="usuario" label="Usuario">
                <el-input v-model="form.usuario" placeholder="" />
            </el-form-item>
            <el-form-item class="mb-4" prop="password" label="Contraseña">
                <el-input v-model="form.password" type="password" placeholder="" show-password />
            </el-form-item>
            <el-form-item>
                <el-button @click="handleSubmit"
                    class="w-full bg-indigo-900 mt-8 text-white hover:bg-violet-100 hover:border-indigo-700 hover:text-indigo-700">Iniciar
                    sesión</el-button>
            </el-form-item>
            <el-alert v-if="error" :title="error" type="error" show-icon />

        </el-form>


    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormProps } from 'element-plus'
import { AuthService } from '@/services/authServices';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'

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
    //     console.log('Login successful', response);
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
    //     console.error('Error al iniciar sesión:', err.message);
    //     error.value = err.message;
    // }
};

</script>
