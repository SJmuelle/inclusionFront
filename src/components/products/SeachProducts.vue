<template>
    <div >
        <div class="flex flex-col h-screen overflow-y-visible pb-16">
            <div class="grid grid-cols-6 gap-3 pb-3">
                <div class="pb-1 col-span-2">
                    <label class="block text-sm ">Código o descripción </label>
                    <div class="relative text-gray-400">
                        <input type="text" @blur="seachProductsFN" v-model="seachProducts"
                            class="pl-2 text-xs bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300  rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full  rounded-l-lg py-1 "
                            placeholder="" autocomplete="off">
                    </div>
                </div>
                <div class="pb-1 col-span-1">
                    <label class="block text-sm ">Centro de costo </label>
                    <div class="relative text-gray-400">
                        <input type="text"
                            class="pl-2 text-xs bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300  rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full  rounded-l-lg py-1 "
                            placeholder="" autocomplete="off">
                    </div>
                </div>
                <div class="pb-1 col-span-1">
                    <label class="block text-sm ">Tenga inventario </label>
                    <div class="relative text-gray-400">
                        <input type="text"
                            class="pl-2 text-xs bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300  rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full  rounded-l-lg py-1 "
                            placeholder="" autocomplete="off">
                    </div>
                </div>
            </div>
            <div class=" grid grid-cols-1 md:grid-cols-4 gap-4 overflow-auto box-border ">
                <template  v-for="(i, index) in listProduct" :key="index">
                    <div class="flex-row gap-4 flex hover:shadow border  p-2" @click="cambiarEstado(index)">
                        <div class="h-36 w-36 rounded-md   ">
                            <img :src="imagen(i.idreferencia)" alt="" srcset="">
                        </div>
                        <div class="flex-col gap-2 flex">
                            <div class="flex-col gap-1 mt-2 mb-4 flex">
                                <div class="h-4  font-semibold ">
                                    {{ i.idreferencia }}
                                </div>
                                <div class="h-2 mb-3 ">
                                    {{ i.descripcion }}
                                </div>
                            </div>
                            <div class="grid  sm:grid-cols-2">
                                <div class="text-xs hidden sm:block">
                                    <strong>Categoria:</strong> {{ i.categoria }} {{ i.subcategoria }} <br>
                                    <strong>Proveedor:</strong> {{ i.marcaProveedor }}<br />

                                    <strong>Descuento:</strong> {{ i.descuento }}% - {{ i.valorDescuento }}<br />
                                    <strong>Precio Caja</strong> ${{
                                        NumberFormatter.formatWithCommas(i.precioCaja_ConIva) }} <br />
                                    <strong>Precio Unitario</strong> ${{
                                        NumberFormatter.formatWithCommas(i.precioUnitario_ConIva) }}
                                </div>
                                <div class="div">

                                    <div class="div">
                                        <strong>Precio</strong><br>
                                    </div>
                                    <h3 class="text-xl font-bold text-violet-900 text-left">${{
                                        NumberFormatter.formatWithCommas(i.precioCaja_ConIva) }} COP</h3>

                                    <div class="div">
                                        <strong>Stock</strong><br>
                                    </div>
                                    <h3 class="text-xl font-bold text-violet-900 text-left">{{ i.stock }}</h3>
                                </div>

                            </div>

                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { NumberFormatter } from '@/helpers/textFormatter';
import type { ListProducts, SeachProducts } from '@/interfaces/productTypes';
import { ProductService } from '@/services/productService';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { defineEmits } from 'vue';

const emit = defineEmits(['producto']);

const loading = ref(false)
const count = ref(10)
const listProduct = ref(<ListProducts>([]));
const seachProducts = ref(``);


const imagen = (codigo: String) => {
    return `https://www.droguerialaeconomia.com/economia/site/img/${codigo}.png`
}

const cambiarEstado = (index:number) => {
  emit('producto', listProduct.value[index]); // Emitimos el evento con el nuevo estado
};

const load = () => {
    loading.value = true
    setTimeout(() => {
        count.value += 2
        loading.value = false
    }, 2000)
}


const seachProductsFN = async (): Promise<void> => {
    try {
        let data: SeachProducts = {
            "canal": "4097",
            "marca": "ECO",
            "centroCosto": "4097",
            "abuscar": seachProducts.value,
            "convenio": "892300678",
            "ciudad": "08001",
            "stockMayor": 1,
            "cantidad": 0
        }
        const response = await ProductService.seachProducts(data);

        if (response.success) {
            console.table(response.data);
            listProduct.value = response.data
        } else {


        }

    } catch (err: any) {
        console.error('Error al iniciar sesión:', err.message);

    }
}

</script>