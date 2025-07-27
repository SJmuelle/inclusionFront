<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-6xl mx-auto">
      <!-- Header del módulo -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h1 class="text-2xl font-bold text-gray-900 mb-2">Reportes y Documentación</h1>
        <p class="text-gray-600">Generación y exportación de documentos del sistema PIAR</p>
      </div>

      <!-- Formulario de configuración de reportes -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
          Configuración de Reportes
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <el-form-item label="Estudiante" prop="estudianteSeleccionado">
            <el-select 
              v-model="config.estudianteSeleccionado" 
              placeholder="Seleccione estudiante"
              class="custom-input w-full"
            >
              <el-option 
                v-for="est in estudiantes" 
                :key="est.id" 
                :label="`${est.nombres} ${est.apellidos}`" 
                :value="est.id" 
              />
            </el-select>
          </el-form-item>
          
          <el-form-item label="Tipo de Documento" prop="tipoDocumento">
            <el-select 
              v-model="config.tipoDocumento" 
              placeholder="Seleccione tipo de documento"
              class="custom-input w-full"
            >
              <el-option label="PIAR Completo" value="piar_completo" />
              <el-option label="Acta de Acuerdo" value="acta_acuerdo" />
              <el-option label="Informe de Seguimiento" value="informe_seguimiento" />
              <el-option label="Evaluación Trimestral" value="evaluacion_trimestral" />
              <el-option label="Informe de Progreso" value="informe_progreso" />
              <el-option label="Certificado de Ajustes" value="certificado_ajustes" />
              <el-option label="Resumen Ejecutivo" value="resumen_ejecutivo" />
            </el-select>
          </el-form-item>
          
          <el-form-item label="Período Académico" prop="periodoAcademico">
            <el-select 
              v-model="config.periodoAcademico" 
              placeholder="Seleccione período"
              class="custom-input w-full"
            >
              <el-option label="2024-1" value="2024-1" />
              <el-option label="2024-2" value="2024-2" />
              <el-option label="2024-3" value="2024-3" />
              <el-option label="2023-1" value="2023-1" />
              <el-option label="2023-2" value="2023-2" />
            </el-select>
          </el-form-item>
          
          <el-form-item label="Formato de Exportación" prop="formatoExportacion">
            <el-select 
              v-model="config.formatoExportacion" 
              placeholder="Seleccione formato"
              class="custom-input w-full"
            >
              <el-option label="PDF" value="pdf" />
              <el-option label="Word (.docx)" value="docx" />
              <el-option label="Excel (.xlsx)" value="xlsx" />
              <el-option label="HTML" value="html" />
            </el-select>
          </el-form-item>
        </div>
        
        <div class="border border-gray-200 rounded-lg p-4 mt-4">
          <h3 class="text-lg font-semibold text-gray-900 mb-3">Opciones de Contenido</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <el-checkbox 
              v-model="config.opciones.includeDatosEstudiante"
              class="custom-checkbox"
            >
              Datos del Estudiante
            </el-checkbox>
            
            <el-checkbox 
              v-model="config.opciones.includeCaracteristicas"
              class="custom-checkbox"
            >
              Características del Estudiante
            </el-checkbox>
            
            <el-checkbox 
              v-model="config.opciones.includeAjustesRazonables"
              class="custom-checkbox"
            >
              Ajustes Razonables
            </el-checkbox>
            
            <el-checkbox 
              v-model="config.opciones.includeObjetivos"
              class="custom-checkbox"
            >
              Objetivos y Metas
            </el-checkbox>
            
            <el-checkbox 
              v-model="config.opciones.includeEvaluaciones"
              class="custom-checkbox"
            >
              Evaluaciones y Seguimiento
            </el-checkbox>
            
            <el-checkbox 
              v-model="config.opciones.includeActores"
              class="custom-checkbox"
            >
              Actores Involucrados
            </el-checkbox>
            
            <el-checkbox 
              v-model="config.opciones.includeFirmas"
              class="custom-checkbox"
            >
              Firmas Digitales
            </el-checkbox>
            
            <el-checkbox 
              v-model="config.opciones.includeCompromisos"
              class="custom-checkbox"
            >
              Compromisos y Responsabilidades
            </el-checkbox>
          </div>
        </div>
      </div>

      <!-- Botones de generación -->
      <div class="flex flex-wrap gap-4 mb-6">
        <el-button 
          @click="generarReporte" 
          class="custom-button-primary"
          :loading="generando"
        >
          <el-icon class="mr-2"><Document /></el-icon>
          Generar Reporte
        </el-button>
        
        <el-button 
          @click="previsualizarReporte" 
          class="custom-button-secondary"
        >
          <el-icon class="mr-2"><View /></el-icon>
          Previsualizar
        </el-button>
        
        <el-button 
          @click="exportarLote" 
          class="custom-button-secondary"
        >
          <el-icon class="mr-2"><Download /></el-icon>
          Exportar Lote
        </el-button>
      </div>

      <!-- Plantillas de documentos -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
          Plantillas de Documentos
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div 
            v-for="plantilla in plantillas" 
            :key="plantilla.id"
            class="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors cursor-pointer"
            @click="seleccionarPlantilla(plantilla)"
          >
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-semibold text-gray-900">{{ plantilla.nombre }}</h3>
              <el-tag 
                :type="plantilla.tipo === 'oficial' ? 'success' : 'info'"
                size="small"
              >
                {{ plantilla.tipo }}
              </el-tag>
            </div>
            <p class="text-sm text-gray-600 mb-3">{{ plantilla.descripcion }}</p>
            <div class="flex justify-between items-center">
              <span class="text-xs text-gray-500">Última modificación: {{ plantilla.ultimaModificacion }}</span>
              <el-button 
                size="small" 
                @click.stop="editarPlantilla(plantilla)"
                class="custom-button-secondary"
              >
                Editar
              </el-button>
            </div>
          </div>
        </div>
      </div>

      <!-- Historial de reportes generados -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="p-6 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900">Historial de Reportes</h2>
        </div>
        <div class="p-6">
          <el-table 
            :data="historialReportes" 
            style="width: 100%"
            class="custom-table"
          >
            <el-table-column prop="fecha" label="Fecha" width="120" />
            <el-table-column prop="estudiante" label="Estudiante" />
            <el-table-column prop="tipoDocumento" label="Tipo" />
            <el-table-column prop="formato" label="Formato" width="80" />
            <el-table-column prop="estado" label="Estado" width="100">
              <template #default="scope">
                <el-tag 
                  :type="scope.row.estado === 'completado' ? 'success' : 'warning'"
                  size="small"
                >
                  {{ scope.row.estado }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="Acciones" width="200">
              <template #default="scope">
                <el-button 
                  size="small" 
                  @click="descargarReporte(scope.row)"
                  class="custom-button-secondary"
                >
                  Descargar
                </el-button>
                <el-button 
                  size="small" 
                  type="danger" 
                  @click="eliminarReporte(scope.row)"
                  class="custom-button-danger"
                >
                  Eliminar
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <!-- Modal de previsualización -->
      <el-dialog 
        v-model="mostrarPrevisualizacion" 
        title="Previsualización del Reporte" 
        width="80%"
        class="custom-dialog"
      >
        <div class="bg-white p-6 rounded-lg border border-gray-200">
          <div class="mb-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
              {{ config.tipoDocumento === 'piar_completo' ? 'PIAR Completo' : 
                 config.tipoDocumento === 'acta_acuerdo' ? 'Acta de Acuerdo' :
                 config.tipoDocumento === 'informe_seguimiento' ? 'Informe de Seguimiento' :
                 'Reporte' }}
            </h3>
            <p class="text-sm text-gray-600">
              Estudiante: {{ obtenerNombreEstudiante(config.estudianteSeleccionado) }} | 
              Período: {{ config.periodoAcademico }}
            </p>
          </div>
          
          <div class="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div class="prose max-w-none">
              <h4 class="text-md font-semibold text-gray-900 mb-3">Contenido del Reporte</h4>
              <div class="space-y-2 text-sm text-gray-700">
                <div v-if="config.opciones.includeDatosEstudiante">
                  ✓ Información personal del estudiante
                </div>
                <div v-if="config.opciones.includeCaracteristicas">
                  ✓ Características y necesidades específicas
                </div>
                <div v-if="config.opciones.includeAjustesRazonables">
                  ✓ Ajustes razonables por área de aprendizaje
                </div>
                <div v-if="config.opciones.includeObjetivos">
                  ✓ Objetivos y metas trimestrales
                </div>
                <div v-if="config.opciones.includeEvaluaciones">
                  ✓ Evaluaciones y seguimiento
                </div>
                <div v-if="config.opciones.includeActores">
                  ✓ Actores involucrados y roles
                </div>
                <div v-if="config.opciones.includeFirmas">
                  ✓ Firmas digitales y compromisos
                </div>
                <div v-if="config.opciones.includeCompromisos">
                  ✓ Compromisos y responsabilidades
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <template #footer>
          <div class="flex justify-end space-x-3">
            <el-button @click="mostrarPrevisualizacion = false" class="custom-button-secondary">
              Cerrar
            </el-button>
            <el-button @click="generarReporte" class="custom-button-primary">
              Generar Reporte
            </el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Document, View, Download } from '@element-plus/icons-vue'

interface Estudiante {
  id: number
  nombres: string
  apellidos: string
}

interface Plantilla {
  id: number
  nombre: string
  descripcion: string
  tipo: string
  ultimaModificacion: string
}

interface Reporte {
  id: number
  fecha: string
  estudiante: string
  tipoDocumento: string
  formato: string
  estado: string
}

interface ConfiguracionReporte {
  estudianteSeleccionado: number
  tipoDocumento: string
  periodoAcademico: string
  formatoExportacion: string
  opciones: {
    includeDatosEstudiante: boolean
    includeCaracteristicas: boolean
    includeAjustesRazonables: boolean
    includeObjetivos: boolean
    includeEvaluaciones: boolean
    includeActores: boolean
    includeFirmas: boolean
    includeCompromisos: boolean
  }
}

const estudiantes = ref<Estudiante[]>([
  { id: 1, nombres: 'Juan Carlos', apellidos: 'Pérez' },
  { id: 2, nombres: 'María Isabel', apellidos: 'García' },
  { id: 3, nombres: 'Pedro José', apellidos: 'Rodríguez' }
])

const plantillas = ref<Plantilla[]>([
  {
    id: 1,
    nombre: 'PIAR Estándar',
    descripcion: 'Plantilla oficial para PIAR completo',
    tipo: 'oficial',
    ultimaModificacion: '2024-01-15'
  },
  {
    id: 2,
    nombre: 'Acta de Acuerdo',
    descripcion: 'Plantilla para actas de acuerdo entre actores',
    tipo: 'oficial',
    ultimaModificacion: '2024-01-10'
  },
  {
    id: 3,
    nombre: 'Informe de Seguimiento',
    descripcion: 'Plantilla para informes de seguimiento trimestral',
    tipo: 'oficial',
    ultimaModificacion: '2024-01-12'
  },
  {
    id: 4,
    nombre: 'Evaluación Personalizada',
    descripcion: 'Plantilla personalizada para evaluaciones',
    tipo: 'personalizada',
    ultimaModificacion: '2024-01-08'
  }
])

const historialReportes = ref<Reporte[]>([
  {
    id: 1,
    fecha: '2024-01-15',
    estudiante: 'Juan Carlos Pérez',
    tipoDocumento: 'PIAR Completo',
    formato: 'PDF',
    estado: 'completado'
  },
  {
    id: 2,
    fecha: '2024-01-14',
    estudiante: 'María Isabel García',
    tipoDocumento: 'Acta de Acuerdo',
    formato: 'Word',
    estado: 'completado'
  },
  {
    id: 3,
    fecha: '2024-01-13',
    estudiante: 'Pedro José Rodríguez',
    tipoDocumento: 'Informe de Seguimiento',
    formato: 'PDF',
    estado: 'procesando'
  }
])

const config = reactive<ConfiguracionReporte>({
  estudianteSeleccionado: 0,
  tipoDocumento: '',
  periodoAcademico: '',
  formatoExportacion: 'pdf',
  opciones: {
    includeDatosEstudiante: true,
    includeCaracteristicas: true,
    includeAjustesRazonables: true,
    includeObjetivos: true,
    includeEvaluaciones: true,
    includeActores: true,
    includeFirmas: true,
    includeCompromisos: true
  }
})

const generando = ref(false)
const mostrarPrevisualizacion = ref(false)

const generarReporte = async () => {
  if (!config.estudianteSeleccionado || !config.tipoDocumento) {
    ElMessage.error('Por favor seleccione un estudiante y tipo de documento')
    return
  }
  
  generando.value = true
  
  // Simular generación de reporte
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  const nuevoReporte: Reporte = {
    id: Date.now(),
    fecha: new Date().toISOString().split('T')[0],
    estudiante: obtenerNombreEstudiante(config.estudianteSeleccionado),
    tipoDocumento: config.tipoDocumento,
    formato: config.formatoExportacion,
    estado: 'completado'
  }
  
  historialReportes.value.unshift(nuevoReporte)
  
  ElMessage.success(`Reporte generado exitosamente en formato ${config.formatoExportacion.toUpperCase()}`)
  generando.value = false
}

const previsualizarReporte = () => {
  if (!config.estudianteSeleccionado || !config.tipoDocumento) {
    ElMessage.error('Por favor seleccione un estudiante y tipo de documento')
    return
  }
  
  mostrarPrevisualizacion.value = true
}

const exportarLote = () => {
  ElMessage.info('Funcionalidad de exportación en lote en desarrollo')
}

const seleccionarPlantilla = (plantilla: Plantilla) => {
  ElMessage.success(`Plantilla "${plantilla.nombre}" seleccionada`)
}

const editarPlantilla = (plantilla: Plantilla) => {
  ElMessage.info(`Editando plantilla: ${plantilla.nombre}`)
}

const descargarReporte = (reporte: Reporte) => {
  ElMessage.success(`Descargando reporte: ${reporte.tipoDocumento}`)
}

const eliminarReporte = (reporte: Reporte) => {
  const index = historialReportes.value.findIndex(r => r.id === reporte.id)
  if (index > -1) {
    historialReportes.value.splice(index, 1)
    ElMessage.success('Reporte eliminado exitosamente')
  }
}

const obtenerNombreEstudiante = (id: number): string => {
  const estudiante = estudiantes.value.find(e => e.id === id)
  return estudiante ? `${estudiante.nombres} ${estudiante.apellidos}` : ''
}
</script>

<style scoped>
/* Estilos personalizados para inputs - diseño exacto como en la imagen */
.custom-input :deep(.el-input__wrapper) {
  border: 1px solid #d1d5db;
  background-color: white;
  box-shadow: none;
}

.custom-input :deep(.el-input__wrapper:hover) {
  border-color: #9ca3af;
}

.custom-input :deep(.el-input__wrapper.is-focus) {
  border-color: #3b82f6;
  box-shadow: 0 0 0 1px #3b82f6;
}

/* Estilos para select */
.custom-input :deep(.el-select .el-input__wrapper) {
  border: 1px solid #d1d5db;
  background-color: white;
  box-shadow: none;
}

.custom-input :deep(.el-select .el-input__wrapper:hover) {
  border-color: #9ca3af;
}

.custom-input :deep(.el-select .el-input__wrapper.is-focus) {
  border-color: #3b82f6;
  box-shadow: 0 0 0 1px #3b82f6;
}

/* Estilos para checkboxes */
.custom-checkbox :deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  border-color: #3b82f6;
  background-color: #3b82f6;
}

.custom-checkbox :deep(.el-checkbox__input.is-checked + .el-checkbox__label) {
  color: #3b82f6;
}

/* Botones personalizados */
.custom-button-primary {
  background-color: #1e40af !important;
  border-color: #1e40af !important;
  color: white !important;
}

.custom-button-primary:hover {
  background-color: #1d4ed8 !important;
  border-color: #1d4ed8 !important;
}

.custom-button-secondary {
  background-color: white !important;
  border: 1px solid #d1d5db !important;
  color: #374151 !important;
}

.custom-button-secondary:hover {
  background-color: #f9fafb !important;
  border-color: #9ca3af !important;
}

.custom-button-danger {
  background-color: #dc2626 !important;
  border-color: #dc2626 !important;
  color: white !important;
}

.custom-button-danger:hover {
  background-color: #b91c1c !important;
  border-color: #b91c1c !important;
}

/* Tabla personalizada */
.custom-table :deep(.el-table__header) {
  background-color: #f8fafc;
}

.custom-table :deep(.el-table__header th) {
  background-color: #f8fafc;
  color: #374151;
  font-weight: 600;
  border-bottom: 1px solid #e5e7eb;
}

.custom-table :deep(.el-table__row:hover) {
  background-color: #f9fafb;
}

.custom-table :deep(.el-table) {
  border: 1px solid #e5e7eb;
}

.custom-table :deep(.el-table__border-line) {
  background-color: #e5e7eb;
}

/* Estilos para labels */
.custom-input :deep(.el-form-item__label) {
  color: #374151;
  font-weight: 500;
}

/* Estilos para placeholders */
.custom-input :deep(.el-input__inner::placeholder) {
  color: #9ca3af;
}

/* Estilos para el diálogo */
.custom-dialog :deep(.el-dialog__header) {
  background-color: #f8fafc;
  border-bottom: 1px solid #e5e7eb;
}

.custom-dialog :deep(.el-dialog__title) {
  color: #374151;
  font-weight: 600;
}

.custom-dialog :deep(.el-dialog__body) {
  padding: 0;
}

.custom-dialog :deep(.el-dialog__footer) {
  background-color: #f8fafc;
  border-top: 1px solid #e5e7eb;
  padding: 1rem 1.5rem;
}

/* Estilos para tags */
.custom-table :deep(.el-tag) {
  border-radius: 4px;
}

/* Estilos para iconos en botones */
.custom-button-primary .el-icon,
.custom-button-secondary .el-icon {
  margin-right: 0.5rem;
}
</style>