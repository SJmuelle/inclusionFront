<template class="bg-gray-200 h-full h-screen">
    <div class="mx-auto p-4">
        <!-- ======= CARDS SUPERIORES Y CARRUSEL (tu código intacto) ======= -->
        <div class="grid md:grid-cols-4 gap-4">
            <el-card shadow="hover" @click="filtroColegio(null)"
                class="border-purple-700 bg-gradient-to-r from-purple-50 to-purple-300 border-2 rounded-2xl">
                <div class="grid grid-cols-1">
                    <div class="flex justify-between items-center px-4">
                        <div class="text-3xl font-bold text-purple-700">Total</div>
                        <div>
                            <span class="text-4xl text-purple-700 font-bold rounded-lg">
                                {{ total < 10 ? '0' + total : total }} </span>
                        </div>
                    </div>
                    <div class="flex justify-between items-center mt-2">
                        <div class="text-md text-purple-700 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                            </svg>
                            Terminados
                        </div>
                        <div class="text-lg text-purple-700 pr-10">{{ TotalTerminados }}</div>
                    </div>
                    <div class="flex justify-between items-center border-t border-purple-700">
                        <div class="text-md text-purple-700 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                            Pendientes
                        </div>
                        <div class="text-lg text-purple-700 pr-10">{{ totalPendiente }}</div>
                    </div>
                </div>
            </el-card>

            <div class="md:col-span-3 grid justify-center grid-cols-12">
                <div class="col-span-1 flex justify-end items-center cursor hover:text-blue-700"
                    @click="carruselIzquierdaColegios">
                    <svg v-if="primerColegio > 1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </div>

                <div class="col-span-10 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <el-card v-for="(item, index) in colegios.slice(primerColegio, ultimoColegio)" :key="index"
                        shadow="hover" @click="filtroColegio(item)"
                        :class="`border-${clases[(index + primerColegio + 1) % clases.length]}-700 bg-gradient-to-r from-${clases[(index + primerColegio + 1) % clases.length]}-50 to-${clases[(index + primerColegio + 1) % clases.length]}-300  ${colegioSeleccionado == item.colegio_id ? 'border-4' : ''}  rounded-lg`">
                        <div class="grid grid-cols-1">
                            <div class="flex justify-between items-center gap-2">
                                <div
                                    :class="`${item.colegio_nombre.length < 50 ? 'text-xs' : 'text-[9px]'} uppercase text-start font-bold text-${clases[(index + primerColegio + 1) % clases.length]}-700`">
                                    {{ item.colegio_nombre }}
                                </div>
                                <div>
                                    <span
                                        :class="`text-4xl text-${clases[(index + primerColegio + 1) % clases.length]}-700 font-bold`">
                                        {{ item.pendientes + item.terminados }}
                                    </span>
                                </div>
                            </div>
                            <div class="flex justify-between items-center mt-2">
                                <div
                                    :class="`text-md text-${clases[(index + primerColegio + 1) % clases.length]}-700 flex items-center gap-2`">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                                    </svg>
                                    Terminados
                                </div>
                                <div
                                    :class="`text-lg text-${clases[(index + primerColegio + 1) % clases.length]}-700 pr-10`">
                                    {{ item.terminados }}
                                </div>
                            </div>
                            <div
                                :class="`flex justify-between items-center border-t border-${clases[(index + primerColegio + 1) % clases.length]}-700`">
                                <div
                                    :class="`text-md text-${clases[(index + primerColegio + 1) % clases.length]}-700 flex items-center gap-2`">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                    Pendientes
                                </div>
                                <div
                                    :class="`text-lg text-${clases[(index + primerColegio + 1) % clases.length]}-700 pr-10`">
                                    {{ item.pendientes }}
                                </div>
                            </div>
                        </div>
                    </el-card>
                </div>

                <div class="col-span-1 flex justify-start items-center cursor hover:text-blue-700"
                    @click="carruselDerechaColegios">
                    <svg v-if="ultimoColegio != colegios.length" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </div>
            </div>
        </div>

        <!-- ======= GRÁFICAS ======= -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <!-- Barras: Terminados vs Pendientes por colegio -->
            <el-card class="md:col-span-2 h-96">
                <Bar :data="barData" :options="barOptions"  style="height:384px; width:100%"/>
            </el-card>

            <!-- Dona: Totales -->
            <el-card class="h-96">
                <Doughnut :data="pieData" :options="pieOptions" />
            </el-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import smtable from '@/components/smtable.vue'
import { AuthService } from '@/services/authServices'
import { useRouter } from 'vue-router'
import type { ChartData, ChartOptions } from 'chart.js'
/** === chart.js + vue-chartjs === */
import { Bar, Doughnut } from 'vue-chartjs'
import {
    Chart,
    CategoryScale, LinearScale, BarElement, ArcElement,
    Tooltip, Legend, Title
} from 'chart.js'
Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend, Title)
/** ================================= */

const router = useRouter()

interface ListadoItem {
    id: number;
    tipo_documento: string;
    numero_identificacion: string;
    nombres: string;
    apellidos: string;
    colegio_id: number;
    colegio_nombre: string;
    estado_piar: string;
    avance_piar: string;
}

const clases = [
    'pink', 'yellow', 'stone', 'teal', 'cyan', 'indigo', 'lime', 'orange',
    'emerald', 'fuchsia', 'rose', 'sky', 'amber', 'gray', 'slate'
]

const loading = ref(false)
const Listado = ref<ListadoItem[]>([])
const ListadoMostrar = ref<ListadoItem[]>([])
const ultimoColegio = ref<number>(0)
const primerColegio = ref<number>(0)

const encabezado = ref([
    { label: 'ID', prop: 'id', mascara: 'boton-icon', width: 60 },
    { label: 'Tipo de doc', prop: 'tipo_documento', width: 100 },
    { label: 'Documento', prop: 'numero_identificacion' },
    { label: 'Nombre', prop: 'nombres' },
    { label: 'Apellido', prop: 'apellidos' },
    { label: 'Institución Educativa', prop: 'colegio_nombre', width: 300 },
    { label: 'Estado', prop: 'estado_piar', mascara: 'estado', width: 110 },
    { label: 'Porcentaje', prop: 'avance_piar', mascara: 'barra', width: 150 }
])
const nombre = 'Listado de PIAR'

const total = ref(0)
const totalPendiente = ref(0)
const TotalTerminados = ref(0)

const colegioSeleccionado = ref(-1)
const colegios = ref<{ colegio_id?: number; colegio_nombre: string; terminados: number; pendientes: number }[]>([])

onMounted(async () => {
    loading.value = true
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}')
    let parametros = { spName: 'fn_listar_estudiantes_usuario', params: [usuario?.usuario_id] }
    const result = await AuthService.ejecutarSP('fn_listar_estudiantes_usuario', parametros)
    if (result[0].fn_listar_estudiantes_usuario) {
        Listado.value = result[0].fn_listar_estudiantes_usuario.data
        ListadoMostrar.value = result[0].fn_listar_estudiantes_usuario.data
        total.value = Listado.value.length
        totalPendiente.value = Listado.value.filter(item => item.estado_piar === 'Pendiente').length
        TotalTerminados.value = Listado.value.filter(item => item.estado_piar === 'Terminado').length
        colegios.value = resumenPorColegio.value
        carruselPrimerColegios()
    } else {
        Listado.value = []
    }
    loading.value = false
})

const seleccion = (item: any) => {
    router.push('piarForm/' + item.tipo_documento + '/' + item.numero_identificacion)
}

const carruselPrimerColegios = () => {
    ultimoColegio.value = colegios.value.length
    if (colegios.value.length > 3) {
        ultimoColegio.value = 3
        primerColegio.value = 0
    } else {
        ultimoColegio.value = colegios.value.length
        primerColegio.value = 0
    }
}

const carruselDerechaColegios = () => {
    if (ultimoColegio.value + 3 < colegios.value.length) {
        primerColegio.value = ultimoColegio.value
        ultimoColegio.value += 3
    } else {
        ultimoColegio.value = colegios.value.length
        primerColegio.value = colegios.value.length - 3
    }
}

const carruselIzquierdaColegios = () => {
    if (primerColegio.value - 3 >= 0) {
        ultimoColegio.value = primerColegio.value
        primerColegio.value -= 3
    } else {
        primerColegio.value = 0
        ultimoColegio.value = colegios.value.length > 3 ? 3 : colegios.value.length
    }
}

/** ===== Resumen por colegio ===== */
const resumenPorColegio = computed(() => {
    const resumen: Record<string, { colegio_id?: number; colegio_nombre: string; terminados: number; pendientes: number }> = {}
    Listado.value.forEach(item => {
        if (!resumen[item.colegio_id]) {
            resumen[item.colegio_id] = {
                colegio_nombre: item.colegio_nombre,
                terminados: 0,
                pendientes: 0
            }
        }
        if (item.estado_piar === 'Terminado') resumen[item.colegio_id].terminados += 1
        else if (item.estado_piar === 'Pendiente') resumen[item.colegio_id].pendientes += 1
    })
    return Object.entries(resumen).map(([colegio_id, data]) => ({
        colegio_id: Number(colegio_id),
        ...data
    }))
})

const filtroColegio = (item1: any) => {
    if (item1 != null) {
        colegioSeleccionado.value = item1.colegio_id
        ListadoMostrar.value = Listado.value.filter(item => item.colegio_id == item1.colegio_id)
    } else {
        colegioSeleccionado.value = -1
        ListadoMostrar.value = Listado.value
    }
}

/** ===== Datos para GRÁFICAS (barras + dona) ===== */
// Barras: por colegio (todos)
const labelsColegios = computed(() => resumenPorColegio.value.map(c => c.colegio_nombre))
const dataTerminados = computed(() => resumenPorColegio.value.map(c => c.terminados))
const dataPendientes = computed(() => resumenPorColegio.value.map(c => c.pendientes))

const barData = computed<ChartData<'bar'>>(() => ({
    labels: labelsColegios.value,
    datasets: [
        {
            label: 'Terminados',
            data: dataTerminados.value,
            backgroundColor: '#10b981',
            borderRadius: 6,
            barThickness: 'flex' as const,   // <-- clave
        },
        {
            label: 'Pendientes',
            data: dataPendientes.value,
            backgroundColor: '#7E22CE',
            borderRadius: 6,
            barThickness: 'flex' as const,   // <-- clave
        }
    ]
}))

const barOptions: ChartOptions<'bar'> = {
  indexAxis: 'y',                 // <= barras horizontales
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom' },
    title: { display: true, text: 'Avance por Colegio' }
  },
  // en horizontal, el eje con conteo va en X
  scales: {
    x: { beginAtZero: true, ticks: { precision: 0 } },
    y: { ticks: { autoSkip: false, maxRotation: 0 } }
  }
}

// Dona: totales globales (se recalcula desde Listado)
const totalTerminadosChart = computed(() =>
    Listado.value.filter(i => i.estado_piar === 'Terminado').length
)
const totalPendientesChart = computed(() =>
    Listado.value.filter(i => i.estado_piar === 'Pendiente').length
)

const pieData = computed<ChartData<'doughnut'>>(() => ({
    labels: ['Terminados', 'Pendientes'],
    datasets: [
        {
            data: [totalTerminadosChart.value, totalPendientesChart.value],
            backgroundColor: ['#10b981', '#7E22CE'],
            hoverOffset: 6
        }
    ]
}))
const pieOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '60%',
    plugins: {
        legend: { position: 'bottom' },
        title: { display: true, text: 'Total' }
    }
}
</script>

<style lang="css"></style>
