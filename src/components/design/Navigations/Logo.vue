<template>
    <div>
        <a class="flex items-center space-x-3 rtl:space-x-reverse flex-none p-2 rounded-md" @click="refresk">
            <img :src="logoPath" class="h-12 border-blue-200" :alt="Empresa" :class="Empresa!='torres'?'border-2 border-blue-200 rounded-full':''" />
            <span
                class="self-center text-2xl whitespace-nowrap text-blue-800 border-b-2 border-blue-200 font-extrabold">SOFT-IA</span>
        </a>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';

// Ref para almacenar el nombre de la empresa
const Empresa = ref<string>('');

// Ref para almacenar la ruta del logo
const logoPath = ref<string>('');

const numero = ref<number>(0);

const refresk = () => {
    const logos = ['economia', 'isimo', 'torres'];
    changeCompany(logos[numero.value]);
    numero.value = (numero.value + 1) % logos.length
}

// Función para cambiar la empresa y el logo
const changeCompany = (companyName: string) => {
    Empresa.value = companyName;

    logoPath.value = `/src/assets/isotipo/${companyName}.png`;

    // Guardar en localStorage
    localStorage.setItem('Empresa', Empresa.value);
    localStorage.setItem('logoPath', logoPath.value);
};

// Al montar el componente, recuperar los valores de localStorage
onMounted(() => {
    const storedEmpresa = localStorage.getItem('Empresa');
    const storedLogoPath = localStorage.getItem('logoPath');
    if (storedEmpresa && storedLogoPath) {
        Empresa.value = storedEmpresa;
        logoPath.value = storedLogoPath;
    } else {
        // Valores por defecto
        Empresa.value = 'economia';
        logoPath.value = `src/assets/isotipo/${Empresa.value}.png`;
    }
});
</script>