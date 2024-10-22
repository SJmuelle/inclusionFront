<template>
    <el-menu active-text-color="#ffd04b" background-color="#1F2937" class="el-menu-vertical-demo" default-active="2"
        text-color="#fff" @open="handleOpen" @close="handleClose">
        <el-sub-menu index="1">
            <template #title>
                <el-icon>
                    <location />
                </el-icon>
                <span>Administración</span>
            </template>
            <el-menu-item index="1-1">Crear bodegas</el-menu-item>
            <el-menu-item index="1-2">Gestionar usuarios</el-menu-item>
            <el-menu-item index="1-3">Crear clientes y terceros</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
            <template #title>
                <el-icon>
                    <location />
                </el-icon>
                <span>Facturación</span>
            </template>
            <el-menu-item index="2-1">Facturación</el-menu-item>
            <el-menu-item index="2-2">Nota crédito</el-menu-item>
            <el-menu-item index="2-3">Nota debito</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
            <template #title>
                <el-icon>
                    <location />
                </el-icon>
                <span>Utlidades</span>
            </template>
            <el-menu-item index="3-1">Importar archivo plano</el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>

<script lang="ts" setup>
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
</script>