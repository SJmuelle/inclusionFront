<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-6xl mx-auto">
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h1 class="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <el-icon><UserFilled /></el-icon>
          Gestión de Estudiantes
        </h1>
        <p class="text-gray-600">Registre y gestione los datos de los estudiantes</p>
      </div>
      <el-tabs v-model="activeTab" class="custom-tabs">
        <el-tab-pane name="datosPersonales">
          <template #label>
            <el-icon><User /></el-icon>
            <span style="margin-left: 6px;">Datos Personales</span>
          </template>
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2 flex items-center gap-2">
              <el-icon><User /></el-icon>
              Datos Personales
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <el-form-item label="Nombres" prop="nombres">
                <el-input v-model="form.nombres" placeholder="Ingrese nombres" class="custom-input">
                  <template #prefix>
                    <el-icon><User /></el-icon>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item label="Apellidos" prop="apellidos">
                <el-input v-model="form.apellidos" placeholder="Ingrese apellidos" class="custom-input">
                  <template #prefix>
                    <el-icon><User /></el-icon>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item label="Fecha de Nacimiento" prop="fechaNacimiento">
                <el-date-picker v-model="form.fechaNacimiento" type="date" placeholder="Seleccione fecha" class="custom-input w-full">
                  <template #prefix>
                    <el-icon><Calendar /></el-icon>
                  </template>
                </el-date-picker>
              </el-form-item>
              <el-form-item label="Tipo de Documento" prop="tipoDocumento">
                <el-input v-model="form.tipoDocumento" placeholder="Tipo de documento" class="custom-input">
                  <template #prefix>
                    <el-icon><Document /></el-icon>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item label="Documento" prop="documento">
                <el-input v-model="form.documento" placeholder="Número de documento" class="custom-input">
                  <template #prefix>
                    <el-icon><Document /></el-icon>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item label="Género" prop="genero">
                <el-input v-model="form.genero" placeholder="Género" class="custom-input">
                  <template #prefix>
                    <el-icon><UserFilled /></el-icon>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item label="Teléfono" prop="telefono">
                <el-input v-model="form.telefono" placeholder="Teléfono" class="custom-input">
                  <template #prefix>
                    <el-icon><Phone /></el-icon>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item label="Email" prop="email">
                <el-input v-model="form.email" placeholder="Email" class="custom-input">
                  <template #prefix>
                    <el-icon><Message /></el-icon>
                  </template>
                </el-input>
              </el-form-item>
              <!-- ...otros inputs importantes con iconos... -->
            </div>
          </div>
        </el-tab-pane>
        <!-- ...otros tabs, puedes agregar iconos igual que arriba... -->
      </el-tabs>
      <div class="flex justify-end space-x-4 mt-6">
        <el-button @click="resetForm" class="custom-button-secondary">
          <el-icon><Delete /></el-icon>
          Limpiar
        </el-button>
        <el-button type="primary" @click="submitForm" class="custom-button-primary">
          <el-icon><CirclePlus /></el-icon>
          Guardar Estudiante
        </el-button>
      </div>

      <!-- Tabla de estudiantes -->
      <div class="mt-8 bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="p-6 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900">Estudiantes Registrados</h2>
        </div>
        <div class="p-6">
          <el-table 
            :data="estudiantes" 
            style="width: 100%"
            class="custom-table"
          >
            <el-table-column prop="nombres" label="Nombres" />
            <el-table-column prop="apellidos" label="Apellidos" />
            <el-table-column prop="documento" label="Documento" />
            <el-table-column prop="gradoActual" label="Grado" />
            <el-table-column prop="edad" label="Edad" />
            <el-table-column prop="eps" label="EPS" />
            <el-table-column label="Acciones" width="200">
              <template #default="scope">
                <el-button 
                  size="small" 
                  @click="editarEstudiante(scope.row)"
                  class="custom-button-secondary"
                >
                  Editar
                </el-button>
                <el-button 
                  size="small" 
                  type="danger" 
                  @click="eliminarEstudiante(scope.row)"
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
import { UserFilled, User, Document, Calendar, Phone, Message, Delete, CirclePlus } from '@element-plus/icons-vue'

interface Estudiante {
  id: number
  nombres: string
  apellidos: string
  fechaNacimiento: string
  tipoDocumento: string
  documento: string
  genero: string
  direccion: string
  telefono: string
  email: string
  eps: string
  tipoSangre: string
  alergias: string
  medicamentos: string
  diagnosticos: string
  condicionesEspeciales: string
  necesitaAcompanamiento: string
  tipoAcompanamiento: string
  nombrePadre: string
  nombreMadre: string
  ocupacionPadre: string
  ocupacionMadre: string
  nivelEducativoPadre: string
  nivelEducativoMadre: string
  telefonoPadre: string
  telefonoMadre: string
  emailPadre: string
  emailMadre: string
  hermanos: string
  situacionFamiliar: string
  personaResponsable: string
  gradoActual: string
  edad: string
  institucionesPrevias: string
  gradosCursados: string
  anioIngreso: string
  informesPedagogicos: string
  dificultadesAprendizaje: string
  fortalezasAcademicas: string
}

const activeTab = ref('datosPersonales')

const estudiantes = ref<Estudiante[]>([
  {
    id: 1,
    nombres: 'Juan Carlos',
    apellidos: 'Pérez García',
    fechaNacimiento: '2015-03-15',
    tipoDocumento: 'ti',
    documento: '123456789',
    genero: 'masculino',
    direccion: 'Calle 123 #45-67',
    telefono: '3001234567',
    email: 'juan.perez@email.com',
    eps: 'Sura',
    tipoSangre: 'O+',
    alergias: 'Polen',
    medicamentos: 'Ninguno',
    diagnosticos: 'TDAH',
    condicionesEspeciales: 'Dificultad de atención',
    necesitaAcompanamiento: 'si',
    tipoAcompanamiento: 'cognitivo',
    nombrePadre: 'Carlos Pérez',
    nombreMadre: 'María García',
    ocupacionPadre: 'Ingeniero',
    ocupacionMadre: 'Docente',
    nivelEducativoPadre: 'universitario',
    nivelEducativoMadre: 'universitario',
    telefonoPadre: '3001234567',
    telefonoMadre: '3007654321',
    emailPadre: 'carlos.perez@email.com',
    emailMadre: 'maria.garcia@email.com',
    hermanos: 'Ana Pérez (8 años)',
    situacionFamiliar: 'casados',
    personaResponsable: 'María García',
    gradoActual: 'tercero',
    edad: '9',
    institucionesPrevias: 'Colegio San José',
    gradosCursados: 'Primero, Segundo',
    anioIngreso: '2023',
    informesPedagogicos: 'Buen rendimiento en matemáticas',
    dificultadesAprendizaje: 'Dificultad en lectura',
    fortalezasAcademicas: 'Excelente en matemáticas y ciencias'
  }
])

const form = reactive<Estudiante>({
  id: 0,
  nombres: '',
  apellidos: '',
  fechaNacimiento: '',
  tipoDocumento: '',
  documento: '',
  genero: '',
  direccion: '',
  telefono: '',
  email: '',
  eps: '',
  tipoSangre: '',
  alergias: '',
  medicamentos: '',
  diagnosticos: '',
  condicionesEspeciales: '',
  necesitaAcompanamiento: '',
  tipoAcompanamiento: '',
  nombrePadre: '',
  nombreMadre: '',
  ocupacionPadre: '',
  ocupacionMadre: '',
  nivelEducativoPadre: '',
  nivelEducativoMadre: '',
  telefonoPadre: '',
  telefonoMadre: '',
  emailPadre: '',
  emailMadre: '',
  hermanos: '',
  situacionFamiliar: '',
  personaResponsable: '',
  gradoActual: '',
  edad: '',
  institucionesPrevias: '',
  gradosCursados: '',
  anioIngreso: '',
  informesPedagogicos: '',
  dificultadesAprendizaje: '',
  fortalezasAcademicas: ''
})

const submitForm = () => {
  if (!form.nombres || !form.apellidos || !form.documento) {
    ElMessage.error('Por favor complete los campos requeridos')
    return
  }
  
  const nuevoEstudiante = { ...form, id: Date.now() }
  estudiantes.value.push(nuevoEstudiante)
  
  ElMessage.success('Estudiante guardado exitosamente')
  resetForm()
}

const resetForm = () => {
  Object.assign(form, {
    id: 0,
    nombres: '',
    apellidos: '',
    fechaNacimiento: '',
    tipoDocumento: '',
    documento: '',
    genero: '',
    direccion: '',
    telefono: '',
    email: '',
    eps: '',
    tipoSangre: '',
    alergias: '',
    medicamentos: '',
    diagnosticos: '',
    condicionesEspeciales: '',
    necesitaAcompanamiento: '',
    tipoAcompanamiento: '',
    nombrePadre: '',
    nombreMadre: '',
    ocupacionPadre: '',
    ocupacionMadre: '',
    nivelEducativoPadre: '',
    nivelEducativoMadre: '',
    telefonoPadre: '',
    telefonoMadre: '',
    emailPadre: '',
    emailMadre: '',
    hermanos: '',
    situacionFamiliar: '',
    personaResponsable: '',
    gradoActual: '',
    edad: '',
    institucionesPrevias: '',
    gradosCursados: '',
    anioIngreso: '',
    informesPedagogicos: '',
    dificultadesAprendizaje: '',
    fortalezasAcademicas: ''
  })
  activeTab.value = 'datosPersonales'
}

const editarEstudiante = (estudiante: Estudiante) => {
  Object.assign(form, estudiante)
}

const eliminarEstudiante = (estudiante: Estudiante) => {
  const index = estudiantes.value.findIndex(e => e.id === estudiante.id)
  if (index > -1) {
    estudiantes.value.splice(index, 1)
    ElMessage.success('Estudiante eliminado exitosamente')
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