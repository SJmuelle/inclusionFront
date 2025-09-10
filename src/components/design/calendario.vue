<template>
  <el-card class="rounded-2xl overflow-hidden">
    <!-- Encabezado -->
    <div class="flex items-center justify-between px-2 py-3">
      <button class="p-2 rounded-md hover:bg-gray-100" @click="prevMonth">
        <svg viewBox="0 0 24 24" class="w-5 h-5">
          <path fill="currentColor" d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z"/>
        </svg>
      </button>
      <div class="font-semibold text-gray-700 select-none">
        {{ monthLabel }} {{ currentYear }}
      </div>
      <button class="p-2 rounded-md hover:bg-gray-100" @click="nextMonth">
        <svg viewBox="0 0 24 24" class="w-5 h-5">
          <path fill="currentColor" d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
        </svg>
      </button>
    </div>

    <!-- Días -->
    <div class="grid grid-cols-7 text-center text-xs text-gray-400 px-2">
      <div v-for="d in weekDays" :key="d" class="py-1">{{ d }}</div>
    </div>

    <!-- Celdas -->
    <div class="grid grid-cols-7 gap-y-1 px-2 pb-3">
      <div v-for="(cell, idx) in calendarCells" :key="idx" class="flex items-center justify-center">
        <button
          class="w-9 h-9 rounded-full text-sm relative transition"
          :class="[
            cell.isCurrentMonth ? 'text-gray-700' : 'text-gray-300',
            isSameDate(cell.date, selectedDate) ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100'
          ]"
          @click="selectDate(cell.date)"
        >
          {{ cell.date.getDate() }}
          <!-- indicador de eventos -->
          <span
            v-if="eventsByDate.get(iso(cell.date))?.length"
            class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-10/12 h-1 rounded-full"
            :style="{ background: barColor }"
          />
        </button>
      </div>
    </div>

    <!-- Recordatorios -->
    <div class="border-t pt-3">
      <div class="px-1 mb-2 flex items-center justify-between">
        <h3 class="text-sm font-semibold text-gray-700">Recordatorios</h3>
        <div class="text-xs text-gray-400">{{ niceDate(selectedDate) }}</div>
      </div>

      <!-- Del día -->
      <div v-if="selectedDayEvents.length" class="space-y-2">
        <div v-for="(ev, i) in selectedDayEvents" :key="'sel-'+i" class="flex items-start gap-3 px-1">
          <div class="p-2 rounded-lg bg-gray-50">
            <svg viewBox="0 0 24 24" class="w-5 h-5 text-gray-500">
              <path fill="currentColor" d="M10 21h4v-1h-4v1ZM12 2a5 5 0 0 0-5 5v2.1A7.002 7.002 0 0 0 5 16v2h14v-2a7.002 7.002 0 0 0-2-4.9V7a5 5 0 0 0-5-5Z"/>
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between">
              <div class="text-sm font-medium text-gray-800 truncate">{{ ev.title }}</div>
              <span class="text-[10px] px-2 py-0.5 rounded-full" :class="badgeClass(ev.type)">
                {{ badgeText(ev.type) }}
              </span>
            </div>
            <div class="text-xs text-gray-500 mt-0.5">{{ ev.time || '' }}</div>
          </div>
        </div>
      </div>
      <div v-else class="text-xs text-gray-400 px-1 pb-2">Sin recordatorios este día.</div>

      <!-- Próximos 7 días -->
      <div class="px-1 mt-1 mb-2 text-xs font-semibold text-gray-500">Próximos</div>
      <div v-if="upcomingEvents.length" class="space-y-2">
        <div v-for="(ev, i) in upcomingEvents" :key="'up-'+i" class="flex items-start gap-3 px-1">
          <div class="p-2 rounded-lg bg-gray-50">
            <svg viewBox="0 0 24 24" class="w-5 h-5 text-gray-500">
              <path fill="currentColor" d="M10 21h4v-1h-4v1ZM12 2a5 5 0 0 0-5 5v2.1A7.002 7.002 0 0 0 5 16v2h14v-2a7.002 7.002 0 0 0-2-4.9V7a5 5 0 0 0-5-5Z"/>
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between">
              <div class="text-sm font-medium text-gray-800 truncate">{{ ev.title }}</div>
              <span class="text-[10px] px-2 py-0.5 rounded-full" :class="badgeClass(ev.type)">
                {{ badgeText(ev.type) }}
              </span>
            </div>
            <div class="text-xs text-gray-500 mt-0.5">
              {{ niceDate(new Date(ev.date)) }}<span v-if="ev.time"> · {{ ev.time }}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-xs text-gray-400 px-1 pb-1">No hay próximos eventos.</div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

/** ===== Datos de ejemplo (reemplaza por tu fuente real) ===== */
type EventType = 'Revision'|'Entrega'|'Vencido'|'Otro'
type EventItem = { date: string; title: string; time?: string; type: EventType }
const events = ref<EventItem[]>([
  { date: '2025-09-07', title: 'Revisión PIAR 4°A', time: '10:00', type: 'Revision' },
  { date: '2025-09-07', title: 'Entrega evidencias', time: '15:00', type: 'Entrega' },
  { date: '2025-09-09', title: 'Cierre acta mensual', type: 'Vencido' },
  { date: '2025-09-12', title: 'Revisión comité IE San José', time: '08:30', type: 'Revision' },
  { date: '2025-09-14', title: 'Firma ajustes', time: '11:00', type: 'Entrega' },
])

/** ===== Fechas ===== */
const today = new Date()
const currentYear = ref(today.getFullYear())
const currentMonth = ref(today.getMonth()) // 0..11
const selectedDate = ref(new Date(today.getFullYear(), today.getMonth(), today.getDate()))

const weekDays = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
const monthLabel = computed(() =>
  new Intl.DateTimeFormat('es-ES', { month: 'long' })
    .format(new Date(currentYear.value, currentMonth.value, 1))
    .replace(/^\w/, m => m.toUpperCase())
)

const iso = (d: Date) => d.toISOString().slice(0, 10)
const isSameDate = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
const niceDate = (d: Date) =>
  new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: 'short', year: 'numeric', weekday: 'short' })
    .format(d).replace(/\.$/, '')

/** ===== Celdas (6x7, inicia lunes) ===== */
const calendarCells = computed(() => {
  const first = new Date(currentYear.value, currentMonth.value, 1)
  const jsDow = first.getDay() // 0=dom
  const dow = jsDow === 0 ? 7 : jsDow
  const start = new Date(currentYear.value, currentMonth.value, 1 - (dow - 1))
  return Array.from({ length: 42 }, (_, i) => {
    const d = new Date(start); d.setDate(start.getDate() + i)
    return { date: d, isCurrentMonth: d.getMonth() === currentMonth.value }
  })
})

/** ===== Eventos ===== */
const eventsByDate = computed(() => {
  const map = new Map<string, EventItem[]>()
  events.value.forEach(ev => {
    if (!map.has(ev.date)) map.set(ev.date, [])
    map.get(ev.date)!.push(ev)
  })
  return map
})
const selectedDayEvents = computed(() => eventsByDate.value.get(iso(selectedDate.value)) ?? [])
const upcomingEvents = computed(() => {
  const start = new Date(selectedDate.value); start.setDate(start.getDate() + 1)
  const end = new Date(start); end.setDate(end.getDate() + 7)
  return events.value
    .filter(ev => {
      const d = new Date(ev.date + 'T00:00:00')
      return d >= start && d <= end
    })
    .sort((a, b) => (a.date > b.date ? 1 : -1))
})

/** ===== Navegación ===== */
const prevMonth = () => {
  if (currentMonth.value === 0) { currentMonth.value = 11; currentYear.value-- } else currentMonth.value--
}
const nextMonth = () => {
  if (currentMonth.value === 11) { currentMonth.value = 0; currentYear.value++ } else currentMonth.value++
}
const selectDate = (d: Date) => { selectedDate.value = new Date(d) }

/** ===== Estilos / Colores ===== */
const barColor = '#DDD6FE' // puedes tomarlo de tu helper dinámico
const badgeText = (t: EventType) =>
  t === 'Revision' ? 'Revisión' : t === 'Entrega' ? 'Entrega' : t === 'Vencido' ? 'Vencido' : 'Otro'
const badgeClass = (t: EventType) =>
  t === 'Revision' ? 'bg-sky-100 text-sky-700'
  : t === 'Entrega' ? 'bg-emerald-100 text-emerald-700'
  : t === 'Vencido' ? 'bg-rose-100 text-rose-700'
  : 'bg-gray-100 text-gray-600'
</script>
