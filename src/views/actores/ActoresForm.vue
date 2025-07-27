<template>
  <div>
    <h1 style="color: red;">Test Gestión de Actores</h1>
    <div class="min-h-screen bg-gray-50 p-6">
      <div class="max-w-6xl mx-auto">
        <!-- Header del formulario -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h1 class="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <el-icon><UserFilled /></el-icon>
            Gestión de Actores
          </h1>
          <p class="text-gray-600">Registre y gestione los actores involucrados en el proceso PIAR</p>
        </div>

        <!-- Formulario con tabs -->
        <el-tabs v-model="activeTab" class="custom-tabs">
          <el-tab-pane name="registro">
            <template #label>
              <el-icon><UserFilled /></el-icon>
              <span style="margin-left: 6px;">Registro de Actores</span>
            </template>
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 class="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2 flex items-center gap-2">
                <el-icon><UserFilled /></el-icon>
                Registro de Actores
              </h2>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <el-form-item label="Tipo de Actor" prop="tipoActor">
                  <el-select 
                    v-model="form.tipoActor" 
                    placeholder="Seleccione tipo de actor"
                    class="custom-input w-full"
                  >
                    <el-option label="Docente" value="docente" />
                    <el-option label="Directivo" value="directivo" />
                    <el-option label="Familiar" value="familiar" />
                    <el-option label="Psicólogo" value="psicologo" />
                    <el-option label="Terapeuta" value="terapeuta" />
                    <el-option label="Otro" value="otro" />
                  </el-select>
                </el-form-item>
                
                <el-form-item label="Nombres" prop="nombres">
                  <el-input 
                    v-model="form.nombres" 
                    placeholder="Ingrese nombres"
                    class="custom-input"
                  >
                    <template #prefix>
                      <el-icon><User /></el-icon>
                    </template>
                  </el-input>
                </el-form-item>
                
                <el-form-item label="Apellidos" prop="apellidos">
                  <el-input 
                    v-model="form.apellidos" 
                    placeholder="Ingrese apellidos"
                    class="custom-input"
                  >
                    <template #prefix>
                      <el-icon><User /></el-icon>
                    </template>
                  </el-input>
                </el-form-item>
                
                <el-form-item label="Documento de Identidad" prop="documento">
                  <el-input 
                    v-model="form.documento" 
                    placeholder="Ingrese número de documento"
                    class="custom-input"
                  >
                    <template #prefix>
                      <el-icon><Document /></el-icon>
                    </template>
                  </el-input>
                </el-form-item>
                
                <el-form-item label="Teléfono" prop="telefono">
                  <el-input 
                    v-model="form.telefono" 
                    placeholder="Ingrese teléfono"
                    class="custom-input"
                  >
                    <template #prefix>
                      <el-icon><Phone /></el-icon>
                    </template>
                  </el-input>
                </el-form-item>
                
                <el-form-item label="Email" prop="email">
                  <el-input 
                    v-model="form.email" 
                    placeholder="Ingrese email"
                    class="custom-input"
                  >
                    <template #prefix>
                      <el-icon><Message /></el-icon>
                    </template>
                  </el-input>
                </el-form-item>
                
                <el-form-item label="Institución" prop="institucion">
                  <el-input 
                    v-model="form.institucion" 
                    placeholder="Ingrese institución"
                    class="custom-input"
                  >
                    <template #prefix>
                      <el-icon><OfficeBuilding /></el-icon>
                    </template>
                  </el-input>
                </el-form-item>
                
                <el-form-item label="Cargo/Profesión" prop="cargo">
                  <el-input 
                    v-model="form.cargo" 
                    placeholder="Ingrese cargo o profesión"
                    class="custom-input"
                  >
                    <template #prefix>
                      <el-icon><Briefcase /></el-icon>
                    </template>
                  </el-input>
                </el-form-item>
                
                <el-form-item label="Especialidad" prop="especialidad">
                  <el-input 
                    v-model="form.especialidad" 
                    placeholder="Ingrese especialidad (si aplica)"
                    class="custom-input"
                  >
                    <template #prefix>
                      <el-icon><Star /></el-icon>
                    </template>
                  </el-input>
                </el-form-item>
              </div>
            </div>
          </el-tab-pane>

          <el-tab-pane name="roles">
            <template #label>
              <el-icon><Tickets /></el-icon>
              <span style="margin-left: 6px;">Roles y Responsabilidades</span>
            </template>
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 class="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2 flex items-center gap-2">
                <el-icon><Tickets /></el-icon>
                Asignación de Roles y Responsabilidades
              </h2>
              
              <div class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <el-form-item label="Actor" prop="actorSeleccionado">
                    <el-select 
                      v-model="form.actorSeleccionado" 
                      placeholder="Seleccione actor"
                      class="custom-input w-full"
                    >
                      <el-option 
                        v-for="actor in actores" 
                        :key="actor.id" 
                        :label="`${actor.nombres} ${actor.apellidos} - ${actor.tipoActor}`" 
                        :value="actor.id" 
                      />
                    </el-select>
                  </el-form-item>
                  
                  <el-form-item label="Estudiante Asignado" prop="estudianteAsignado">
                    <el-select 
                      v-model="form.estudianteAsignado" 
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
                </div>
                
                <div class="border border-gray-200 rounded-lg p-4">
                  <h3 class="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <el-icon><CircleCheck /></el-icon>
                    Roles Asignados
                  </h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <el-checkbox 
                      v-model="form.roles.docentePrincipal"
                      class="custom-checkbox"
                    >
                      <el-icon><User /></el-icon>
                      Docente Principal
                    </el-checkbox>
                    
                    <el-checkbox 
                      v-model="form.roles.coordinadorPIAR"
                      class="custom-checkbox"
                    >
                      <el-icon><User /></el-icon>
                      Coordinador PIAR
                    </el-checkbox>
                    
                    <el-checkbox 
                      v-model="form.roles.evaluador"
                      class="custom-checkbox"
                    >
                      <el-icon><CircleCheck /></el-icon>
                      Evaluador
                    </el-checkbox>
                    
                    <el-checkbox 
                      v-model="form.roles.acompañante"
                      class="custom-checkbox"
                    >
                      <el-icon><User /></el-icon>
                      Acompañante
                    </el-checkbox>
                    
                    <el-checkbox 
                      v-model="form.roles.familiarResponsable"
                      class="custom-checkbox"
                    >
                      <el-icon><User /></el-icon>
                      Familiar Responsable
                    </el-checkbox>
                    
                    <el-checkbox 
                      v-model="form.roles.especialista"
                      class="custom-checkbox"
                    >
                      <el-icon><Star /></el-icon>
                      Especialista
                    </el-checkbox>
                  </div>
                </div>
                
                <el-form-item label="Responsabilidades Específicas" class="md:col-span-2">
                  <el-input 
                    v-model="form.responsabilidades" 
                    type="textarea" 
                    :rows="4"
                    placeholder="Describa las responsabilidades específicas del actor"
                    class="custom-input"
                  >
                    <template #prefix>
                      <el-icon><List /></el-icon>
                    </template>
                  </el-input>
                </el-form-item>
                
                <el-form-item label="Compromisos" class="md:col-span-2">
                  <el-input 
                    v-model="form.compromisos" 
                    type="textarea" 
                    :rows="4"
                    placeholder="Describa los compromisos del actor"
                    class="custom-input"
                  >
                    <template #prefix>
                      <el-icon><Calendar /></el-icon>
                    </template>
                  </el-input>
                </el-form-item>
              </div>
            </div>
          </el-tab-pane>

          <el-tab-pane name="firmas">
            <template #label>
              <el-icon><EditPen /></el-icon>
              <span style="margin-left: 6px;">Firmas</span>
            </template>
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 class="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2 flex items-center gap-2">
                <el-icon><EditPen /></el-icon>
                Gestión de Firmas Digitales
              </h2>
              
              <div class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <el-form-item label="Tipo de Documento" prop="tipoDocumento">
                    <el-select 
                      v-model="form.tipoDocumento" 
                      placeholder="Seleccione tipo de documento"
                      class="custom-input w-full"
                    >
                      <el-option label="Acta de Acuerdo" value="acta_acuerdo" />
                      <el-option label="PIAR" value="piar" />
                      <el-option label="Informe de Seguimiento" value="informe_seguimiento" />
                      <el-option label="Evaluación" value="evaluacion" />
                      <el-option label="Otro" value="otro" />
                    </el-select>
                  </el-form-item>
                  
                  <el-form-item label="Fecha de Firma" prop="fechaFirma">
                    <el-date-picker 
                      v-model="form.fechaFirma" 
                      type="date" 
                      placeholder="Seleccione fecha"
                      class="custom-input w-full"
                    >
                      <template #prefix>
                        <el-icon><Calendar /></el-icon>
                      </template>
                    </el-date-picker>
                  </el-form-item>
                </div>
                
                <div class="border border-gray-200 rounded-lg p-4">
                  <h3 class="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <el-icon><User /></el-icon>
                    Actores que Firman
                  </h3>
                  <div class="space-y-3">
                    <div 
                      v-for="actor in actores" 
                      :key="actor.id"
                      class="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                    >
                      <div>
                        <p class="font-medium text-gray-900">{{ actor.nombres }} {{ actor.apellidos }}</p>
                        <p class="text-sm text-gray-600">{{ actor.tipoActor }} - {{ actor.cargo }}</p>
                      </div>
                      <div class="flex items-center space-x-3">
                        <el-checkbox 
                          v-model="actor.firmaRequerida"
                          class="custom-checkbox"
                        >
                          <el-icon><Lock /></el-icon>
                          Requiere Firma
                        </el-checkbox>
                        <el-button 
                          v-if="actor.firmaRequerida"
                          size="small"
                          @click="firmarDocumento(actor.id)"
                          class="custom-button-primary"
                        >
                          <el-icon><EditPen /></el-icon>
                          Firmar
                        </el-button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <el-form-item label="Observaciones de Firma" class="md:col-span-2">
                  <el-input 
                    v-model="form.observacionesFirma" 
                    type="textarea" 
                    :rows="3"
                    placeholder="Observaciones sobre el proceso de firma"
                    class="custom-input"
                  >
                    <template #prefix>
                      <el-icon><ChatLineRound /></el-icon>
                    </template>
                  </el-input>
                </el-form-item>
              </div>
            </div>
          </el-tab-pane>

          <el-tab-pane name="observaciones">
            <template #label>
              <el-icon><ChatLineRound /></el-icon>
              <span style="margin-left: 6px;">Observaciones</span>
            </template>
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 class="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2 flex items-center gap-2">
                <el-icon><ChatLineRound /></el-icon>
                Observaciones de Firma
              </h2>
              
              <div class="space-y-6">
                <el-form-item label="Observaciones de Firma" class="md:col-span-2">
                  <el-input 
                    v-model="form.observacionesFirma" 
                    type="textarea" 
                    :rows="3"
                    placeholder="Observaciones sobre el proceso de firma"
                    class="custom-input"
                  >
                    <template #prefix>
                      <el-icon><ChatLineRound /></el-icon>
                    </template>
                  </el-input>
                </el-form-item>
              </div>
            </div>
          </el-tab-pane>

          <el-tab-pane name="registrados">
            <template #label>
              <el-icon><User /></el-icon>
              <span style="margin-left: 6px;">Actores Registrados</span>
            </template>
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 class="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2 flex items-center gap-2">
                <el-icon><User /></el-icon>
                Actores Registrados
              </h2>
              <div class="p-6">
                <el-table 
                  :data="actores" 
                  style="width: 100%"
                  class="custom-table"
                >
                  <el-table-column prop="nombres" label="Nombres" />
                  <el-table-column prop="apellidos" label="Apellidos" />
                  <el-table-column prop="tipoActor" label="Tipo" />
                  <el-table-column prop="cargo" label="Cargo" />
                  <el-table-column prop="institucion" label="Institución" />
                  <el-table-column prop="telefono" label="Teléfono" />
                  <el-table-column label="Acciones" width="200">
                    <template #default="scope">
                      <el-button 
                        size="small" 
                        @click="editarActor(scope.row)"
                        class="custom-button-secondary"
                      >
                        <el-icon><EditPen /></el-icon>
                        Editar
                      </el-button>
                      <el-button 
                        size="small" 
                        type="danger" 
                        @click="eliminarActor(scope.row)"
                        class="custom-button-danger"
                      >
                        <el-icon><DeleteFilled /></el-icon>
                        Eliminar
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
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
            Guardar Actor
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { UserFilled, Tickets, EditPen, ChatLineRound, User, Delete, CirclePlus, DeleteFilled, Document, Phone, OfficeBuilding, CircleCheck, List, Calendar, Star, Lock } from '@element-plus/icons-vue'

interface Estudiante {
  id: number
  nombres: string
  apellidos: string
}

interface Roles {
  docentePrincipal: boolean
  coordinadorPIAR: boolean
  evaluador: boolean
  acompañante: boolean
  familiarResponsable: boolean
  especialista: boolean
}

interface Actor {
  id: number
  tipoActor: string
  nombres: string
  apellidos: string
  documento: string
  telefono: string
  email: string
  institucion: string
  cargo: string
  especialidad: string
  firmaRequerida?: boolean
}

interface FormularioActor {
  id: number
  tipoActor: string
  nombres: string
  apellidos: string
  documento: string
  telefono: string
  email: string
  institucion: string
  cargo: string
  especialidad: string
  actorSeleccionado: number
  estudianteAsignado: number
  roles: Roles
  responsabilidades: string
  compromisos: string
  tipoDocumento: string
  fechaFirma: string
  observacionesFirma: string
  actorResponsable: number
  fechaCompromiso: string
  descripcionCompromiso: string
  estadoCompromiso: string
  fechaCumplimiento: string
  evidenciaCumplimiento: string
}

const activeTab = ref('registro')
const estudiantes = ref<Estudiante[]>([
  { id: 1, nombres: 'Juan Carlos', apellidos: 'Pérez' },
  { id: 2, nombres: 'María Isabel', apellidos: 'García' }
])

const actores = ref<Actor[]>([
  {
    id: 1,
    tipoActor: 'docente',
    nombres: 'Ana María',
    apellidos: 'González',
    documento: '12345678',
    telefono: '3001234567',
    email: 'ana.gonzalez@escuela.edu.co',
    institucion: 'Escuela Primaria San José',
    cargo: 'Docente de Matemáticas',
    especialidad: 'Matemáticas'
  },
  {
    id: 2,
    tipoActor: 'familiar',
    nombres: 'Carlos',
    apellidos: 'Pérez',
    documento: '87654321',
    telefono: '3007654321',
    email: 'carlos.perez@email.com',
    institucion: 'N/A',
    cargo: 'Padre',
    especialidad: 'N/A'
  }
])

const form = reactive<FormularioActor>({
  id: 0,
  tipoActor: '',
  nombres: '',
  apellidos: '',
  documento: '',
  telefono: '',
  email: '',
  institucion: '',
  cargo: '',
  especialidad: '',
  actorSeleccionado: 0,
  estudianteAsignado: 0,
  roles: {
    docentePrincipal: false,
    coordinadorPIAR: false,
    evaluador: false,
    acompañante: false,
    familiarResponsable: false,
    especialista: false
  },
  responsabilidades: '',
  compromisos: '',
  tipoDocumento: '',
  fechaFirma: '',
  observacionesFirma: '',
  actorResponsable: 0,
  fechaCompromiso: '',
  descripcionCompromiso: '',
  estadoCompromiso: '',
  fechaCumplimiento: '',
  evidenciaCumplimiento: ''
})

const submitForm = () => {
  if (!form.tipoActor || !form.nombres || !form.apellidos) {
    ElMessage.error('Por favor complete los campos requeridos')
    return
  }
  
  const nuevoActor = { ...form, id: Date.now() }
  actores.value.push(nuevoActor)
  
  ElMessage.success('Actor guardado exitosamente')
  resetForm()
}

const resetForm = () => {
  Object.assign(form, {
    id: 0,
    tipoActor: '',
    nombres: '',
    apellidos: '',
    documento: '',
    telefono: '',
    email: '',
    institucion: '',
    cargo: '',
    especialidad: '',
    actorSeleccionado: 0,
    estudianteAsignado: 0,
    roles: {
      docentePrincipal: false,
      coordinadorPIAR: false,
      evaluador: false,
      acompañante: false,
      familiarResponsable: false,
      especialista: false
    },
    responsabilidades: '',
    compromisos: '',
    tipoDocumento: '',
    fechaFirma: '',
    observacionesFirma: '',
    actorResponsable: 0,
    fechaCompromiso: '',
    descripcionCompromiso: '',
    estadoCompromiso: '',
    fechaCumplimiento: '',
    evidenciaCumplimiento: ''
  })
  activeTab.value = 'registro'
}

const editarActor = (actor: Actor) => {
  Object.assign(form, actor)
}

const eliminarActor = (actor: Actor) => {
  const index = actores.value.findIndex(a => a.id === actor.id)
  if (index > -1) {
    actores.value.splice(index, 1)
    ElMessage.success('Actor eliminado exitosamente')
  }
}

const firmarDocumento = (actorId: number) => {
  ElMessage.success('Documento firmado exitosamente')
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