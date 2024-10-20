<template>
    <div class="">


        <!-- Breadcrumb -->
        <nav class="flex px-5 py-3 text-gray-700   " aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li class="inline-flex items-center">
                    <a href="#" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                        <svg class="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                        </svg>
                        Perfil
                    </a>
                </li>
                <li>
                    <div class="flex items-center">
                        <svg class="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400 " aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 9 4-4-4-4" />
                        </svg>
                        <a href="#"
                            class="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2">Perfil</a>
                    </div>
                </li>
                <li aria-current="page">
                    <div class="flex items-center">
                        <svg class="rtl:rotate-180  w-3 h-3 mx-1 text-gray-400" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 9 4-4-4-4" />
                        </svg>
                        <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Configuración de
                            usuario</span>
                    </div>
                </li>
            </ol>
        </nav>
        <div class="flex justify-center gap-3">
            <div class="relative">
                <img class="rounded w-36 h-36" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    alt="Extra large avatar">
            </div>

            <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
                class="demo-ruleForm" :size="formSize" status-icon>
                <el-form-item label="Nombres" prop="name">
                    <el-input v-model="ruleForm.name" />
                </el-form-item>
                <el-form-item label="Apellido" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="Activity zone">
                        <el-option label="Zone one" value="shanghai" />
                        <el-option label="Zone two" value="beijing" />
                    </el-select>
                </el-form-item>
                <el-form-item label="Activity count" prop="count">
                    <el-select-v2 v-model="ruleForm.count" placeholder="Activity count" :options="options" />
                </el-form-item>
                <el-form-item label="Activity time" required>
                    <el-col :span="11">
                        <el-form-item prop="date1">
                            <el-date-picker v-model="ruleForm.date1" type="date" aria-label="Pick a date"
                                placeholder="Pick a date" style="width: 100%" />
                        </el-form-item>
                    </el-col>
                    <el-col class="text-center" :span="2">
                        <span class="text-gray-500">-</span>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item prop="date2">
                            <el-time-picker v-model="ruleForm.date2" aria-label="Pick a time" placeholder="Pick a time"
                                style="width: 100%" />
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="Instant delivery" prop="delivery">
                    <el-switch v-model="ruleForm.delivery" />
                </el-form-item>
                <el-form-item label="Activity location" prop="location">
                    <el-segmented v-model="ruleForm.location" :options="locationOptions" />
                </el-form-item>
                <el-form-item label="Activity type" prop="type">
                    <el-checkbox-group v-model="ruleForm.type">
                        <el-checkbox value="Online activities" name="type">
                            Online activities
                        </el-checkbox>
                        <el-checkbox value="Promotion activities" name="type">
                            Promotion activities
                        </el-checkbox>
                        <el-checkbox value="Offline activities" name="type">
                            Offline activities
                        </el-checkbox>
                        <el-checkbox value="Simple brand exposure" name="type">
                            Simple brand exposure
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="Resources" prop="resource">
                    <el-radio-group v-model="ruleForm.resource">
                        <el-radio value="Sponsorship">Sponsorship</el-radio>
                        <el-radio value="Venue">Venue</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="Activity form" prop="desc">
                    <el-input v-model="ruleForm.desc" type="textarea" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm(ruleFormRef)">
                        Create
                    </el-button>
                    <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>

</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'

interface RuleForm {
    name: string
    region: string
    count: string
    date1: string
    date2: string
    delivery: boolean
    location: string
    type: string[]
    resource: string
    desc: string
}

const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
    name: 'Hello',
    region: '',
    count: '',
    date1: '',
    date2: '',
    delivery: false,
    location: '',
    type: [],
    resource: '',
    desc: '',
})

const locationOptions = ['soft-ia']

const rules = reactive<FormRules<RuleForm>>({
    name: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
    region: [
        {
            required: true,
            message: 'Please select Activity zone',
            trigger: 'change',
        },
    ],
    count: [
        {
            required: true,
            message: 'Please select Activity count',
            trigger: 'change',
        },
    ],
    date1: [
        {
            type: 'date',
            required: true,
            message: 'Please pick a date',
            trigger: 'change',
        },
    ],
    date2: [
        {
            type: 'date',
            required: true,
            message: 'Please pick a time',
            trigger: 'change',
        },
    ],
    location: [
        {
            required: true,
            message: 'Please select a location',
            trigger: 'change',
        },
    ],
    type: [
        {
            type: 'array',
            required: true,
            message: 'Please select at least one activity type',
            trigger: 'change',
        },
    ],
    resource: [
        {
            required: true,
            message: 'Please select activity resource',
            trigger: 'change',
        },
    ],
    desc: [
        { required: true, message: 'Please input activity form', trigger: 'blur' },
    ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!', fields)
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

const options = Array.from({ length: 10000 }).map((_, idx) => ({
    value: `${idx + 1}`,
    label: `${idx + 1}`,
}))
</script>