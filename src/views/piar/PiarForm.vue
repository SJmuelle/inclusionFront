<template>
  <!-- Layout principal -->
  <div class="flex h-full overflow-hidden relative" v-if="data.estudiante">
    <!-- Drawer modo side -->
    <transition name="slide-x">
      <div v-if="drawerOpen && drawerMode === 'side'" class="w-80 border-r p-4 h-full">
        <div class="flex justify-center items-center mb-4 flex-col space-y-2">
          <h6 class="text-lg font-semibold mb-4 flex items-center gap-2 cursor-pointer"
            @click="$router.push('/admin/piar')">
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
          <el-timeline-item v-for="(activity, index) in activities" :key="index" :icon="activity.icon"
            :size="activity.size" :hollow="activity.hollow" :timestamp="activity.timestamp"
            :type="(index === paso ? 'primary' : '')" :color="(index === paso ? '#409EFF' : activity.color || '')">
            <span :class="{ 'font-bold text-blue-600': index === paso }">
              {{ activity.content }}
            </span>
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
      <div class="flex justify-between items-center border-b bg-blue-50 ">
        <div class="p-4 rounded-xl border bg-white m-4 w-full shadow-lg h-[78vh] overflow-auto">
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-xl font-semibold text-sky-900">PIAR — Paso {{ paso + 1 }}</h2>
            <el-tag type="info" effect="plain">Estudiante: {{ form.infoGeneral.nombres || '-' }}</el-tag>
          </div>


          <!-- Acordeones paso 1-->
          <el-collapse v-model="activeNames" accordion v-if="paso == 0">
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
                    <el-select v-model="form.infoGeneral.tipoIdentificacion" placeholder="Seleccione" filterable
                      clearable>
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
                    <el-date-picker v-model="form.infoGeneral.fechaNacimiento" type="date" format="DD/MM/YYYY"
                      value-format="YYYY-MM-DD" class="w-full" />
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

                  <!-- ====== SELECTS EN CASCADA: PAÍS → DEPARTAMENTO → MUNICIPIO ====== -->
                  <el-form-item label="País">
                    <el-select v-model="form.infoGeneral.paisId" placeholder="Seleccione" filterable clearable>
                      <el-option v-for="p in paisesOptions" :key="p.pais_id" :label="p.nombre" :value="p.pais_id" />
                    </el-select>
                  </el-form-item>

                  <el-form-item label="Departamento">
                    <el-select v-model="form.infoGeneral.departamentoId" :disabled="!form.infoGeneral.paisId"
                      placeholder="Seleccione" filterable clearable>
                      <el-option v-for="d in departamentosOptions" :key="d.departamento_id" :label="d.nombre"
                        :value="d.departamento_id" />
                    </el-select>
                  </el-form-item>

                  <el-form-item label="Municipio">
                    <el-select v-model="form.infoGeneral.ciudadId" :disabled="!form.infoGeneral.departamentoId"
                      placeholder="Seleccione" filterable clearable>
                      <el-option v-for="c in ciudadesOptions" :key="c.ciudad_id" :label="c.nombre"
                        :value="c.ciudad_id" />
                    </el-select>
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
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <!-- Capacidades como SELECT (desde listado.capacidades) -->
                  <el-form-item label="Capacidades (énfasis en fortalezas)">
                    <el-select v-model="form.descripcion.capacidades" multiple filterable collapse-tags
                      collapse-tags-tooltip placeholder="Selecciona una o varias capacidades">
                      <el-option v-for="opt in capacidadesOptions" :key="String(opt.id)" :label="opt.label"
                        :value="opt.id" />
                    </el-select>
                  </el-form-item>

                  <!-- Gustos e intereses -->
                  <el-form-item label="Gustos e intereses" class="md:col-span-2">
                    <QuillEditor v-model:content="form.descripcion.gustosIntereses" t contentType="html" />
                  </el-form-item>

                  <!-- Expectativas del estudiante -->
                  <el-form-item label="Expectativas del estudiante" class="md:col-span-2">
                    <QuillEditor v-model:content="form.descripcion.expectativasEstudiante" t contentType="html" />
                  </el-form-item>

                  <!-- Expectativas de la familia -->
                  <el-form-item label="Expectativas de la familia" class="md:col-span-2">
                    <QuillEditor v-model:content="form.descripcion.expectativasFamilia" t contentType="html" />
                  </el-form-item>

                  <!-- Otras redes de apoyo -->
                  <el-form-item label="Otras redes de apoyo" class="md:col-span-2">
                    <QuillEditor v-model:content="form.descripcion.redesApoyo.otras" t contentType="html" />
                  </el-form-item>
                </div>
              </el-form>
            </el-collapse-item>

            <!-- Entorno Salud -->
            <el-collapse-item name="entornoSalud">
              <template #title="{ isActive }">
                <div :class="['title-wrapper', { 'is-active': isActive }]">Entorno Salud</div>
              </template>

              <el-form :model="form.salud" label-position="top" :disabled="loading">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <el-form-item label="Afiliación al sistema de salud">
                    <el-switch v-model="form.salud.afiliado" />
                  </el-form-item>

                  <!-- Régimen desde catálogos -->
                  <el-form-item v-if="form.salud.afiliado" label="Régimen">
                    <el-select v-model="form.salud.regimenId" placeholder="Seleccione" filterable clearable>
                      <el-option v-for="r in regimenOptions" :key="r.regimen_id" :label="r.descripcion"
                        :value="r.regimen_id" />
                    </el-select>
                  </el-form-item>

                  <el-form-item v-if="form.salud.afiliado" label="EPS / ¿Cuál?">
                    <el-input v-model="form.salud.eps" />
                  </el-form-item>

                  <el-form-item label="Lugar de atención en caso de emergencia">
                    <el-input v-model="form.salud.lugarEmergencia" />
                  </el-form-item>

                  <el-form-item label="Tipo de discapacidad">
                    <el-input v-model="form.salud.tipoDiscapacidad" />
                  </el-form-item>

                  <el-form-item label="¿Cuenta con diagnóstico médico?">
                    <el-switch v-model="form.salud.tieneDiagnostico" />
                  </el-form-item>
                  <el-form-item v-if="form.salud.tieneDiagnostico" label="Diagnóstico (¿Cuál?)" class="md:col-span-2">
                    <QuillEditor v-model:content="form.salud.diagnosticoCual" t contentType="html" />
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
                  <el-form-item v-if="form.salud.tratamientoIntegral" label="Detalle tratamiento / Frecuencia"
                    class="md:col-span-2">
                    <QuillEditor v-model:content="form.salud.detalleTratamiento" t contentType="html" />
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
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                    <el-select v-model="form.hogar.nivelMadre" placeholder="Seleccione" filterable clearable>
                      <el-option label="Primaria" value="Primaria" />
                      <el-option label="Bachillerato" value="Bachillerato" />
                      <el-option label="Técnico" value="Técnico" />
                      <el-option label="Tecnólogo" value="Tecnólogo" />
                      <el-option label="Universitario" value="Universitario" />
                    </el-select>
                  </el-form-item>

                  <el-form-item label="Nivel educativo del padre">
                    <el-select v-model="form.hogar.nivelPadre" placeholder="Seleccione" filterable clearable>
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

                  <el-form-item label="¿Quiénes apoyan la crianza? (nombres)" class="md:col-span-2">
                    <QuillEditor v-model:content="form.hogar.quienesApoyanCrianza" t contentType="html" />
                  </el-form-item>
                  <el-form-item label="Personas con quien vive / Composición del hogar" class="md:col-span-2">
                    <QuillEditor v-model:content="form.hogar.personasConQuienVive" t contentType="html" />
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
                  <el-form-item v-if="form.educativo.vinculadoOtraInst" label="¿Cuáles? / Observaciones"
                    class="md:col-span-2">
                    <QuillEditor v-model:content="form.educativo.otrasInstituciones" t contentType="html" />
                  </el-form-item>

                  <el-form-item label="Último grado cursado">
                    <el-input v-model="form.educativo.ultimoGrado" />
                  </el-form-item>
                  <el-form-item label="Estado">
                    <el-select v-model="form.educativo.estado" filterable clearable>
                      <el-option label="Aprobado" value="Aprobado" />
                      <el-option label="Sin terminar" value="Sin terminar" />
                    </el-select>
                  </el-form-item>

                  <el-form-item label="¿Recibe informe pedagógico cualitativo / certificado / PIAR?">
                    <el-switch v-model="form.educativo.recibeInformePedagogico" />
                  </el-form-item>
                  <el-form-item v-if="form.educativo.recibeInformePedagogico"
                    label="¿De qué institución o modalidad proviene el informe?" class="md:col-span-2">
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


          <!-- PASO 1 -->
          <div class="w-full h-full relative" v-if="paso === 1">
            <div class="p-4 space-y-6 bg-white">
              <el-form-item label="Seleccione el grado" class="w-full md:w-1/2">
                <el-select v-model="gradoSeleccionado" placeholder="Seleccione" filterable clearable class="w-full"
                  @change="cargarAreas">
                  <el-option v-for="g in areasOptions" :key="g.grado_id" :label="g.nombre_grado" :value="g.grado_id" />
                </el-select>
              </el-form-item>

              <el-table :data="areas" border style="width:100%" class="rounded-lg shadow"
                empty-text="No hay datos disponibles" @selection-change="actualizarAsignaturas">
                <el-table-column type="selection" width="55" />
                <el-table-column prop="area_id" label="ID Área" width="100" />
                <el-table-column prop="nombre_area" label="Nombre Área" />
              </el-table>
              <div class="flex justify-end mt-4">
                <el-button type="primary" @click="paso = 2" :disabled="!asignaturasSeleccionadas.length">
                  Siguiente
                </el-button>
              </div>
            </div>
          </div>

          <!-- PASO 2 -->
          <div class="w-full h-full relative" v-if="paso === 2">
            <div class="p-4 space-y-6">
              <el-tabs v-model="tabActivo" type="card">
                <el-tab-pane v-for="a in asignaturasSeleccionadas" :key="a.area_id" :label="a.nombre_area"
                  :name="a.area_id">
                  <!-- Barreras y Tipo -->
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    <el-form-item label="Escoger Barreras" class="w-full">
                      <el-select v-model="formularios[a.area_id].barreraSeleccionada" placeholder="Buscar..." filterable
                        clearable>
                        <el-option v-for="b in barrerasOptions" :key="b.id" :label="b.nombre" :value="b.id" />
                      </el-select>
                    </el-form-item>

                    <el-form-item label="Escoger Tipo" class="w-full">
                      <el-select v-model="formularios[a.area_id].tipoSeleccionado" placeholder="Buscar..." filterable
                        clearable>
                        <el-option v-for="t in tiposOptions" :key="t.id" :label="t.nombre" :value="t.id" />
                      </el-select>
                    </el-form-item>

                    <div class="mb-4">
                      <el-button type="primary" @click="agregarBarrera(a.area_id)">Agregar</el-button>
                    </div>
                  </div>

                  <!-- Tabla barreras -->
                  <el-table :data="formularios[a.area_id].barreras" border style="width: 100%">
                    <el-table-column label="Acciones" width="100">
                      <template #default="scope">
                        <el-button type="danger" size="small"
                          @click="eliminarBarrera(a.area_id, scope.$index)">Eliminar</el-button>
                      </template>
                    </el-table-column>
                    <el-table-column prop="barrera" label="Barrera" />
                    <el-table-column prop="tipo" label="Tipo" />
                  </el-table>

                  <!-- Apoyo -->
                  <div class="space-y-4 mt-4">
                    <h3 class="font-semibold text-sky-900">Apoyo</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <el-form-item label="Docente">
                        <el-switch v-model="formularios[a.area_id].apoyoDocente" active-text="Sí" inactive-text="No" />
                      </el-form-item>
                      <el-form-item label="Acudiente">
                        <el-switch v-model="formularios[a.area_id].apoyoAcudiente" active-text="Sí"
                          inactive-text="No" />
                      </el-form-item>
                    </div>
                  </div>

                  <!-- Seguimiento -->
                  <div class="space-y-2 mt-4">
                    <h3 class="font-semibold text-sky-900">Seguimiento</h3>
                    <QuillEditor v-model:content="formularios[a.area_id].seguimiento" contentType="html" />
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>

          <div class="w-full h-full relative" v-if="paso == 3">
            <div class="w-full max-w-[900px] mx-auto font-sans text-[13px] leading-snug text-slate-800">
              <!-- Título -->
              <div class="w-full border border-slate-700 bg-slate-700 text-white text-center uppercase font-bold py-2">
                ACTA DE ACUERDO
              </div>

              <!-- Datos superiores -->
              <table class="w-full table-fixed border-collapse border border-slate-700">
                <tbody>
                  <tr>
                    <th class="w-2/5 text-left font-semibold bg-slate-100 border border-slate-700 p-2">
                      Fecha y Lugar de Diligenciamiento
                    </th>
                    <td class="w-3/5 border border-slate-700 p-2">
                      {{ acta.fechaDiligenciamiento }}<span v-if="form?.infoGeneral?.municipio"> — {{
                        form.infoGeneral.municipio
                      }}</span>
                    </td>
                  </tr>
                  <tr>
                    <th class="text-left font-semibold bg-slate-100 border border-slate-700 p-2">
                      Nombre y rol de la Persona que diligencia
                    </th>
                    <td class="border border-slate-700 p-2">
                      {{ acta.personaDiligencia }} <span class="text-slate-500">{{ acta.rolDiligencia }}</span>
                    </td>
                  </tr>
                  <tr>
                    <th class="text-left font-semibold bg-slate-100 border border-slate-700 p-2">
                      Institución Educativa
                    </th>
                    <td class="border border-slate-700 p-2">
                      {{ acta.institucion }}
                    </td>
                  </tr>
                  <tr>
                    <th class="text-left font-semibold bg-slate-100 border border-slate-700 p-2">
                      Sede
                    </th>
                    <td class="border border-slate-700 p-2">
                      {{ acta.sede }}
                    </td>
                  </tr>
                </tbody>
              </table>

              <!-- Identificación del estudiante -->
              <table class="w-full table-fixed border-collapse border border-slate-700 mt-3">
                <tbody>
                  <tr>
                    <th class="w-[14%] text-left bg-slate-100 border border-slate-700 p-2">Nombre</th>
                    <td class="w-[46%] font-semibold border border-slate-700 p-2">
                      {{ form.infoGeneral.nombres }} {{ form.infoGeneral.apellidos }}
                    </td>
                    <th class="w-[10%] text-left bg-slate-100 border border-slate-700 p-2">Edad</th>
                    <td class="w-[10%] font-semibold border border-slate-700 p-2">
                      {{ form.infoGeneral.edad }}
                    </td>
                    <th class="w-[10%] text-left bg-slate-100 border border-slate-700 p-2">Grado</th>
                    <td class="w-[10%] font-semibold border border-slate-700 p-2">
                      {{ form.infoGeneral.grado }}
                    </td>
                  </tr>
                </tbody>
              </table>

              <!-- Texto introductorio -->
              <div class="mt-4 space-y-3 text-justify">
                <p>
                  Según el Decreto 1421 de 2017 la educación inclusiva es un proceso permanente que reconoce, valora y
                  responde
                  a la diversidad de características, intereses, posibilidades y expectativas de los estudiantes para
                  promover su
                  desarrollo, aprendizaje y participación, en un ambiente de aprendizaje común, sin discriminación o
                  exclusión.
                </p>
                <p>
                  La inclusión solo es posible cuando se unen los esfuerzos del colegio, el estudiante, docentes,
                  directivos
                  docentes y familias. De ahí la importancia de formalizar con las firmas, la presente Acta de Acuerdo.
                </p>
                <p>
                  <span class="font-semibold">El Establecimiento Educativo</span> ha realizado la valoración pedagógica
                  y definido
                  los
                  ajustes razonables que facilitarán al estudiante su proceso educativo.
                </p>
                <p>
                  <span class="font-semibold">La Familia se compromete</span> a cumplir y firmar los compromisos
                  señalados en el
                  PIAR y en las actas de acuerdo,
                  para fortalecer los procesos escolares del estudiante y en particular a:
                </p>
              </div>

              <!-- Caja de compromisos -->
              <div class="mt-3">
                <div class="text-slate-700">
                  Incluya aquí los compromisos específicos para implementar en el aula que requieran ampliación o
                  detalle adicional al incluido en el PIAR.
                </div>
                <div class=" p-3 mt-2 min-h-[110px] pb-32">
                  <!-- Si viene de Quill/HTML -->
                  <QuillEditor v-model:content="acta.compromisosEspecificos" t contentType="html" />


                </div>
              </div>


            </div>
          </div>
        </div>
      </div>

      <!-- Barra inferior -->
      <div class="grid grid-cols-12 gap-4 p-4 border-t items-center">
        <el-button @click="toggleDrawer">
          <el-icon>
            <Fold />
          </el-icon>
        </el-button>

        <el-progress :percentage="10 + (paso) * 22.5" color="primary" show-text class="col-span-11">
          <el-button text @click="paso = paso == 0 ? paso : paso - 1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="#79BBFF" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-8 text-blue-700 hover:bg-blue-700 hover:text-white rounded-full p-1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </el-button>
          <el-button text class="hover:bg-blue-500" @click="paso = paso == 4 ? paso : paso + 1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="#79BBFF" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-8 text-blue-700 hover:bg-blue-700 hover:text-white rounded-full p-1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </el-button>
        </el-progress>
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
import { onMounted, ref, reactive, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { TimelineItemProps } from "element-plus";
import { Fold } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";

/* Quill */
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const paso = ref<number>(0)

// Toolbar compacto + formatos permitidos
const quillModules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['blockquote'],
    [{ header: [2, 3, false] }],
    [{ align: [] }],
    ['clean']
  ]
}

const quillFormats = [
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet', 'blockquote',
  'header', 'align'
]

// (Opcional) placeholder común
const quillPlaceholder = 'Escribe aquí…'
interface ActivityType extends Partial<TimelineItemProps> {
  content: string;
}

/** ===== Tipos para catálogos ===== */
interface Ciudad { ciudad_id: number; nombre: string; }
interface Departamento { departamento_id: number; nombre: string; ciudades: Ciudad[]; }
interface Pais { pais_id: number; nombre: string; departamentos: Departamento[]; }
interface Regimen { regimen_id: number; descripcion: string; }
interface Listado {
  paises: Pais[];
  regimenes: Regimen[];
  capacidades: any[]; // puede venir vacío o como strings/objetos
}

interface OpcionCapacidad { id: number | string; label: string; }
interface Asignatura {
  area_id: number | string
  nombre_area: string
}

// Arreglo reactivo de asignaturas seleccionadas
const asignaturasSeleccionadas = ref<Asignatura[]>([])
const tabActivo = ref(null);
interface Barrera {
  barrera: string;
  tipo: string;
}

interface FormularioAsignatura {
  barreraSeleccionada: number | null;
  tipoSeleccionado: number | null;
  barreras: Barrera[];
  apoyoDocente: boolean;
  apoyoAcudiente: boolean;
  seguimiento: string;
}
const formularios: Record<string, FormularioAsignatura> = reactive({});
const router = useRouter();

const activities: ActivityType[] = [
  {
    content: "Información del estudiante",
    timestamp: "Datos generales - Entorno salud - Entorno hogar - Entorno educativo",
    size: "large",
    type: "primary",
  },
  { content: "Ajustes razonables", timestamp: "", color: "#0bbd87" },
  { content: "Ajustes Razonables (Anexo 2)", timestamp: "", size: "large" },
  { content: "Actas de Acuerdo (Anexo 3)", timestamp: "" },
  { content: "Evaluación final", timestamp: "" },
];

const listado = ref<Listado | null>(null);
const mesesES = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE']
const formatFecha = (d = new Date()) =>
  `${String(d.getDate()).padStart(2, '0')}-${mesesES[d.getMonth()]}-${d.getFullYear()}`

const acta = reactive<any>({
  fechaDiligenciamiento: formatFecha(),   // p.ej. 01-MAYO-2025
  personaDiligencia: '',                  // p.ej. "KARINA CASTELLANOS"
  rolDiligencia: '',                      // p.ej. "DOCENTE DOMICILIARIA"
  institucion: '',                        // p.ej. "IED CIUDADELA ESTUDIANTIL"
  sede: '',                               // p.ej. "SEDE A"
  compromisosEspecificos: '',             // si usas Quill, enlaza aquí
  compromisosTexto: '',                   // fallback si no hay HTML
  firmaAcudienteNombre: '',
  firmaInstitucionNombre: ''
})
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
const barrerasOptions = ref([
  { id: 1, nombre: "Motivacionales" },
  { id: 2, nombre: "Académicas" },
]);

const tiposOptions = ref([
  { id: 1, nombre: "Temporal" },
  { id: 2, nombre: "Permanente" },
]);
/** ===== FORM PRINCIPAL (Step 1) ===== */
const form = reactive<any>({
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

    // Campos de ubicación (texto)
    departamento: "",
    municipio: "",
    barrio: "",
    direccion: "",
    telefono: "",
    correo: "",

    // IDs seleccionados
    paisId: null as number | null,
    departamentoId: null as number | null,
    ciudadId: null as number | null,

    victimaConflicto: false,
    registroVictimas: false,
    centroProteccion: false,
    perteneceGrupoEtnico: false,
    grupoEtnicoCual: "",
  },
  descripcion: {
    // ahora capacidades es array de IDs/valores seleccionados
    capacidades: [] as Array<number | string>,
    gustosIntereses: "",
    expectativasEstudiante: "",
    expectativasFamilia: "",
    redesApoyo: {
      otras: "",
    },
  },
  salud: {
    afiliado: false,
    regimen: "",
    regimenId: null as number | null,
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
    tipoDiscapacidad: ""
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
  piar: {
    asignatura: "Matematicas",
    barreraSeleccionada: null,
    tipoSeleccionado: null,
    barreras: [] as Array<{ barrera: string; tipo: string }>,
    apoyoDocente: false,
    apoyoAcudiente: false,
    seguimiento: "",
  },
});

/** ===== Helpers ===== */
const calcEdad = (yyyyMmDd?: string) => {
  if (!yyyyMmDd) return "";
  const hoy = new Date();
  const [y, m, d] = yyyyMmDd.split("-").map(Number);
  const nac = new Date(y, (m ?? 1) - 1, d ?? 1);
  let edad = hoy.getFullYear() - nac.getFullYear();
  const antesDeCumple = hoy.getMonth() < nac.getMonth() || (hoy.getMonth() === nac.getMonth() && hoy.getDate() < nac.getDate());
  if (antesDeCumple) edad--;
  return String(edad < 0 ? "" : edad);
};

const sinAcentos = (s: string) =>
  (s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

const normalizeCapacidades = (arr?: any[] | null): OpcionCapacidad[] => {
  if (!arr || !Array.isArray(arr)) return [];
  return arr.map((x: any) => {
    if (typeof x === 'string') return { id: x, label: x };
    if (typeof x === 'number') return { id: x, label: String(x) };
    if ('capacidad_id' in x && ('descripcion' in x || 'nombre' in x)) {
      return { id: x.capacidad_id, label: x.descripcion ?? x.nombre };
    }
    if ('id' in x && ('descripcion' in x || 'nombre' in x || 'label' in x)) {
      return { id: x.id, label: x.descripcion ?? x.nombre ?? x.label };
    }
    // fallback genérico
    const label = x?.descripcion ?? x?.nombre ?? JSON.stringify(x);
    return { id: label, label };
  });
};

/** ===== Options computados (catálogos) ===== */
const paisesOptions = computed<Pais[]>(() => listado.value?.paises ?? []);
const departamentosOptions = computed<Departamento[]>(() => {
  if (!form.infoGeneral.paisId) return [];
  const p = paisesOptions.value.find(x => x.pais_id === form.infoGeneral.paisId);
  return p?.departamentos ?? [];
});
const ciudadesOptions = computed<Ciudad[]>(() => {
  if (!form.infoGeneral.departamentoId) return [];
  const d = departamentosOptions.value.find(x => x.departamento_id === form.infoGeneral.departamentoId);
  return d?.ciudades ?? [];
});
const regimenOptions = computed<Regimen[]>(() => listado.value?.regimenes ?? []);
const capacidadesOptions = computed<OpcionCapacidad[]>(() => normalizeCapacidades(listado.value?.capacidades));

/** ===== Watchers: sincronizar texto con IDs ===== */
watch(() => form.infoGeneral.paisId, () => {
  form.infoGeneral.departamentoId = null;
  form.infoGeneral.ciudadId = null;
  form.infoGeneral.departamento = "";
  form.infoGeneral.municipio = "";
});

watch(() => form.infoGeneral.departamentoId, (nuevo) => {
  form.infoGeneral.ciudadId = null;
  const d = departamentosOptions.value.find(x => x.departamento_id === nuevo);
  form.infoGeneral.departamento = d?.nombre ?? "";
  form.infoGeneral.municipio = "";
});

watch(() => form.infoGeneral.ciudadId, (nuevo) => {
  const c = ciudadesOptions.value.find(x => x.ciudad_id === nuevo);
  form.infoGeneral.municipio = c?.nombre ?? "";
});

watch(() => form.salud.regimenId, (nuevo) => {
  const r = regimenOptions.value.find(x => x.regimen_id === nuevo);
  form.salud.regimen = r?.descripcion ?? "";
});

/** ===== Mapper principal: de payload → form ===== */
const mapIncomingToForm = (payload: any) => {
  if (!payload) return;

  const est = payload.estudiante ?? {};
  const iden = est.identificacion ?? {};
  const info = est.informacion_personal ?? {};
  const ubi = est.ubicacion ?? {};
  const cont = est.contacto ?? {};
  const sit = est.situacion_especial ?? {};
  const prot = sit.proteccion_especial ?? {};
  const conf = sit.conflicto_armado ?? {};
  const grp = sit.grupo_etnico ?? {};

  form.infoGeneral.nombres = info.nombres ?? "";
  form.infoGeneral.apellidos = info.apellidos ?? "";
  form.infoGeneral.tipoIdentificacion = iden.tipo ?? "";
  form.infoGeneral.numeroIdentificacion = iden.numero ?? "";
  form.infoGeneral.lugarNacimiento = ubi.ciudad ?? "";
  form.infoGeneral.fechaNacimiento = info.fecha_nacimiento ?? "";
  form.infoGeneral.edad = (info.edad ?? "").toString() || calcEdad(info.fecha_nacimiento);
  form.infoGeneral.grado = payload?.educacion?.historial_educativo?.ultimo_grado_cursado?.grado ?? "";

  // ubicación/contacto en TEXTO (IDs se resuelven con catálogos)
  form.infoGeneral.departamento = ubi.departamento ?? "";
  form.infoGeneral.municipio = ubi.ciudad ?? "";
  form.infoGeneral.barrio = ubi.barrio ?? "";
  form.infoGeneral.direccion = ubi.direccion ?? "";
  form.infoGeneral.telefono = cont.telefono_movil ?? cont.telefono_fijo ?? "";
  form.infoGeneral.correo = cont.correo_electronico ?? "";

  // situación especial
  form.infoGeneral.centroProteccion = !!prot.tiene_proteccion;
  form.infoGeneral.victimaConflicto = !!conf.victima_conflicto;
  form.infoGeneral.registroVictimas = !!conf.registro_victima;
  form.infoGeneral.perteneceGrupoEtnico = !!grp.pertenece;
  form.infoGeneral.grupoEtnicoCual = grp.nombre_grupo ?? "";

  form.infoGeneral.vinculadoSistemaEducativo =
    !!payload?.educacion?.historial_educativo?.ha_estado_matriculado;

  // ======= Descripción =======
  // capacidades: intentar mapear si la API trae algo
  const capsApi = est.capacidades ?? payload?.capacidades ?? null;
  if (Array.isArray(capsApi)) {
    form.descripcion.capacidades = capsApi.map((it: any) => {
      if (typeof it === 'number' || typeof it === 'string') return it;
      if ('capacidad_id' in it) return it.capacidad_id;
      if ('id' in it) return it.id;
      return it?.descripcion ?? it?.nombre ?? JSON.stringify(it);
    });
  } else {
    form.descripcion.capacidades = [];
  }

  form.descripcion.gustosIntereses = est.gustos_intereses ?? "";
  form.descripcion.expectativasEstudiante = est.expectativas?.del_estudiante ?? "";
  form.descripcion.expectativasFamilia = est.expectativas?.de_la_familia ?? "";
  form.descripcion.redesApoyo.otras = est.redes_apoyo ?? "";

  // ======= Salud =======
  const sal = payload.salud ?? {};
  const afi = sal.afiliacion_salud ?? {};
  const dx = sal.diagnostico ?? {};
  const trat = sal.tratamientos ?? {};
  const meds = trat.medicamentos;

  form.salud.afiliado = !!afi.esta_afiliado;
  form.salud.regimen = afi.tipo_regimen ?? ""; // regimenId se resuelve luego
  form.salud.eps = afi.entidad_prestadora ?? "";
  form.salud.lugarEmergencia = afi.lugar_atencion_emergencias ?? "";
  form.salud.tieneDiagnostico = !!dx.tiene_diagnostico;
  form.salud.diagnosticoCual = dx.descripcion_diagnostico ?? "";

  const hayTerapias = Array.isArray(trat.terapias) && trat.terapias.length > 0;
  form.salud.tieneAtencionMedica = hayTerapias;
  form.salud.atencionMedicaCual = hayTerapias ? trat.terapias.map((t: any) => t.tipo_terapia).join(", ") : "";
  form.salud.frecuenciaAtencion = hayTerapias ? trat.terapias.map((t: any) => t.frecuencia_sesiones).join(", ") : "";
  form.salud.tratamientoIntegral = !!trat.tratamiento_especial?.requiere_tratamiento;
  form.salud.detalleTratamiento = trat.tratamiento_especial?.descripcion_tratamiento ?? "";
  form.salud.consumeMedicamentos = !!meds;
  form.salud.medicamentosCuales = Array.isArray(meds) ? meds.join(", ") : (typeof meds === "string" ? meds : "");
  form.salud.medicamentosFrecuencia = trat.tratamiento_especial?.frecuencia_sesiones ?? "";
  form.salud.tipoDiscapacidad = trat.tratamiento_especial?.frecuencia_sesiones ?? "";

  // ======= familia → hogar =======
  const fam = payload.familia ?? {};
  const madre = fam.madre ?? {};
  const padre = fam.padre ?? {};
  const cuida = fam.cuidador_principal ?? {};
  const infoC = cuida.informacion_contacto ?? {};
  const herm = fam.hermanos ?? {};
  const entFam = fam.entorno_familiar ?? {};

  form.hogar.madreNombre = madre.nombre_completo ?? "";
  form.hogar.padreNombre = padre.nombre_completo ?? "";
  form.hogar.ocupacionMadre = madre.ocupacion ?? "";
  form.hogar.ocupacionPadre = padre.ocupacion ?? "";
  form.hogar.nivelMadre = madre.nivel_educativo ?? "";
  form.hogar.nivelPadre = padre.nivel_educativo ?? "";
  form.hogar.cuidadorNombre = cuida.nombre_completo ?? "";
  form.hogar.cuidadorNivel = cuida.nivel_educativo ?? "";
  form.hogar.cuidadorTelefono = infoC.telefono ?? "";
  form.hogar.parentesco = cuida.parentesco ?? "";
  form.hogar.cuidadorCorreo = infoC.correo_electronico ?? "";
  form.hogar.numHermanos = String(herm.cantidad_hermanos ?? "");
  form.hogar.lugarQueOcupa = String(herm.posicion_familiar ?? "");
  form.hogar.quienesApoyanCrianza = entFam.personas_apoyan_crianza ?? "";
  form.hogar.personasConQuienVive = entFam.personas_con_vive ?? "";

  // ======= educación =======
  const edu = payload.educacion ?? {};
  const hist = edu.historial_educativo ?? {};
  const prog = edu.programas_especiales ?? {};

  form.educativo.vinculadoOtraInst = !!hist.ha_estado_matriculado;
  form.educativo.otrasInstituciones = hist.instituciones_previas ?? "";
  form.educativo.ultimoGrado = hist.ultimo_grado_cursado?.grado ?? "";
  form.educativo.estado = hist.ultimo_grado_cursado?.estado_aprobacion ?? "";
  form.educativo.recibeInformePedagogico = !!prog.recibe_informe_especial;
  form.educativo.institucionInforme = prog.institucion_informe ?? "";
  const participa = prog.participa_programas ?? {};
  form.educativo.programasComplementarios = !!participa.asiste_programas;
  form.educativo.cualesProgramas = participa.detalle_programas ?? "";
};

/** ===== Preselecciones desde textos + catálogos ===== */
const preseleccionarUbicacionDesdeTexto = () => {
  if (!listado.value) return;

  const depTexto = sinAcentos(form.infoGeneral.departamento);
  const ciuTexto = sinAcentos(form.infoGeneral.municipio);

  // por ciudad
  if (ciuTexto) {
    for (const p of listado.value.paises) {
      for (const d of p.departamentos ?? []) {
        const hit = (d.ciudades ?? []).find(c => sinAcentos(c.nombre) === ciuTexto);
        if (hit) {
          form.infoGeneral.paisId = p.pais_id;
          form.infoGeneral.departamentoId = d.departamento_id;
          form.infoGeneral.ciudadId = hit.ciudad_id;
          form.infoGeneral.departamento = d.nombre;
          form.infoGeneral.municipio = hit.nombre;
          return;
        }
      }
    }
  }

  // por departamento
  if (depTexto) {
    for (const p of listado.value.paises) {
      const d = (p.departamentos ?? []).find(x => sinAcentos(x.nombre) === depTexto);
      if (d) {
        form.infoGeneral.paisId = p.pais_id;
        form.infoGeneral.departamentoId = d.departamento_id;
        form.infoGeneral.ciudadId = null;
        form.infoGeneral.departamento = d.nombre;
        return;
      }
    }
  }
};

const preseleccionarRegimenDesdeTexto = () => {
  if (!listado.value) return;
  const regTexto = sinAcentos(form.salud.regimen);
  if (!regTexto) return;
  const r = listado.value.regimenes.find(x => sinAcentos(x.descripcion) === regTexto);
  if (r) form.salud.regimenId = r.regimen_id;
};

// listado de áreas que trae el SP
const areasOptions = ref<any[]>([]);

// en el form agrega el campo
form.piar.areaSeleccionada = null;
/** ===== Cargar datos del estudiante y catálogos ===== */
onMounted(async () => {
  loading.value = true;
  try {
    const parametros = { spName: "fn_consultar_estudiante_por_identificacion", params: [tipo, id] };
    const result = await GeneralService.ejecutarSP("fn_consultar_estudiante_por_identificacion", parametros);
    const incoming = result?.[0]?.fn_consultar_estudiante_por_identificacion ?? null;
    if (incoming) {
      data.value = incoming;
      mapIncomingToForm(incoming);
    }
  } catch (err) {
    console.error(err);
    ElMessage.error("No fue posible cargar los datos del estudiante");
  } finally {
    loading.value = false;
  }

  loading.value = true;
  try {
    const parametros = { spName: "fn_listar_catalogos", params: [] };
    const result = await GeneralService.ejecutarSP("fn_listar_catalogos", parametros);
    const incoming = result?.[0]?.fn_listar_catalogos ?? null;
    if (incoming) {
      listado.value = incoming as Listado;
      // Preseleccionar IDs según textos
      preseleccionarUbicacionDesdeTexto();
      preseleccionarRegimenDesdeTexto();
    }
  } catch (err) {
    console.error(err);
    ElMessage.error("No fue posible cargar los catálogos");
  } finally {
    loading.value = false;
  }
  loading.value = true;
  try {
    const parametros = { spName: "fn_listar_grados_jsonb", params: [] };
    const result = await GeneralService.ejecutarSP("fn_listar_grados_jsonb", parametros);
    const incoming = result?.[0]?.fn_listar_grados_jsonb ?? null;
    console.log("ÁREAS:", incoming); // 👈 Verifica qué devuelve el SP
    if (incoming) {
      areasOptions.value = incoming;
    }
  } catch (err) {
    console.error(err);
    ElMessage.error("No fue posible cargar los fn_listar_areas_por_grado");
  } finally {
    loading.value = false;
  }
});

/** ===== Guardar (borrador) ===== */
const saveDraft = async () => {
  saving.value = true;
  try {
    // Ejemplo:
    // await GeneralService.post('/piar/step1', { tipo, id, ...form });
    await new Promise((r) => setTimeout(r, 600));
    ElMessage.success("Borrador guardado");
  } catch (e) {
    console.error(e);
    ElMessage.error("Error guardando el borrador");
  } finally {
    saving.value = false;
  }
};


const gradoSeleccionado = ref(null)
const areas = ref([])

const cargarAreas = async () => {
  debugger
  if (!gradoSeleccionado.value) {
    areas.value = []
    return
  }

  // Prepara los parámetros para el SP
  const parametros = {
    spName: 'fn_listar_areas_por_grado',
    params: [gradoSeleccionado.value] // el SP recibe el ID del grado
  }

  try {
    const result = await GeneralService.ejecutarSP('fn_listar_areas_por_grado', parametros)
    // Según tu backend, el resultado suele venir en la primera posición del arreglo
    areas.value = result?.[0]?.fn_listar_areas_por_grado ?? []
    console.log(areas.value);
  } catch (err) {
    console.error('Error ejecutando el SP:', err)
    areas.value = []
  }
}

const saveAndExit = async () => {
  await saveDraft();
  toggleDrawer();
};

const goNext = async () => {
  await saveDraft();
  router.push({ name: "piar-step-2", params: { id, tipo } });
};

const toggleDrawer = () => {
  drawerOpen.value = !drawerOpen.value;
};

// Agrega una barrera al formulario de la asignatura activa
const agregarBarrera = (areaId:number | string) => {
  const form = formularios[areaId];
  if (form.barreraSeleccionada && form.tipoSeleccionado) {
    const barreraNombre = barrerasOptions.value.find(b => b.id === form.barreraSeleccionada)?.nombre;
    const tipoNombre = tiposOptions.value.find(t => t.id === form.tipoSeleccionado)?.nombre;
    let dt:Barrera={ barrera: barreraNombre, tipo: tipoNombre }
    form.barreras.push(dt);
    form.barreraSeleccionada = null;
    form.tipoSeleccionado = null;
  }
};

// Elimina una barrera por índice del formulario de la asignatura activa
const eliminarBarrera = (areaId:number | string, index:number) => {
  formularios[areaId].barreras.splice(index, 1);
};

// Actualiza asignaturas seleccionadas y crea formularios por cada una
const actualizarAsignaturas = (seleccion:any) => {
  asignaturasSeleccionadas.value = seleccion;
  seleccion.forEach((a:Asignatura) => {
    if (!formularios[a.area_id]) {
      formularios[a.area_id] = {
        barreraSeleccionada: null,
        tipoSeleccionado: null,
        barreras: [],
        apoyoDocente: false,
        apoyoAcudiente: false,
        seguimiento: ""
      };
    }
  });
  if (seleccion.length) tabActivo.value = seleccion[0].area_id;
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
  color: #0c4a6e;
  /* sky-900 */
}

.title-wrapper.is-active {
  text-decoration: underline;
}

/* Apariencia más “Element Plus” y compacta */
.piar-quill .ql-toolbar.ql-snow {
  border: 1px solid #dcdfe6;
  /* el borde de ElInput */
  border-bottom: none;
  border-radius: 8px 8px 0 0;
  background: #fafafa;
  padding: 6px;
  /* más compacto */
  overflow-x: auto;
  /* scroll horizontal si no cabe */
  white-space: nowrap;

  /* evita saltos a segunda línea */
}


.piar-quill .ql-container.ql-snow {
  border: 1px solid #dcdfe6;
  border-radius: 0 0 8px 8px;
}

.piar-quill .ql-editor {
  min-height: 110px;
  /* ajusta a tu gusto (100–140px) */
  max-height: 230px;
  /* evita que crezca infinito */
  overflow-y: auto;
  padding: 10px 12px;
}

/* Botones y pickers más chiquitos */
.piar-quill .ql-toolbar .ql-formats {
  margin-right: 6px;
}

.piar-quill .ql-toolbar button,
.piar-quill .ql-toolbar .ql-picker {
  height: 26px;
}

/* Estado disabled similar a Element Plus */
.is-disabled .piar-quill .ql-container {
  background: #f5f7fa;
}
</style>
