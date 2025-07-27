<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-6xl mx-auto">
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h1 class="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <el-icon><Notebook /></el-icon>
          Formulario PIAR
        </h1>
        <p class="text-gray-600">Registre y gestione el Plan Individual de Ajustes Razonables</p>
      </div>
      <el-tabs v-model="activeTab" class="custom-tabs">
        <el-tab-pane name="caracteristicas">
          <template #label>
            <el-icon><User /></el-icon>
            <span style="margin-left: 6px;">Características</span>
          </template>
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2 flex items-center gap-2">
              <el-icon><User /></el-icon>
              Características del Estudiante
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
              
              <el-form-item label="Fecha de Elaboración" prop="fechaElaboracion">
                <el-date-picker 
                  v-model="form.fechaElaboracion" 
                  type="date" 
                  placeholder="Seleccione fecha"
                  class="custom-input w-full"
                />
              </el-form-item>
              
              <el-form-item label="Características Específicas" prop="caracteristicas" class="md:col-span-2">
                <el-input 
                  v-model="form.caracteristicas" 
                  type="textarea" 
                  :rows="4"
                  placeholder="Describa las características específicas del estudiante"
                  class="custom-input"
                >
                  <template #prefix>
                    <el-icon><User /></el-icon>
                  </template>
                </el-input>
              </el-form-item>
              
              <el-form-item label="Fortalezas" prop="fortalezas" class="md:col-span-2">
                <el-input 
                  v-model="form.fortalezas" 
                  type="textarea" 
                  :rows="3"
                  placeholder="Identifique las fortalezas del estudiante"
                  class="custom-input"
                >
                  <template #prefix>
                    <el-icon><Star /></el-icon>
                  </template>
                </el-input>
              </el-form-item>
              
              <el-form-item label="Necesidades" prop="necesidades" class="md:col-span-2">
                <el-input 
                  v-model="form.necesidades" 
                  type="textarea" 
                  :rows="3"
                  placeholder="Identifique las necesidades del estudiante"
                  class="custom-input"
                />
              </el-form-item>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane name="ajustes">
          <template #label>
            <el-icon><Edit /></el-icon>
            <span style="margin-left: 6px;">Ajustes Razonables</span>
          </template>
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2 flex items-center gap-2">
              <el-icon><Edit /></el-icon>
              Ajustes Razonables por Área
            </h2>
            
            <div class="space-y-6">
              <!-- Matemáticas -->
              <div class="border border-gray-200 rounded-lg p-4">
                <h3 class="text-lg font-semibold text-gray-900 mb-3">Matemáticas</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <el-form-item label="Ajustes Pedagógicos">
                    <el-input 
                      v-model="form.ajustesMatematicas.pedagogicos" 
                      type="textarea" 
                      :rows="3"
                      placeholder="Ajustes pedagógicos para matemáticas"
                      class="custom-input"
                    >
                      <template #prefix>
                        <el-icon><Edit /></el-icon>
                      </template>
                    </el-input>
                  </el-form-item>
                  
                  <el-form-item label="Ajustes Evaluativos">
                    <el-input 
                      v-model="form.ajustesMatematicas.evaluativos" 
                      type="textarea" 
                      :rows="3"
                      placeholder="Ajustes evaluativos para matemáticas"
                      class="custom-input"
                    >
                      <template #prefix>
                        <el-icon><Edit /></el-icon>
                      </template>
                    </el-input>
                  </el-form-item>
                </div>
              </div>

              <!-- Lenguaje -->
              <div class="border border-gray-200 rounded-lg p-4">
                <h3 class="text-lg font-semibold text-gray-900 mb-3">Lenguaje</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <el-form-item label="Ajustes Pedagógicos">
                    <el-input 
                      v-model="form.ajustesLenguaje.pedagogicos" 
                      type="textarea" 
                      :rows="3"
                      placeholder="Ajustes pedagógicos para lenguaje"
                      class="custom-input"
                    >
                      <template #prefix>
                        <el-icon><Edit /></el-icon>
                      </template>
                    </el-input>
                  </el-form-item>
                  
                  <el-form-item label="Ajustes Evaluativos">
                    <el-input 
                      v-model="form.ajustesLenguaje.evaluativos" 
                      type="textarea" 
                      :rows="3"
                      placeholder="Ajustes evaluativos para lenguaje"
                      class="custom-input"
                    >
                      <template #prefix>
                        <el-icon><Edit /></el-icon>
                      </template>
                    </el-input>
                  </el-form-item>
                </div>
              </div>

              <!-- Ciencias -->
              <div class="border border-gray-200 rounded-lg p-4">
                <h3 class="text-lg font-semibold text-gray-900 mb-3">Ciencias</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <el-form-item label="Ajustes Pedagógicos">
                    <el-input 
                      v-model="form.ajustesCiencias.pedagogicos" 
                      type="textarea" 
                      :rows="3"
                      placeholder="Ajustes pedagógicos para ciencias"
                      class="custom-input"
                    >
                      <template #prefix>
                        <el-icon><Edit /></el-icon>
                      </template>
                    </el-input>
                  </el-form-item>
                  
                  <el-form-item label="Ajustes Evaluativos">
                    <el-input 
                      v-model="form.ajustesCiencias.evaluativos" 
                      type="textarea" 
                      :rows="3"
                      placeholder="Ajustes evaluativos para ciencias"
                      class="custom-input"
                    >
                      <template #prefix>
                        <el-icon><Edit /></el-icon>
                      </template>
                    </el-input>
                  </el-form-item>
                </div>
              </div>

              <!-- Ciencias Sociales -->
              <div class="border border-gray-200 rounded-lg p-4">
                <h3 class="text-lg font-semibold text-gray-900 mb-3">Ciencias Sociales</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <el-form-item label="Ajustes Pedagógicos">
                    <el-input 
                      v-model="form.ajustesSociales.pedagogicos" 
                      type="textarea" 
                      :rows="3"
                      placeholder="Ajustes pedagógicos para ciencias sociales"
                      class="custom-input"
                    >
                      <template #prefix>
                        <el-icon><Edit /></el-icon>
                      </template>
                    </el-input>
                  </el-form-item>
                  
                  <el-form-item label="Ajustes Evaluativos">
                    <el-input 
                      v-model="form.ajustesSociales.evaluativos" 
                      type="textarea" 
                      :rows="3"
                      placeholder="Ajustes evaluativos para ciencias sociales"
                      class="custom-input"
                    >
                      <template #prefix>
                        <el-icon><Edit /></el-icon>
                      </template>
                    </el-input>
                  </el-form-item>
                </div>
              </div>

              <!-- Materias Dinámicas -->
              <div class="border border-blue-200 rounded-lg p-4 mt-6">
                <h3 class="text-lg font-semibold text-blue-900 mb-3">Materias Dinámicas</h3>
                <div class="flex gap-2 mb-4">
                  <input
                    v-model="nuevaMateria"
                    placeholder="Nombre de la materia"
                    class="custom-input flex-1"
                    @keyup.enter="agregarMateria"
                  />
                  <button @click="agregarMateria" class="custom-button-primary">Agregar</button>
                </div>
                <div class="space-y-6">
                  <div
                    v-for="(materia, idx) in form.materias"
                    :key="materia.id"
                    class="border border-gray-200 rounded-lg p-4 relative"
                  >
                    <button
                      @click="eliminarMateria(idx)"
                      class="absolute top-2 right-2 custom-button-danger"
                      title="Eliminar materia"
                      style="padding: 0.2rem 0.7rem; font-size: 1rem;"
                    >×</button>
                    <input
                      v-model="materia.nombre"
                      class="custom-input text-lg font-semibold mb-3 w-full"
                      style="font-weight: bold;"
                      placeholder="Nombre de la materia"
                    />
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <el-form-item label="Ajustes Pedagógicos">
                        <el-input
                          v-model="materia.pedagogicos"
                          type="textarea"
                          :rows="3"
                          placeholder="Ajustes pedagógicos"
                          class="custom-input"
                        >
                          <template #prefix>
                            <el-icon><Edit /></el-icon>
                          </template>
                        </el-input>
                      </el-form-item>
                      <el-form-item label="Ajustes Evaluativos">
                        <el-input
                          v-model="materia.evaluativos"
                          type="textarea"
                          :rows="3"
                          placeholder="Ajustes evaluativos"
                          class="custom-input"
                        >
                          <template #prefix>
                            <el-icon><Edit /></el-icon>
                          </template>
                        </el-input>
                      </el-form-item>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane name="objetivos">
          <template #label>
            <el-icon><Target /></el-icon>
            <span style="margin-left: 6px;">Objetivos y Estrategias</span>
          </template>
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2 flex items-center gap-2">
              <el-icon><Target /></el-icon>
              Objetivos y Estrategias
            </h2>
            
            <div class="space-y-6">
              <!-- Objetivos por trimestre -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="border border-gray-200 rounded-lg p-4">
                  <h3 class="text-lg font-semibold text-gray-900 mb-3">Primer Trimestre</h3>
                  <el-input 
                    v-model="form.objetivos.primerTrimestre" 
                    type="textarea" 
                    :rows="4"
                    placeholder="Objetivos del primer trimestre"
                    class="custom-input"
                  >
                    <template #prefix>
                      <el-icon><Target /></el-icon>
                    </template>
                  </el-input>
                </div>
                
                <div class="border border-gray-200 rounded-lg p-4">
                  <h3 class="text-lg font-semibold text-gray-900 mb-3">Segundo Trimestre</h3>
                  <el-input 
                    v-model="form.objetivos.segundoTrimestre" 
                    type="textarea" 
                    :rows="4"
                    placeholder="Objetivos del segundo trimestre"
                    class="custom-input"
                  >
                    <template #prefix>
                      <el-icon><Target /></el-icon>
                    </template>
                  </el-input>
                </div>
                
                <div class="border border-gray-200 rounded-lg p-4">
                  <h3 class="text-lg font-semibold text-gray-900 mb-3">Tercer Trimestre</h3>
                  <el-input 
                    v-model="form.objetivos.tercerTrimestre" 
                    type="textarea" 
                    :rows="4"
                    placeholder="Objetivos del tercer trimestre"
                    class="custom-input"
                  >
                    <template #prefix>
                      <el-icon><Target /></el-icon>
                    </template>
                  </el-input>
                </div>
              </div>

              <!-- Estrategias -->
              <div class="border border-gray-200 rounded-lg p-4">
                <h3 class="text-lg font-semibold text-gray-900 mb-3">Estrategias de Apoyo</h3>
                <el-input 
                  v-model="form.estrategias" 
                  type="textarea" 
                  :rows="6"
                  placeholder="Describa las estrategias de apoyo para el estudiante"
                  class="custom-input"
                >
                  <template #prefix>
                    <el-icon><Edit /></el-icon>
                  </template>
                </el-input>
              </div>

              <!-- Barreras -->
              <div class="border border-gray-200 rounded-lg p-4">
                <h3 class="text-lg font-semibold text-gray-900 mb-3">Barreras Identificadas</h3>
                <el-input 
                  v-model="form.barreras" 
                  type="textarea" 
                  :rows="4"
                  placeholder="Identifique las barreras que enfrenta el estudiante"
                  class="custom-input"
                >
                  <template #prefix>
                    <el-icon><Warning /></el-icon>
                  </template>
                </el-input>
              </div>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane name="seguimiento">
          <template #label>
            <el-icon><Calendar /></el-icon>
            <span style="margin-left: 6px;">Seguimiento</span>
          </template>
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2 flex items-center gap-2">
              <el-icon><Calendar /></el-icon>
              Seguimiento y Evaluación
            </h2>
            
            <div class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <el-form-item label="Frecuencia de Seguimiento">
                  <el-select 
                    v-model="form.frecuenciaSeguimiento" 
                    placeholder="Seleccione frecuencia"
                    class="custom-input w-full"
                  >
                    <el-option label="Semanal" value="semanal" />
                    <el-option label="Quincenal" value="quincenal" />
                    <el-option label="Mensual" value="mensual" />
                    <el-option label="Trimestral" value="trimestral" />
                  </el-select>
                </el-form-item>
                
                <el-form-item label="Responsable del Seguimiento">
                  <el-input 
                    v-model="form.responsableSeguimiento" 
                    placeholder="Nombre del responsable"
                    class="custom-input"
                  >
                    <template #prefix>
                      <el-icon><User /></el-icon>
                    </template>
                  </el-input>
                </el-form-item>
              </div>
              
              <el-form-item label="Criterios de Evaluación" class="md:col-span-2">
                <el-input 
                  v-model="form.criteriosEvaluacion" 
                  type="textarea" 
                  :rows="4"
                  placeholder="Describa los criterios de evaluación"
                  class="custom-input"
                >
                  <template #prefix>
                    <el-icon><Check /></el-icon>
                  </template>
                </el-input>
              </el-form-item>
              
              <el-form-item label="Observaciones Generales" class="md:col-span-2">
                <el-input 
                  v-model="form.observaciones" 
                  type="textarea" 
                  :rows="4"
                  placeholder="Observaciones adicionales"
                  class="custom-input"
                >
                  <template #prefix>
                    <el-icon><Message /></el-icon>
                  </template>
                </el-input>
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
          <el-icon><Delete /></el-icon>
          Limpiar
        </el-button>
        <el-button 
          type="primary" 
          @click="submitForm" 
          class="custom-button-primary"
        >
          <el-icon><CirclePlus /></el-icon>
          Guardar PIAR
        </el-button>
      </div>

      <!-- Tabla de PIARs -->
      <div class="mt-8 bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="p-6 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900">PIARs Registrados</h2>
        </div>
        <div class="p-6">
          <el-table 
            :data="piars" 
            style="width: 100%"
            class="custom-table"
          >
            <el-table-column prop="estudiante" label="Estudiante" />
            <el-table-column prop="fechaElaboracion" label="Fecha" />
            <el-table-column prop="frecuenciaSeguimiento" label="Seguimiento" />
            <el-table-column prop="responsableSeguimiento" label="Responsable" />
            <el-table-column label="Acciones" width="200">
              <template #default="scope">
                <el-button 
                  size="small" 
                  @click="editarPiar(scope.row)"
                  class="custom-button-secondary"
                >
                  <el-icon><Edit /></el-icon>
                  Editar
                </el-button>
                <el-button 
                  size="small" 
                  type="danger" 
                  @click="eliminarPiar(scope.row)"
                  class="custom-button-danger"
                >
                  <el-icon><Delete /></el-icon>
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
import { Notebook, User, Star, Delete, CirclePlus, Edit, Target, Calendar, Check, Warning, Message } from '@element-plus/icons-vue'

interface Estudiante {
  id: number
  nombres: string
  apellidos: string
}

interface Ajustes {
  pedagogicos: string
  evaluativos: string
}

interface Objetivos {
  primerTrimestre: string
  segundoTrimestre: string
  tercerTrimestre: string
}

interface Piar {
  id: number
  estudiante: number
  fechaElaboracion: string
  caracteristicas: string
  fortalezas: string
  necesidades: string
  ajustesMatematicas: Ajustes
  ajustesLenguaje: Ajustes
  ajustesCiencias: Ajustes
  ajustesSociales: Ajustes
  objetivos: Objetivos
  estrategias: string
  barreras: string
  frecuenciaSeguimiento: string
  responsableSeguimiento: string
  criteriosEvaluacion: string
  observaciones: string
  materias: { id: number; nombre: string; pedagogicos: string; evaluativos: string }[]
}

const activeTab = ref('caracteristicas')
const estudiantes = ref<Estudiante[]>([
  { id: 1, nombres: 'Juan Carlos', apellidos: 'Pérez' },
  { id: 2, nombres: 'María Isabel', apellidos: 'García' }
])

const piars = ref<Piar[]>([])

const form = reactive<Piar>({
  id: 0,
  estudiante: 0,
  fechaElaboracion: '',
  caracteristicas: '',
  fortalezas: '',
  necesidades: '',
  ajustesMatematicas: { pedagogicos: '', evaluativos: '' },
  ajustesLenguaje: { pedagogicos: '', evaluativos: '' },
  ajustesCiencias: { pedagogicos: '', evaluativos: '' },
  ajustesSociales: { pedagogicos: '', evaluativos: '' },
  objetivos: { primerTrimestre: '', segundoTrimestre: '', tercerTrimestre: '' },
  estrategias: '',
  barreras: '',
  frecuenciaSeguimiento: '',
  responsableSeguimiento: '',
  criteriosEvaluacion: '',
  observaciones: '',
  materias: []
})

const nuevaMateria = ref('')

const agregarMateria = () => {
  if (nuevaMateria.value.trim() === '') {
    ElMessage.warning('El nombre de la materia no puede estar vacío')
    return
  }
  const newMateria = {
    id: Date.now(),
    nombre: nuevaMateria.value,
    pedagogicos: '',
    evaluativos: ''
  }
  form.materias.push(newMateria)
  nuevaMateria.value = ''
}

const eliminarMateria = (index: number) => {
  form.materias.splice(index, 1)
}

const submitForm = () => {
  if (!form.estudiante || !form.fechaElaboracion) {
    ElMessage.error('Por favor complete los campos requeridos')
    return
  }
  
  const nuevoPiar = { ...form, id: Date.now() }
  piars.value.push(nuevoPiar)
  
  ElMessage.success('PIAR guardado exitosamente')
  resetForm()
}

const resetForm = () => {
  Object.assign(form, {
    id: 0,
    estudiante: 0,
    fechaElaboracion: '',
    caracteristicas: '',
    fortalezas: '',
    necesidades: '',
    ajustesMatematicas: { pedagogicos: '', evaluativos: '' },
    ajustesLenguaje: { pedagogicos: '', evaluativos: '' },
    ajustesCiencias: { pedagogicos: '', evaluativos: '' },
    ajustesSociales: { pedagogicos: '', evaluativos: '' },
    objetivos: { primerTrimestre: '', segundoTrimestre: '', tercerTrimestre: '' },
    estrategias: '',
    barreras: '',
    frecuenciaSeguimiento: '',
    responsableSeguimiento: '',
    criteriosEvaluacion: '',
    observaciones: '',
    materias: []
  })
  nuevaMateria.value = ''
  activeTab.value = 'caracteristicas'
}

const editarPiar = (piar: Piar) => {
  Object.assign(form, piar)
}

const eliminarPiar = (piar: Piar) => {
  const index = piars.value.findIndex(p => p.id === piar.id)
  if (index > -1) {
    piars.value.splice(index, 1)
    ElMessage.success('PIAR eliminado exitosamente')
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