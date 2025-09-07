<template>
  <!-- Layout principal -->
  <div class="flex h-full overflow-hidden relative" v-if="data.estudiante">
    <!-- Drawer modo side -->
    <transition name="slide-x">
      <div v-if="drawerOpen && drawerMode === 'side'" class="w-64 border-r p-4 h-full">
        <div class="flex justify-center items-center mb-4 flex-col space-y-2">
          <h6
            class="text-lg font-semibold mb-4 flex items-center gap-2 cursor-pointer"
            @click="$router.push('/admin/piar')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Regresar al listado
          </h6>

          <span class="text-center">
            <strong>
              {{ data?.estudiante.informacion_personal.nombres }}
              {{ data?.estudiante.informacion_personal.apellidos }}
            </strong><br />
            <small>
              Identificación:
              {{ data?.estudiante.identificacion.tipo }}
              {{ data?.estudiante.identificacion.numero }}
            </small><br />
            <small>Edad: {{ data?.estudiante.informacion_personal.edad }} años</small>
          </span>
        </div>

        <el-timeline style="max-width: 600px" class="mb-4">
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :icon="activity.icon"
            :type="activity.type"
            :color="activity.color"
            :size="activity.size"
            :hollow="activity.hollow"
            :timestamp="activity.timestamp"
          >
            {{ activity.content }}
          </el-timeline-item>
        </el-timeline>

        <div class="flex justify-center">
          <el-button type="primary" round :loading="saving" @click="saveAndExit">
            Guardar y salir
          </el-button>
        </div>
      </div>
    </transition>

    <!-- Contenido -->
    <div class="w-full h-full relative">
      <!-- Cabecera / título -->
      <div class="flex justify-between items-center border-b bg-blue-50">
        <div class="p-4 rounded-xl border bg-white m-4 w-full shadow-lg">
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-xl font-semibold text-sky-900">PIAR — Step 1: Información inicial</h2>
            <el-tag type="info" effect="plain">Estudiante: {{ form.infoGeneral.nombres || '-' }}</el-tag>
          </div>

          <!-- Acordeones -->
          <el-collapse v-model="activeNames" accordion>
            <!-- Información General -->
            <el-collapse-item name="infoGeneral">
              <template #title="{ isActive }">
                <div :class="['title-wrapper', { 'is-active': isActive }]">Información General</div>
              </template>

              <el-form :model="form.infoGeneral" label-position="top" :disabled="loading">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <el-form-item label="Nombres">
                    <el-input v-model="form.infoGeneral.nombres" />
                  </el-form-item>
                  <el-form-item label="Apellidos">
                    <el-input v-model="form.infoGeneral.apellidos" />
                  </el-form-item>

                  <el-form-item label="Tipo identificación">
                    <el-select v-model="form.infoGeneral.tipoIdentificacion" placeholder="Seleccione">
                      <el-option label="CC" value="CC" />
                      <el-option label="TI" value="TI" />
                      <el-option label="RC" value="RC" />
                      <el-option label="Otro" value="OTRO" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="No. identificación">
                    <el-input v-model="form.infoGeneral.numeroIdentificacion" />
                  </el-form-item>

                  <el-form-item label="Lugar de nacimiento">
                    <el-input v-model="form.infoGeneral.lugarNacimiento" />
                  </el-form-item>
                  <el-form-item label="Fecha de nacimiento">
                    <el-date-picker
                      v-model="form.infoGeneral.fechaNacimiento"
                      type="date"
                      format="DD/MM/YYYY"
                      value-format="YYYY-MM-DD"
                      class="w-full"
                    />
                  </el-form-item>

                  <el-form-item label="Edad (años)">
                    <el-input v-model="form.infoGeneral.edad" type="number" />
                  </el-form-item>
                  <el-form-item label="Grado actual o al que ingresa">
                    <el-input v-model="form.infoGeneral.grado" placeholder="p.ej., CICLO 22" />
                  </el-form-item>

                  <el-form-item label="Vinculado al sistema educativo (año anterior)">
                    <el-switch v-model="form.infoGeneral.vinculadoSistemaEducativo" />
                  </el-form-item>

                  <el-form-item label="Departamento">
                    <el-input v-model="form.infoGeneral.departamento" />
                  </el-form-item>
                  <el-form-item label="Municipio">
                    <el-input v-model="form.infoGeneral.municipio" />
                  </el-form-item>
                  <el-form-item label="Barrio / Vereda">
                    <el-input v-model="form.infoGeneral.barrio" />
                  </el-form-item>

                  <el-form-item label="Dirección de vivienda" class="md:col-span-2">
                    <el-input v-model="form.infoGeneral.direccion" />
                  </el-form-item>

                  <el-form-item label="Teléfono">
                    <el-input v-model="form.infoGeneral.telefono" />
                  </el-form-item>
                  <el-form-item label="Correo electrónico">
                    <el-input v-model="form.infoGeneral.correo" type="email" />
                  </el-form-item>

                  <el-form-item label="¿Se reconoce como víctima del conflicto armado?">
                    <el-switch v-model="form.infoGeneral.victimaConflicto" />
                  </el-form-item>
                  <el-form-item v-if="form.infoGeneral.victimaConflicto" label="¿Cuenta con registro de víctimas?">
                    <el-switch v-model="form.infoGeneral.registroVictimas" />
                  </el-form-item>

                  <el-form-item label="¿Está en algún Centro de Protección?">
                    <el-switch v-model="form.infoGeneral.centroProteccion" />
                  </el-form-item>

                  <el-form-item label="¿Se reconoce o pertenece a un grupo étnico?">
                    <el-switch v-model="form.infoGeneral.perteneceGrupoEtnico" />
                  </el-form-item>
                  <el-form-item v-if="form.infoGeneral.perteneceGrupoEtnico" label="¿Cuál?">
                    <el-input v-model="form.infoGeneral.grupoEtnicoCual" />
                  </el-form-item>
                </div>
              </el-form>
            </el-collapse-item>

            <!-- Descripción general del estudiante -->
            <el-collapse-item name="descripcionEstudiante">
              <template #title="{ isActive }">
                <div :class="['title-wrapper', { 'is-active': isActive }]">
                  Descripción general del estudiante
                </div>
              </template>

              <el-form :model="form.descripcion" label-position="top" :disabled="loading">
                <div class="grid grid-cols-1 gap-4">
                  <el-form-item label="Capacidades (énfasis en fortalezas)">
                    <el-input v-model="form.descripcion.capacidades" type="textarea" :rows="3" />
                  </el-form-item>
                  <el-form-item label="Gustos e intereses">
                    <el-input v-model="form.descripcion.gustosIntereses" type="textarea" :rows="3" />
                  </el-form-item>
                  <el-form-item label="Expectativas del estudiante">
                    <el-input v-model="form.descripcion.expectativasEstudiante" type="textarea" :rows="3" />
                  </el-form-item>
                  <el-form-item label="Expectativas de la familia">
                    <el-input v-model="form.descripcion.expectativasFamilia" type="textarea" :rows="3" />
                  </el-form-item>

                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <el-form-item label="Redes de apoyo — Fundaciones">
                      <el-input v-model="form.descripcion.redesApoyo.fundaciones" type="textarea" :rows="2" />
                    </el-form-item>
                    <el-form-item label="Redes de apoyo — Equipo interdisciplinario">
                      <el-input v-model="form.descripcion.redesApoyo.equipoInterdisciplinario" type="textarea" :rows="2" />
                    </el-form-item>
                    <el-form-item label="Otras redes de apoyo">
                      <el-input v-model="form.descripcion.redesApoyo.otras" type="textarea" :rows="2" />
                    </el-form-item>
                  </div>
                </div>
              </el-form>
            </el-collapse-item>

            <!-- Entorno Salud -->
            <el-collapse-item name="entornoSalud">
              <template #title="{ isActive }">
                <div :class="['title-wrapper', { 'is-active': isActive }]">Entorno Salud</div>
              </template>

              <el-form :model="form.salud" label-position="top" :disabled="loading">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <el-form-item label="Afiliación al sistema de salud">
                    <el-switch v-model="form.salud.afiliado" />
                  </el-form-item>
                  <el-form-item v-if="form.salud.afiliado" label="Régimen">
                    <el-select v-model="form.salud.regimen" placeholder="Seleccione">
                      <el-option label="Contributivo" value="Contributivo" />
                      <el-option label="Subsidiado" value="Subsidiado" />
                    </el-select>
                  </el-form-item>
                  <el-form-item v-if="form.salud.afiliado" label="EPS / ¿Cuál?">
                    <el-input v-model="form.salud.eps" />
                  </el-form-item>
                  <el-form-item label="Lugar de atención en caso de emergencia">
                    <el-input v-model="form.salud.lugarEmergencia" />
                  </el-form-item>

                  <el-form-item label="¿Cuenta con diagnóstico médico?">
                    <el-switch v-model="form.salud.tieneDiagnostico" />
                  </el-form-item>
                  <el-form-item v-if="form.salud.tieneDiagnostico" label="Diagnóstico (¿Cuál?)" class="md:col-span-2">
                    <el-input v-model="form.salud.diagnosticoCual" type="textarea" :rows="2" />
                  </el-form-item>

                  <el-form-item label="¿Cuenta con atención médica?">
                    <el-switch v-model="form.salud.tieneAtencionMedica" />
                  </el-form-item>
                  <el-form-item v-if="form.salud.tieneAtencionMedica" label="¿Cuál?">
                    <el-input v-model="form.salud.atencionMedicaCual" />
                  </el-form-item>
                  <el-form-item v-if="form.salud.tieneAtencionMedica" label="Frecuencia">
                    <el-input v-model="form.salud.frecuenciaAtencion" />
                  </el-form-item>

                  <el-form-item label="¿Tratamiento/Intervención terapéutica integral?">
                    <el-switch v-model="form.salud.tratamientoIntegral" />
                  </el-form-item>
                  <el-form-item v-if="form.salud.tratamientoIntegral" label="Detalle tratamiento / Frecuencia" class="md:col-span-2">
                    <el-input v-model="form.salud.detalleTratamiento" type="textarea" :rows="2" />
                  </el-form-item>

                  <el-form-item label="¿Consume medicamentos?">
                    <el-switch v-model="form.salud.consumeMedicamentos" />
                  </el-form-item>
                  <el-form-item v-if="form.salud.consumeMedicamentos" label="Medicamentos (¿Cuáles?)">
                    <el-input v-model="form.salud.medicamentosCuales" />
                  </el-form-item>
                  <el-form-item v-if="form.salud.consumeMedicamentos" label="Frecuencia y horario">
                    <el-input v-model="form.salud.medicamentosFrecuencia" />
                  </el-form-item>

                  <el-form-item label="¿Apoyos/ayudas técnicas o tecnológicas?">
                    <el-switch v-model="form.salud.apoyosTecnicos" />
                  </el-form-item>
                  <el-form-item v-if="form.salud.apoyosTecnicos" label="¿Cuáles?" class="md:col-span-2">
                    <el-input v-model="form.salud.apoyosTecnicosCuales" />
                  </el-form-item>
                </div>
              </el-form>
            </el-collapse-item>

            <!-- Entorno Hogar -->
            <el-collapse-item name="entornoHogar">
              <template #title="{ isActive }">
                <div :class="['title-wrapper', { 'is-active': isActive }]">Entorno Hogar</div>
              </template>

              <el-form :model="form.hogar" label-position="top" :disabled="loading">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <el-form-item label="Nombre de la madre">
                    <el-input v-model="form.hogar.madreNombre" />
                  </el-form-item>
                  <el-form-item label="Nombre del padre">
                    <el-input v-model="form.hogar.padreNombre" />
                  </el-form-item>
                  <el-form-item label="Ocupación de la madre">
                    <el-input v-model="form.hogar.ocupacionMadre" />
                  </el-form-item>
                  <el-form-item label="Ocupación del padre">
                    <el-input v-model="form.hogar.ocupacionPadre" />
                  </el-form-item>

                  <el-form-item label="Nivel educativo de la madre">
                    <el-select v-model="form.hogar.nivelMadre" placeholder="Seleccione">
                      <el-option label="Primaria" value="Primaria" />
                      <el-option label="Bachillerato" value="Bachillerato" />
                      <el-option label="Técnico" value="Técnico" />
                      <el-option label="Tecnólogo" value="Tecnólogo" />
                      <el-option label="Universitario" value="Universitario" />
                    </el-select>
                  </el-form-item>

                  <el-form-item label="Nivel educativo del padre">
                    <el-select v-model="form.hogar.nivelPadre" placeholder="Seleccione">
                      <el-option label="Primaria" value="Primaria" />
                      <el-option label="Bachillerato" value="Bachillerato" />
                      <el-option label="Técnico" value="Técnico" />
                      <el-option label="Tecnólogo" value="Tecnólogo" />
                      <el-option label="Universitario" value="Universitario" />
                    </el-select>
                  </el-form-item>

                  <el-form-item label="Nombre del cuidador">
                    <el-input v-model="form.hogar.cuidadorNombre" />
                  </el-form-item>
                  <el-form-item label="Nivel educativo del cuidador">
                    <el-input v-model="form.hogar.cuidadorNivel" />
                  </el-form-item>
                  <el-form-item label="Teléfono cuidador">
                    <el-input v-model="form.hogar.cuidadorTelefono" />
                  </el-form-item>
                  <el-form-item label="Parentesco con el estudiante">
                    <el-input v-model="form.hogar.parentesco" />
                  </el-form-item>
                  <el-form-item label="Correo electrónico cuidador">
                    <el-input v-model="form.hogar.cuidadorCorreo" type="email" />
                  </el-form-item>

                  <el-form-item label="Número de hermanos">
                    <el-input v-model="form.hogar.numHermanos" type="number" />
                  </el-form-item>
                  <el-form-item label="Lugar que ocupa">
                    <el-input v-model="form.hogar.lugarQueOcupa" />
                  </el-form-item>

                  <el-form-item label="¿Quiénes apoyan la crianza? (nombres)">
                    <el-input v-model="form.hogar.quienesApoyanCrianza" type="textarea" :rows="2" />
                  </el-form-item>
                  <el-form-item label="Personas con quien vive / Composición del hogar" class="md:col-span-2">
                    <el-input v-model="form.hogar.personasConQuienVive" type="textarea" :rows="2" />
                  </el-form-item>
                </div>
              </el-form>
            </el-collapse-item>

            <!-- Entorno Educativo -->
            <el-collapse-item name="entornoEducativo">
              <template #title="{ isActive }">
                <div :class="['title-wrapper', { 'is-active': isActive }]">Entorno Educativo</div>
              </template>

              <el-form :model="form.educativo" label-position="top" :disabled="loading">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <el-form-item label="¿Ha estado vinculado en otra institución / fundación / modalidad?">
                    <el-switch v-model="form.educativo.vinculadoOtraInst" />
                  </el-form-item>
                  <el-form-item v-if="form.educativo.vinculadoOtraInst" label="¿Cuáles? / Observaciones" class="md:col-span-2">
                    <el-input v-model="form.educativo.otrasInstituciones" type="textarea" :rows="2" />
                  </el-form-item>

                  <el-form-item label="Último grado cursado">
                    <el-input v-model="form.educativo.ultimoGrado" />
                  </el-form-item>
                  <el-form-item label="Estado">
                    <el-select v-model="form.educativo.estado">
                      <el-option label="Aprobado" value="Aprobado" />
                      <el-option label="Sin terminar" value="Sin terminar" />
                    </el-select>
                  </el-form-item>

                  <el-form-item label="¿Recibe informe pedagógico cualitativo / certificado / PIAR?">
                    <el-switch v-model="form.educativo.recibeInformePedagogico" />
                  </el-form-item>
                  <el-form-item v-if="form.educativo.recibeInformePedagogico" label="¿De qué institución o modalidad proviene el informe?" class="md:col-span-2">
                    <el-input v-model="form.educativo.institucionInforme" />
                  </el-form-item>

                  <el-form-item label="¿Está asistiendo actualmente a programas complementarios?">
                    <el-switch v-model="form.educativo.programasComplementarios" />
                  </el-form-item>
                  <el-form-item v-if="form.educativo.programasComplementarios" label="¿Cuáles?">
                    <el-input v-model="form.educativo.cualesProgramas" />
                  </el-form-item>
                </div>
              </el-form>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>

      <!-- Barra inferior -->
      <div class="grid grid-cols-12 gap-4 p-4 border-t items-center">
        <el-button @click="toggleDrawer"><el-icon><Fold /></el-icon></el-button>

        <div class="col-span-7 md:col-span-9">
          <el-progress :percentage="50" status="success" :stroke-width="16" />
        </div>

        <div class="col-span-4 md:col-span-2 flex justify-end gap-2">
          <el-button :loading="saving" @click="saveDraft">Guardar</el-button>
          <el-button type="primary" :loading="saving" @click="goNext">Siguiente</el-button>
        </div>
      </div>
    </div>
  </div>

  <!-- Loader inicial -->
  <div v-else class="p-6">
    <el-skeleton :rows="6" animated />
  </div>
</template>

<script setup lang="ts">
import { GeneralService } from "@/services/generalService";
import { onMounted, ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage, type TimelineItemProps } from "element-plus";
import { Fold } from "@element-plus/icons-vue";

interface ActivityType extends Partial<TimelineItemProps> {
  content: string;
}

const router = useRouter();

const activities: ActivityType[] = [
  {
    content: "Información del estudiante",
    timestamp: "Datos generales - Entorno salud - Entorno hogar - Entorno educativo",
    size: "large",
    type: "primary",
  },
  { content: "Asignatura de PIAR", timestamp: "", color: "#0bbd87" },
  { content: "PIAR - Evaluación inicial", timestamp: "", size: "large" },
  { content: "Actas de acuerdo", timestamp: "" },
  { content: "Firmas", timestamp: "" },
];

// Ruta actual
const route = useRoute();
const id = route.params.id as string;
const tipo = route.params.tipo as string;

const loading = ref(false);
const saving = ref(false);

const drawerOpen = ref(true);
const drawerMode = ref<"side" | "over">("side");

const activeNames = ref<string | number>("infoGeneral");

const data = ref<any>({});

// ----- FORM PRINCIPAL (Step 1) -----
const form = reactive({
  infoGeneral: {
    nombres: "",
    apellidos: "",
    tipoIdentificacion: "",
    numeroIdentificacion: "",
    lugarNacimiento: "",
    edad: "",
    fechaNacimiento: "",
    grado: "",
    vinculadoSistemaEducativo: false,
    departamento: "",
    municipio: "",
    barrio: "",
    direccion: "",
    telefono: "",
    correo: "",
    victimaConflicto: false,
    registroVictimas: false,
    centroProteccion: false,
    perteneceGrupoEtnico: false,
    grupoEtnicoCual: "",
  },
  descripcion: {
    capacidades: "",
    gustosIntereses: "",
    expectativasEstudiante: "",
    expectativasFamilia: "",
    redesApoyo: {
      fundaciones: "",
      equipoInterdisciplinario: "",
      otras: "",
    },
  },
  salud: {
    afiliado: false,
    regimen: "",
    eps: "",
    lugarEmergencia: "",
    tieneDiagnostico: false,
    diagnosticoCual: "",
    tieneAtencionMedica: false,
    atencionMedicaCual: "",
    frecuenciaAtencion: "",
    tratamientoIntegral: false,
    detalleTratamiento: "",
    consumeMedicamentos: false,
    medicamentosCuales: "",
    medicamentosFrecuencia: "",
    apoyosTecnicos: false,
    apoyosTecnicosCuales: "",
  },
  hogar: {
    madreNombre: "",
    padreNombre: "",
    ocupacionMadre: "",
    ocupacionPadre: "",
    nivelMadre: "",
    nivelPadre: "",
    cuidadorNombre: "",
    cuidadorNivel: "",
    cuidadorTelefono: "",
    parentesco: "",
    cuidadorCorreo: "",
    numHermanos: "",
    lugarQueOcupa: "",
    quienesApoyanCrianza: "",
    personasConQuienVive: "",
  },
  educativo: {
    vinculadoOtraInst: false,
    otrasInstituciones: "",
    ultimoGrado: "",
    estado: "",
    recibeInformePedagogico: false,
    institucionInforme: "",
    programasComplementarios: false,
    cualesProgramas: "",
  },
});

// Cargar datos del estudiante
onMounted(async () => {
  loading.value = true;
  try {
    const parametros = { spName: "fn_consultar_estudiante_por_identificacion", params: [tipo, id] };
    const result = await GeneralService.ejecutarSP("fn_consultar_estudiante_por_identificacion", parametros);

    if (result?.[0]?.fn_consultar_estudiante_por_identificacion) {
      data.value = result[0].fn_consultar_estudiante_por_identificacion;

      // Precarga básica desde la estructura conocida
      const e = data.value.estudiante;
      if (e) {
        form.infoGeneral.nombres = e?.informacion_personal?.nombres ?? "";
        form.infoGeneral.apellidos = e?.informacion_personal?.apellidos ?? "";
        form.infoGeneral.edad = e?.informacion_personal?.edad ?? "";
        form.infoGeneral.tipoIdentificacion = e?.identificacion?.tipo ?? "";
        form.infoGeneral.numeroIdentificacion = e?.identificacion?.numero ?? "";
        form.infoGeneral.departamento = e?.direccion?.departamento ?? "";
        form.infoGeneral.municipio = e?.direccion?.municipio ?? "";
        form.infoGeneral.barrio = e?.direccion?.barrio ?? "";
        form.infoGeneral.direccion = e?.direccion?.direccion ?? "";
        form.infoGeneral.telefono = e?.contacto?.telefono ?? "";
        form.infoGeneral.correo = e?.contacto?.correo ?? "";
        // Ajusta aquí más mapeos si tu API trae otros campos con distinto naming
      }
    }
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
});

// Guardar (borrador)
const saveDraft = async () => {
  saving.value = true;
  try {
    // Llama a tu servicio de guardado. Ejemplo:
    // await generalService.post('/piar/step1', { tipo, id, ...form });
    // Simulación:
    await new Promise((r) => setTimeout(r, 600));
    ElMessage.success("Borrador guardado");
  } catch (e) {
    console.error(e);
    ElMessage.error("Error guardando el borrador");
  } finally {
    saving.value = false;
  }
};

// Guardar y salir (drawer)
const saveAndExit = async () => {
  await saveDraft();
  toggleDrawer();
};

// Siguiente paso
const goNext = async () => {
  await saveDraft();
  router.push({ name: "piar-step-2", params: { id, tipo } });
};

// Alternar drawer
const toggleDrawer = () => {
  drawerOpen.value = !drawerOpen.value;
};
</script>

<style scoped>
/* Animación para modo side */
.slide-x-enter-active,
.slide-x-leave-active {
  transition: all 0.3s ease;
}
.slide-x-enter-from,
.slide-x-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

/* Animación para modo over */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.title-wrapper {
  font-weight: 600;
  color: #0c4a6e; /* sky-900 */
}
.title-wrapper.is-active {
  text-decoration: underline;
}
</style>
