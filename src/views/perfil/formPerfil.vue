<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-4xl mx-auto">
      <!-- Header del formulario -->
      <div class="bg-white rounded-lg shadow-sm border border-blue-200 p-6 mb-6">
        <h1 class="text-2xl font-bold text-blue-800 mb-2">Gestión de Información del Estudiante</h1>
        <p class="text-gray-600">Complete la información personal y académica del estudiante</p>
      </div>

      <!-- Formulario -->
      <el-form 
        ref="formRef" 
        :model="form" 
        :rules="rules" 
        label-width="200px"
        class="bg-white rounded-lg shadow-sm border border-blue-200 p-6"
      >
        <!-- Datos Personales -->
        <div class="mb-8">
          <h2 class="text-xl font-semibold text-blue-800 mb-4 border-b border-blue-200 pb-2">
            Datos Personales
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <el-form-item label="Nombres" prop="nombres">
              <el-input 
                v-model="form.nombres" 
                placeholder="Ingrese los nombres"
                class="custom-input"
              />
            </el-form-item>
            
            <el-form-item label="Apellidos" prop="apellidos">
              <el-input 
                v-model="form.apellidos" 
                placeholder="Ingrese los apellidos"
                class="custom-input"
              />
            </el-form-item>
            
            <el-form-item label="Fecha de Nacimiento" prop="fechaNacimiento">
              <el-date-picker 
                v-model="form.fechaNacimiento" 
                type="date" 
                placeholder="Seleccione fecha"
                class="custom-input w-full"
              />
            </el-form-item>
            
            <el-form-item label="Género" prop="genero">
              <el-select 
                v-model="form.genero" 
                placeholder="Seleccione género"
                class="custom-input w-full"
              >
                <el-option label="Masculino" value="masculino" />
                <el-option label="Femenino" value="femenino" />
                <el-option label="Otro" value="otro" />
              </el-select>
            </el-form-item>
            
            <el-form-item label="Tipo de Documento" prop="tipoDocumento">
              <el-select 
                v-model="form.tipoDocumento" 
                placeholder="Seleccione tipo"
                class="custom-input w-full"
              >
                <el-option label="Tarjeta de Identidad" value="TI" />
                <el-option label="Cédula de Ciudadanía" value="CC" />
                <el-option label="Registro Civil" value="RC" />
              </el-select>
            </el-form-item>
            
            <el-form-item label="Número de Documento" prop="numeroDocumento">
              <el-input 
                v-model="form.numeroDocumento" 
                placeholder="Ingrese número"
                class="custom-input"
              />
            </el-form-item>
          </div>
        </div>

        <!-- Información de Salud -->
        <div class="mb-8">
          <h2 class="text-xl font-semibold text-blue-800 mb-4 border-b border-blue-200 pb-2">
            Información de Salud
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <el-form-item label="EPS" prop="eps">
              <el-input 
                v-model="form.eps" 
                placeholder="Ingrese EPS"
                class="custom-input"
              />
            </el-form-item>
            
            <el-form-item label="Grupo Sanguíneo" prop="grupoSanguineo">
              <el-select 
                v-model="form.grupoSanguineo" 
                placeholder="Seleccione grupo"
                class="custom-input w-full"
              >
                <el-option label="A+" value="A+" />
                <el-option label="A-" value="A-" />
                <el-option label="B+" value="B+" />
                <el-option label="B-" value="B-" />
                <el-option label="AB+" value="AB+" />
                <el-option label="AB-" value="AB-" />
                <el-option label="O+" value="O+" />
                <el-option label="O-" value="O-" />
              </el-select>
            </el-form-item>
            
            <el-form-item label="Alergias" prop="alergias">
              <el-input 
                v-model="form.alergias" 
                type="textarea" 
                :rows="3"
                placeholder="Describa las alergias si las hay"
                class="custom-input"
              />
            </el-form-item>
            
            <el-form-item label="Condiciones Especiales" prop="condicionesEspeciales">
              <el-input 
                v-model="form.condicionesEspeciales" 
                type="textarea" 
                :rows="3"
                placeholder="Describa condiciones especiales"
                class="custom-input"
              />
            </el-form-item>
          </div>
        </div>

        <!-- Entorno Familiar -->
        <div class="mb-8">
          <h2 class="text-xl font-semibold text-blue-800 mb-4 border-b border-blue-200 pb-2">
            Entorno Familiar
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <el-form-item label="Nombre del Padre" prop="nombrePadre">
              <el-input 
                v-model="form.nombrePadre" 
                placeholder="Ingrese nombre del padre"
                class="custom-input"
              />
            </el-form-item>
            
            <el-form-item label="Nombre de la Madre" prop="nombreMadre">
              <el-input 
                v-model="form.nombreMadre" 
                placeholder="Ingrese nombre de la madre"
                class="custom-input"
              />
            </el-form-item>
            
            <el-form-item label="Teléfono Padre" prop="telefonoPadre">
              <el-input 
                v-model="form.telefonoPadre" 
                placeholder="Ingrese teléfono"
                class="custom-input"
              />
            </el-form-item>
            
            <el-form-item label="Teléfono Madre" prop="telefonoMadre">
              <el-input 
                v-model="form.telefonoMadre" 
                placeholder="Ingrese teléfono"
                class="custom-input"
              />
            </el-form-item>
            
            <el-form-item label="Dirección" prop="direccion">
              <el-input 
                v-model="form.direccion" 
                type="textarea" 
                :rows="3"
                placeholder="Ingrese dirección completa"
                class="custom-input"
              />
            </el-form-item>
            
            <el-form-item label="Estrato Socioeconómico" prop="estrato">
              <el-select 
                v-model="form.estrato" 
                placeholder="Seleccione estrato"
                class="custom-input w-full"
              >
                <el-option label="1" value="1" />
                <el-option label="2" value="2" />
                <el-option label="3" value="3" />
                <el-option label="4" value="4" />
                <el-option label="5" value="5" />
                <el-option label="6" value="6" />
              </el-select>
            </el-form-item>
          </div>
        </div>

        <!-- Trayectoria Educativa -->
        <div class="mb-8">
          <h2 class="text-xl font-semibold text-blue-800 mb-4 border-b border-blue-200 pb-2">
            Trayectoria Educativa
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <el-form-item label="Institución Anterior" prop="institucionAnterior">
              <el-input 
                v-model="form.institucionAnterior" 
                placeholder="Ingrese institución anterior"
                class="custom-input"
              />
            </el-form-item>
            
            <el-form-item label="Último Grado Cursado" prop="ultimoGrado">
              <el-select 
                v-model="form.ultimoGrado" 
                placeholder="Seleccione grado"
                class="custom-input w-full"
              >
                <el-option label="Preescolar" value="preescolar" />
                <el-option label="Primero" value="1" />
                <el-option label="Segundo" value="2" />
                <el-option label="Tercero" value="3" />
                <el-option label="Cuarto" value="4" />
                <el-option label="Quinto" value="5" />
                <el-option label="Sexto" value="6" />
                <el-option label="Séptimo" value="7" />
                <el-option label="Octavo" value="8" />
                <el-option label="Noveno" value="9" />
                <el-option label="Décimo" value="10" />
                <el-option label="Undécimo" value="11" />
              </el-select>
            </el-form-item>
            
            <el-form-item label="Año de Retiro" prop="anioRetiro">
              <el-date-picker 
                v-model="form.anioRetiro" 
                type="year" 
                placeholder="Seleccione año"
                class="custom-input w-full"
              />
            </el-form-item>
            
            <el-form-item label="Motivo de Retiro" prop="motivoRetiro">
              <el-select 
                v-model="form.motivoRetiro" 
                placeholder="Seleccione motivo"
                class="custom-input w-full"
              >
                <el-option label="Cambio de residencia" value="cambio_residencia" />
                <el-option label="Problemas económicos" value="problemas_economicos" />
                <el-option label="Problemas de salud" value="problemas_salud" />
                <el-option label="Otros" value="otros" />
              </el-select>
            </el-form-item>
            
            <el-form-item label="Observaciones" prop="observaciones" class="md:col-span-2">
              <el-input 
                v-model="form.observaciones" 
                type="textarea" 
                :rows="4"
                placeholder="Observaciones adicionales"
                class="custom-input"
              />
            </el-form-item>
          </div>
        </div>

        <!-- Botones de acción -->
        <div class="flex justify-end space-x-4 pt-6 border-t border-blue-200">
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
            Guardar Estudiante
          </el-button>
        </div>
      </el-form>

      <!-- Tabla de estudiantes -->
      <div class="mt-8 bg-white rounded-lg shadow-sm border border-blue-200">
        <div class="p-6 border-b border-blue-200">
          <h2 class="text-xl font-semibold text-blue-800">Estudiantes Registrados</h2>
        </div>
        <div class="p-6">
          <el-table 
            :data="estudiantes" 
            style="width: 100%"
            class="custom-table"
          >
            <el-table-column prop="nombres" label="Nombres" />
            <el-table-column prop="apellidos" label="Apellidos" />
            <el-table-column prop="numeroDocumento" label="Documento" />
            <el-table-column prop="genero" label="Género" />
            <el-table-column prop="ultimoGrado" label="Último Grado" />
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

interface Estudiante {
  id: number
  nombres: string
  apellidos: string
  fechaNacimiento: string
  genero: string
  tipoDocumento: string
  numeroDocumento: string
  eps: string
  grupoSanguineo: string
  alergias: string
  condicionesEspeciales: string
  nombrePadre: string
  nombreMadre: string
  telefonoPadre: string
  telefonoMadre: string
  direccion: string
  estrato: string
  institucionAnterior: string
  ultimoGrado: string
  anioRetiro: string
  motivoRetiro: string
  observaciones: string
}

const formRef = ref()
const estudiantes = ref<Estudiante[]>([])

const form = reactive<Estudiante>({
  id: 0,
  nombres: '',
  apellidos: '',
  fechaNacimiento: '',
  genero: '',
  tipoDocumento: '',
  numeroDocumento: '',
  eps: '',
  grupoSanguineo: '',
  alergias: '',
  condicionesEspeciales: '',
  nombrePadre: '',
  nombreMadre: '',
  telefonoPadre: '',
  telefonoMadre: '',
  direccion: '',
  estrato: '',
  institucionAnterior: '',
  ultimoGrado: '',
  anioRetiro: '',
  motivoRetiro: '',
  observaciones: ''
})

const rules = {
  nombres: [{ required: true, message: 'Los nombres son requeridos', trigger: 'blur' }],
  apellidos: [{ required: true, message: 'Los apellidos son requeridos', trigger: 'blur' }],
  fechaNacimiento: [{ required: true, message: 'La fecha de nacimiento es requerida', trigger: 'change' }],
  genero: [{ required: true, message: 'El género es requerido', trigger: 'change' }],
  numeroDocumento: [{ required: true, message: 'El número de documento es requerido', trigger: 'blur' }]
}

const submitForm = async () => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    
    const nuevoEstudiante = { ...form, id: Date.now() }
    estudiantes.value.push(nuevoEstudiante)
    
    ElMessage.success('Estudiante guardado exitosamente')
    resetForm()
  } catch (error) {
    ElMessage.error('Por favor complete todos los campos requeridos')
  }
}

const resetForm = () => {
  if (formRef.value) {
    formRef.value.resetFields()
  }
  Object.assign(form, {
    id: 0,
    nombres: '',
    apellidos: '',
    fechaNacimiento: '',
    genero: '',
    tipoDocumento: '',
    numeroDocumento: '',
    eps: '',
    grupoSanguineo: '',
    alergias: '',
    condicionesEspeciales: '',
    nombrePadre: '',
    nombreMadre: '',
    telefonoPadre: '',
    telefonoMadre: '',
    direccion: '',
    estrato: '',
    institucionAnterior: '',
    ultimoGrado: '',
    anioRetiro: '',
    motivoRetiro: '',
    observaciones: ''
  })
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