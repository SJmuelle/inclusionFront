<template>

    <div class="div">
        ventas
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

import SeachProducts from '@/components/products/SeachProducts.vue'
import type { ListProduct, ListProducts } from '@/interfaces/productTypes';


const dialogProductos = ref(false)

const inputValue = ref<string>('');


// const productosVenta=ref>
const productosVenta = ref(<ListProducts>([]));

const checkInput = (): void => {
    const cadena = inputValue.value

    const palabra = "REF"

    if (cadena.toLowerCase().includes(palabra.toLowerCase())) {
        dialogProductos.value = true

    } else {
        console.log("La palabra no está presente.");
    }
};


const handleClose = (done: () => void) => {
    done()
}

const seleccionarProducto = (producto: ListProduct) => {
    debugger
    // alert("holi")
    productosVenta.value.push(producto)
    dialogProductos.value = false
}

</script>


<style>
.el-popper.is-customized {
    /* Set padding to ensure the height is 32px */
    padding: 6px 12px;
    background: #3075D7;
    color: #fff;

}

.el-popper.is-customized .el-popper__arrow::before {
    background: #3075D7;
    color: #fff;
    right: 0;
}
</style>