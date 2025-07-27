<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-6xl mx-auto">
      <!-- Header del formulario -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h1 class="text-2xl font-bold text-gray-900 mb-2">Seguimiento y Evaluación</h1>
        <p class="text-gray-600">Registre el seguimiento y evaluación del progreso del estudiante</p>
      </div>

      <!-- Formulario con tabs -->
      <el-tabs v-model="activeTab" class="custom-tabs">
        <el-tab-pane label="Evaluación por Áreas" name="evaluacion">
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
              Evaluación por Áreas de Aprendizaje
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <el-form-item label="Estudiante" prop="estudiante">
                <el-select 
                  v-model="form.estudiante" 
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
              
              <el-form-item label="Fecha de Evaluación" prop="fechaEvaluacion">
                <el-date-picker 
                  v-model="form.fechaEvaluacion" 
                  type="date" 
                  placeholder="Seleccione fecha"
                  class="custom-input w-full"
                />
              </el-form-item>
            </div>

            <!-- Evaluación por áreas -->
            <div class="space-y-6 mt-6">
              <!-- Matemáticas -->
              <div class="border border-gray-200 rounded-lg p-4">
                <h3 class="text-lg font-semibold text-gray-900 mb-3">Matemáticas</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <el-form-item label="Progreso">
                    <el-rate 
                      v-model="form.matematicas.progreso" 
                      :max="5"
                      class="custom-rate"
                    />
                  </el-form-item>
                  
                  <el-form-item label="Dificultades">
                    <el-input 
                      v-model="form.matematicas.dificultades" 
                      type="textarea" 
                      :rows="2"
                      placeholder="Describa las dificultades"
                      class="custom-input"
                    />
                  </el-form-item>
                  
                  <el-form-item label="Observaciones">
                    <el-input 
                      v-model="form.matematicas.observaciones" 
                      type="textarea" 
                      :rows="2"
                      placeholder="Observaciones adicionales"
                      class="custom-input"
                    />
                  </el-form-item>
                </div>
              </div>

              <!-- Lenguaje -->
              <div class="border border-gray-200 rounded-lg p-4">
                <h3 class="text-lg font-semibold text-gray-900 mb-3">Lenguaje</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <el-form-item label="Progreso">
                    <el-rate 
                      v-model="form.lenguaje.progreso" 
                      :max="5"
                      class="custom-rate"
                    />
                  </el-form-item>
                  
                  <el-form-item label="Dificultades">
                    <el-input 
                      v-model="form.lenguaje.dificultades" 
                      type="textarea" 
                      :rows="2"
                      placeholder="Describa las dificultades"
                      class="custom-input"
                    />
                  </el-form-item>
                  
                  <el-form-item label="Observaciones">
                    <el-input 
                      v-model="form.lenguaje.observaciones" 
                      type="textarea" 
                      :rows="2"
                      placeholder="Observaciones adicionales"
                      class="custom-input"
                    />
                  </el-form-item>
                </div>
              </div>

              <!-- Ciencias -->
              <div class="border border-gray-200 rounded-lg p-4">
                <h3 class="text-lg font-semibold text-gray-900 mb-3">Ciencias</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <el-form-item label="Progreso">
                    <el-rate 
                      v-model="form.ciencias.progreso" 
                      :max="5"
                      class="custom-rate"
                    />
                  </el-form-item>
                  
                  <el-form-item label="Dificultades">
                    <el-input 
                      v-model="form.ciencias.dificultades" 
                      type="textarea" 
                      :rows="2"
                      placeholder="Describa las dificultades"
                      class="custom-input"
                    />
                  </el-form-item>
                  
                  <el-form-item label="Observaciones">
                    <el-input 
                      v-model="form.ciencias.observaciones" 
                      type="textarea" 
                      :rows="2"
                      placeholder="Observaciones adicionales"
                      class="custom-input"
                    />
                  </el-form-item>
                </div>
              </div>

              <!-- Ciencias Sociales -->
              <div class="border border-gray-200 rounded-lg p-4">
                <h3 class="text-lg font-semibold text-gray-900 mb-3">Ciencias Sociales</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <el-form-item label="Progreso">
                    <el-rate 
                      v-model="form.sociales.progreso" 
                      :max="5"
                      class="custom-rate"
                    />
                  </el-form-item>
                  
                  <el-form-item label="Dificultades">
                    <el-input 
                      v-model="form.sociales.dificultades" 
                      type="textarea" 
                      :rows="2"
                      placeholder="Describa las dificultades"
                      class="custom-input"
                    />
                  </el-form-item>
                  
                  <el-form-item label="Observaciones">
                    <el-input 
                      v-model="form.sociales.observaciones" 
                      type="textarea" 
                      :rows="2"
                      placeholder="Observaciones adicionales"
                      class="custom-input"
                    />
                  </el-form-item>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="Seguimiento de Ajustes" name="ajustes">
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
              Seguimiento de Ajustes Razonables
            </h2>
            
            <div class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <el-form-item label="Ajustes Implementados">
                  <el-input 
                    v-model="form.ajustesImplementados" 
                    type="textarea" 
                    :rows="4"
                    placeholder="Describa los ajustes que se han implementado"
                    class="custom-input"
                  />
                </el-form-item>
                
                <el-form-item label="Efectividad de los Ajustes">
                  <el-select 
                    v-model="form.efectividadAjustes" 
                    placeholder="Seleccione nivel de efectividad"
                    class="custom-input w-full"
                  >
                    <el-option label="Muy Efectivo" value="muy_efectivo" />
                    <el-option label="Efectivo" value="efectivo" />
                    <el-option label="Parcialmente Efectivo" value="parcialmente_efectivo" />
                    <el-option label="Poco Efectivo" value="poco_efectivo" />
                    <el-option label="No Efectivo" value="no_efectivo" />
                  </el-select>
                </el-form-item>
              </div>
              
              <el-form-item label="Observaciones sobre Ajustes" class="md:col-span-2">
                <el-input 
                  v-model="form.observacionesAjustes" 
                  type="textarea" 
                  :rows="4"
                  placeholder="Observaciones sobre la implementación de ajustes"
                  class="custom-input"
                />
              </el-form-item>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="Alertas y Próximos Pasos" name="alertas">
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
              Alertas y Próximos Pasos
            </h2>
            
            <div class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <el-form-item label="Alertas Identificadas">
                  <el-input 
                    v-model="form.alertas" 
                    type="textarea" 
                    :rows="4"
                    placeholder="Identifique las alertas o situaciones que requieren atención"
                    class="custom-input"
                  />
                </el-form-item>
                
                <el-form-item label="Próximos Pasos">
                  <el-input 
                    v-model="form.proximosPasos" 
                    type="textarea" 
                    :rows="4"
                    placeholder="Describa los próximos pasos a seguir"
                    class="custom-input"
                  />
                </el-form-item>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <el-form-item label="Fecha de Próxima Evaluación">
                  <el-date-picker 
                    v-model="form.fechaProximaEvaluacion" 
                    type="date" 
                    placeholder="Seleccione fecha"
                    class="custom-input w-full"
                  />
                </el-form-item>
                
                <el-form-item label="Responsable de Seguimiento">
                  <el-input 
                    v-model="form.responsableSeguimiento" 
                    placeholder="Nombre del responsable"
                    class="custom-input"
                  />
                </el-form-item>
              </div>
              
              <el-form-item label="Recomendaciones" class="md:col-span-2">
                <el-input 
                  v-model="form.recomendaciones" 
                  type="textarea" 
                  :rows="4"
                  placeholder="Recomendaciones para el seguimiento"
                  class="custom-input"
                />
              </el-form-item>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>

      <!-- Botones de acción -->
      <div class="flex justify-end space-x-4 mt-6">
        <el-button 
          @click="resetForm" 
          class="custom-button-secondary"
        >
          Limpiar
        </el-button>
        <el-button 
          type="primary" 
          @click="submitForm" 
          class="custom-button-primary"
        >
          Guardar Seguimiento
        </el-button>
      </div>

      <!-- Tabla de seguimientos -->
      <div class="mt-8 bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="p-6 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900">Seguimientos Registrados</h2>
        </div>
        <div class="p-6">
          <el-table 
            :data="seguimientos" 
            style="width: 100%"
            class="custom-table"
          >
            <el-table-column prop="estudiante" label="Estudiante" />
            <el-table-column prop="fechaEvaluacion" label="Fecha" />
            <el-table-column prop="efectividadAjustes" label="Efectividad" />
            <el-table-column prop="responsableSeguimiento" label="Responsable" />
            <el-table-column label="Acciones" width="200">
              <template #default="scope">
                <el-button 
                  size="small" 
                  @click="editarSeguimiento(scope.row)"
                  class="custom-button-secondary"
                >
                  Editar
                </el-button>
                <el-button 
                  size="small" 
                  type="danger" 
                  @click="eliminarSeguimiento(scope.row)"
                  class="custom-button-danger"
                >
                  Eliminar
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

interface Estudiante {
  id: number
  nombres: string
  apellidos: string
}

interface EvaluacionArea {
  progreso: number
  dificultades: string
  observaciones: string
}

interface Seguimiento {
  id: number
  estudiante: number
  fechaEvaluacion: string
  matematicas: EvaluacionArea
  lenguaje: EvaluacionArea
  ciencias: EvaluacionArea
  sociales: EvaluacionArea
  ajustesImplementados: string
  efectividadAjustes: string
  observacionesAjustes: string
  alertas: string
  proximosPasos: string
  fechaProximaEvaluacion: string
  responsableSeguimiento: string
  recomendaciones: string
}

const activeTab = ref('evaluacion')
const estudiantes = ref<Estudiante[]>([
  { id: 1, nombres: 'Juan Carlos', apellidos: 'Pérez' },
  { id: 2, nombres: 'María Isabel', apellidos: 'García' }
])

const seguimientos = ref<Seguimiento[]>([])

const form = reactive<Seguimiento>({
  id: 0,
  estudiante: 0,
  fechaEvaluacion: '',
  matematicas: { progreso: 0, dificultades: '', observaciones: '' },
  lenguaje: { progreso: 0, dificultades: '', observaciones: '' },
  ciencias: { progreso: 0, dificultades: '', observaciones: '' },
  sociales: { progreso: 0, dificultades: '', observaciones: '' },
  ajustesImplementados: '',
  efectividadAjustes: '',
  observacionesAjustes: '',
  alertas: '',
  proximosPasos: '',
  fechaProximaEvaluacion: '',
  responsableSeguimiento: '',
  recomendaciones: ''
})

const submitForm = () => {
  if (!form.estudiante || !form.fechaEvaluacion) {
    ElMessage.error('Por favor complete los campos requeridos')
    return
  }
  
  const nuevoSeguimiento = { ...form, id: Date.now() }
  seguimientos.value.push(nuevoSeguimiento)
  
  ElMessage.success('Seguimiento guardado exitosamente')
  resetForm()
}

const resetForm = () => {
  Object.assign(form, {
    id: 0,
    estudiante: 0,
    fechaEvaluacion: '',
    matematicas: { progreso: 0, dificultades: '', observaciones: '' },
    lenguaje: { progreso: 0, dificultades: '', observaciones: '' },
    ciencias: { progreso: 0, dificultades: '', observaciones: '' },
    sociales: { progreso: 0, dificultades: '', observaciones: '' },
    ajustesImplementados: '',
    efectividadAjustes: '',
    observacionesAjustes: '',
    alertas: '',
    proximosPasos: '',
    fechaProximaEvaluacion: '',
    responsableSeguimiento: '',
    recomendaciones: ''
  })
  activeTab.value = 'evaluacion'
}

const editarSeguimiento = (seguimiento: Seguimiento) => {
  Object.assign(form, seguimiento)
}

const eliminarSeguimiento = (seguimiento: Seguimiento) => {
  const index = seguimientos.value.findIndex(s => s.id === seguimiento.id)
  if (index > -1) {
    seguimientos.value.splice(index, 1)
    ElMessage.success('Seguimiento eliminado exitosamente')
  }
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

/* Estilos para date picker */
.custom-input :deep(.el-date-editor .el-input__wrapper) {
  border: 1px solid #d1d5db;
  background-color: white;
  box-shadow: none;
}

.custom-input :deep(.el-date-editor .el-input__wrapper:hover) {
  border-color: #9ca3af;
}

.custom-input :deep(.el-date-editor .el-input__wrapper.is-focus) {
  border-color: #3b82f6;
  box-shadow: 0 0 0 1px #3b82f6;
}

/* Estilos para textarea */
.custom-input :deep(.el-textarea__inner) {
  border: 1px solid #d1d5db;
  background-color: white;
  box-shadow: none;
}

.custom-input :deep(.el-textarea__inner:hover) {
  border-color: #9ca3af;
}

.custom-input :deep(.el-textarea__inner:focus) {
  border-color: #3b82f6;
  box-shadow: 0 0 0 1px #3b82f6;
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

/* Estilos para tabs */
.custom-tabs :deep(.el-tabs__item.is-active) {
  color: #3b82f6;
}

.custom-tabs :deep(.el-tabs__active-bar) {
  background-color: #3b82f6;
}

.custom-tabs :deep(.el-tabs__item:hover) {
  color: #3b82f6;
}

/* Estilos para rate */
.custom-rate :deep(.el-rate__item.is-active .el-rate__icon) {
  color: #3b82f6;
}

.custom-rate :deep(.el-rate__item:hover .el-rate__icon) {
  color: #60a5fa;
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

.custom-input :deep(.el-textarea__inner::placeholder) {
  color: #9ca3af;
}
</style> 