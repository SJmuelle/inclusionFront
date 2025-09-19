<template class="bg-gray-200 h-full h-screen">
  <!-- Encabezado -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white shadow-md">
    <div class="col-span-2">
      <h1 class="text-2xl font-bold text-gray-700 capitalize">¡Bienvenidos, {{ usuario.nombre }}!</h1>
      <p class="text-sm text-gray-500">Panel de control de avances PIAR</p>
    </div>
    <div class="flex justify-end items-center">
      <el-button type="primary" class="flex items-center gap-2" @click="$router.push('/admin/piar')">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
        </svg>
        Gestión de piar
      </el-button>
    </div>
  </div>

  <div class="mx-auto p-4">
    <!-- ======= RESUMEN POR COLEGIO (3 columnas, sin carrusel) ======= -->

  


    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold text-gray-700 flex gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
        </svg>

        Avances por institución educativa
      </h2>
    </div>



    <div class="grid grid-cols-1 md:grid-cols-10  gap-4">
      <!-- <div class="div">
          <el-card shadow="hover"
            class="rounded-lg cursor-pointer border-emerald-700 bg-gradient-to-r from-emerald-50 to-emerald-300"
            @click="filtroColegio(null)">
            <div class="flex justify-between items-start">
              <div class="text-start">
                <div class="text-xs uppercase font-bold text-emerald-700">Todos</div>
                <div class="text-sm text-emerald-700">Estudiantes</div>
              </div>
              <span class="text-3xl font-bold text-emerald-700">{{ total }}</span>
            </div>

            <div class="h-40 mt-2">
              <Doughnut
                :data="getPieDataColegio({ colegio_nombre: 'Todos', terminados: TotalTerminados, pendientes: totalPendiente }, -1)"
                :options="pieOptionsSmall" />
            </div>

            <div class="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div class="flex items-center gap-2">
                <span class="inline-block w-3 h-3 rounded-full" style="background:#10b981"></span>
                <span class="text-gray-600">Terminados</span>
              </div>
              <div class="text-right font-semibold text-gray-700">
                {{ TotalTerminados }} ({{ porcentaje(TotalTerminados, total) }}%)
              </div>

              <div class="flex items-center gap-2">
                <span class="inline-block w-3 h-3 rounded-full" style="background:#7E22CE"></span>
                <span class="text-gray-600">Pendientes</span>
              </div>
              <div class="text-right font-semibold text-gray-700">
                {{ totalPendiente }} ({{ porcentaje(totalPendiente, total) }}%)
              </div>
            </div>
          </el-card>
        </div> -->


      <div class="md:col-span-10  ">
        <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
          <el-card v-for="(c, idx) in colegios" :key="idx" shadow="hover" class="rounded-lg cursor-pointer" :class="`border-2 ${colegioSeleccionado === c.colegio_id ? 'border-purple-700' : 'border-transparent'} 
                   bg-gradient-to-r from-${colorKey(idx)}-50 to-${colorKey(idx)}-300`" @click="filtroColegio(c)">
            <div class="flex justify-between items-start">
              <div class="text-start h-20">
                <div
                  :class="`uppercase font-bold text-${colorKey(idx)}-700 ${c.colegio_nombre.length < 50 ? 'text-xs' : 'text-[10px]'}`">
                  {{ c.colegio_nombre }}
                </div>
                <div :class="`text-xs text-${colorKey(idx)}-700/70`">Últimos 30 días</div>
              </div>
              <span :class="`text-3xl font-bold text-${colorKey(idx)}-700`">
                {{ c.terminados + c.pendientes }}
              </span>
            </div>

            <div class="h-40 mt-2 bg-white/50 rounded-md">
              <Doughnut :data="getPieDataColegio(c, idx)" :options="pieOptionsSmall" />
            </div>

            <div class="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div class="flex items-center gap-2">
                <span class="inline-block w-3 h-3 rounded-full"
                  :style="{ background: colorForIndex(idx).strong }"></span>
                <span class="text-gray-600">Terminados</span>
              </div>
              <div class="text-right font-semibold text-gray-700">
                {{ c.terminados }} ({{ porcentaje(c.terminados, c.terminados + c.pendientes) }}%)
              </div>

              <div class="flex items-center gap-2">
                <span class="inline-block w-3 h-3 rounded-full"
                  :style="{ background: colorForIndex(idx).light }"></span>
                <span class="text-gray-600">Pendientes</span>
              </div>
              <div class="text-right font-semibold text-gray-700">
                {{ c.pendientes }} ({{ porcentaje(c.pendientes, c.terminados + c.pendientes) }}%)
              </div>
            </div>
          </el-card>
        </div>

      </div>

   
    </div>



    <!-- Debajo puedes mantener tu tabla basada en ListadoMostrar si la usas -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { AuthService } from '@/services/authServices'
import calendario from '@/components/design/calendario.vue'
import type { ChartData, ChartOptions } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import { Chart, CategoryScale, LinearScale, ArcElement, Tooltip, Legend, Title } from 'chart.js'
Chart.register(CategoryScale, LinearScale, ArcElement, Tooltip, Legend, Title)

const router = useRouter()

interface ListadoItem {
  id: number
  tipo_documento: string
  numero_identificacion: string
  nombres: string
  apellidos: string
  colegio_id: number
  colegio_nombre: string
  estado_piar: 'Pendiente' | 'Terminado'
  avance_piar: string
}

const usuario = JSON.parse(localStorage.getItem('usuario') || '{}')
const loading = ref(false)
const Listado = ref<ListadoItem[]>([])
const ListadoMostrar = ref<ListadoItem[]>([])

const total = ref(0)
const totalPendiente = ref(0)
const TotalTerminados = ref(0)

const colegioSeleccionado = ref<number | -1>(-1)
const colegios = ref<{ colegio_id: number; colegio_nombre: string; terminados: number; pendientes: number }[]>([])

/* ===== Paleta y helpers de color: igual que carrusel ===== */
const clases = [
  'pink', 'yellow', 'stone', 'teal', 'cyan', 'indigo', 'lime', 'orange',
  'emerald', 'fuchsia', 'rose', 'sky', 'amber', 'gray', 'slate'
]

// tonos (fuerte/claro) para cada color tailwind
const paletteByTailwind: Record<string, { strong: string; light: string }> = {
  pink: { strong: '#BE185D', light: '#F9A8D4' },
  yellow: { strong: '#CA8A04', light: '#FDE68A' },
  stone: { strong: '#57534E', light: '#D6D3D1' },
  teal: { strong: '#0F766E', light: '#99F6E4' },
  cyan: { strong: '#0E7490', light: '#A5F3FC' },
  indigo: { strong: '#4338CA', light: '#C7D2FE' },
  lime: { strong: '#65A30D', light: '#D9F99D' },
  orange: { strong: '#C2410C', light: '#FED7AA' },
  emerald: { strong: '#047857', light: '#A7F3D0' },
  fuchsia: { strong: '#A21CAF', light: '#F5D0FE' },
  rose: { strong: '#E11D48', light: '#FECDD3' },
  sky: { strong: '#0284C7', light: '#BAE6FD' },
  amber: { strong: '#B45309', light: '#FDE68A' },
  gray: { strong: '#374151', light: '#D1D5DB' },
  slate: { strong: '#334155', light: '#CBD5E1' }
}
const totalColegios = computed(() => colegios.value.length)

const percentTerminados = computed(() => {
  return total.value > 0 ? (TotalTerminados.value * 100) / total.value : 0
})

const percentPendientes = computed(() => {
  return total.value > 0 ? (totalPendiente.value * 100) / total.value : 0
})

const colorKey = (idx: number) => clases[(idx + 1) % clases.length] // mismo offset que usabas
const colorForIndex = (idx: number) => {
  const key = colorKey(idx)
  return paletteByTailwind[key] ?? { strong: '#7E22CE', light: '#E9D5FF' }
}

/* ===== Datos ===== */
onMounted(async () => {
  loading.value = true

  const parametros = { spName: 'fn_listar_estudiantes_usuario', params: [usuario?.usuario_id] }
  const result = await AuthService.ejecutarSP('fn_listar_estudiantes_usuario', parametros)

  if (result?.[0]?.fn_listar_estudiantes_usuario) {
    Listado.value = result[0].fn_listar_estudiantes_usuario.data
    ListadoMostrar.value = Listado.value
    total.value = Listado.value.length
    totalPendiente.value = Listado.value.filter(i => i.estado_piar === 'Pendiente').length
    TotalTerminados.value = Listado.value.filter(i => i.estado_piar === 'Terminado').length
    colegios.value = resumenPorColegio.value
  } else {
    Listado.value = []
    ListadoMostrar.value = []
    total.value = 0
    totalPendiente.value = 0
    TotalTerminados.value = 0
    colegios.value = []
  }
  loading.value = false
})

/* ===== Resumen por colegio ===== */
const resumenPorColegio = computed(() => {
  const res: Record<number, { colegio_id: number; colegio_nombre: string; terminados: number; pendientes: number }> = {}
  Listado.value.forEach(item => {
    if (!res[item.colegio_id]) {
      res[item.colegio_id] = { colegio_id: item.colegio_id, colegio_nombre: item.colegio_nombre, terminados: 0, pendientes: 0 }
    }
    if (item.estado_piar === 'Terminado') res[item.colegio_id].terminados++
    if (item.estado_piar === 'Pendiente') res[item.colegio_id].pendientes++
  })
  return Object.values(res)
})

/* ===== Filtro por tarjeta ===== */
const filtroColegio = (item: { colegio_id: number } | null) => {
  if (item) {
    colegioSeleccionado.value = item.colegio_id
    ListadoMostrar.value = Listado.value.filter(x => x.colegio_id === item.colegio_id)
  } else {
    colegioSeleccionado.value = -1
    ListadoMostrar.value = Listado.value
  }
}

/* ===== Chart helpers ===== */
const getPieDataColegio = (
  c: { colegio_nombre: string; terminados: number; pendientes: number },
  idx: number
): ChartData<'doughnut'> => {
  // idx = -1 para "Todos" (colores fijos)
  if (idx < 0) {
    return {
      labels: ['Terminados', 'Pendientes'],
      datasets: [{ data: [c.terminados, c.pendientes], backgroundColor: ['#10b981', '#7E22CE'], hoverOffset: 6 }]
    }
  }
  const pal = colorForIndex(idx)
  return {
    labels: ['Terminados', 'Pendientes'],
    datasets: [{ data: [c.terminados, c.pendientes], backgroundColor: [pal.strong, pal.light], hoverOffset: 6 }]
  }
}

const pieOptionsSmall: ChartOptions<'doughnut'> = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '65%',
  plugins: {
    legend: { display: false },
    title: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx) => {
          const total = (ctx.dataset.data as number[]).reduce((a, b) => a + Number(b || 0), 0)
          const val = Number(ctx.parsed) || 0
          const pct = total ? Math.round((val * 100) / total) : 0
          return `${ctx.label}: ${val} (${pct}%)`
        }
      }
    }
  }
}

/* ===== Utilidades ===== */
const porcentaje = (parte: number, totalLocal: number): string =>
  totalLocal > 0 ? ((parte * 100) / totalLocal).toFixed(0) : '0'
</script>
