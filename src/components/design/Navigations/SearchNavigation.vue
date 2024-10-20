<template>
    <el-autocomplete v-model="state" :fetch-suggestions="querySearchAsync" placeholder="Buscar"
        @select="handleSelect" />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { fetchMenu } from '@/services/menuService';
import type { MenuItem } from '@/interfaces/menuTypes';

const state = ref('');

const links = ref<MenuItem[]>([]);

const loadAll = async () => {
    try {
        const menuData = await fetchMenu();
        console.log(menuData)
        links.value = menuData;
    } catch (error) {
        console.error('Error loading menu:', error);
        links.value = [];
    }
};

let timeout: ReturnType<typeof setTimeout>;

const querySearchAsync = (queryString: string, cb: (arg: any) => void) => {
    const results = queryString
        ? links.value.filter(createFilter(queryString))
        : links.value;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        cb(results);
    }, 500 * Math.random());
};

const createFilter = (queryString: string) => {
    return (menu: MenuItem) => {
        return menu.title.toLowerCase().includes(queryString.toLowerCase());
    };
};

const handleSelect = (item: MenuItem) => {
    console.log(item);
};

onMounted(async () => {
    await loadAll();
});
</script>