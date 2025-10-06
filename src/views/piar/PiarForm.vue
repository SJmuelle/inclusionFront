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
            <h2 class="text-xl font-semibold text-sky-900"> {{ activities[paso].content }}</h2>
            <el-tag type="info" effect="plain">Estudiante: {{ form.infoGeneral.nombres || '-' }} {{
              form.infoGeneral.apellidos || '-' }}</el-tag>
          </div>


          <!-- Acordeones paso 0-->
          <el-collapse v-model="activeNames" accordion v-if="paso == 0">
            <!-- Información General -->
            <el-collapse-item name="infoGeneral">
              <template #title="{ isActive }">
                <div :class="['title-wrapper', { 'is-active': isActive }]">Información General</div>
              </template>

              <el-form :model="form.infoGeneral" label-position="top" :disabled="loading">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <el-form-item label="Nombres">
                    <el-input v-model="form.infoGeneral.nombres" :disabled="true" />
                  </el-form-item>
                  <el-form-item label="Apellidos">
                    <el-input v-model="form.infoGeneral.apellidos" :disabled="true" />
                  </el-form-item>

                  <el-form-item label="Tipo identificación">
                    <el-select v-model="form.infoGeneral.tipoIdentificacion" placeholder="Seleccione" filterable
                      clearable :disabled="true">
                      <el-option label="CC" value="CC" />
                      <el-option label="TI" value="TI" />
                      <el-option label="RC" value="RC" />
                      <el-option label="Otro" value="OTRO" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="No. identificación">
                    <el-input v-model="form.infoGeneral.numeroIdentificacion" :disabled="true" />
                  </el-form-item>
                  <el-form-item label="País de nacimiento">
                    <el-select v-model="form.infoGeneral.paisId" placeholder="Seleccione" filterable clearable>
                      <el-option v-for="p in paisesOptions" :key="p.pais_id" :label="p.nombre" :value="p.pais_id" />
                    </el-select>
                  </el-form-item>

                  <el-form-item label="Lugar  de nacimiento">
                    <el-select v-model="form.infoGeneral.lugarNacimiento" :disabled="!form.infoGeneral.paisId"
                      placeholder="Seleccione" filterable clearable>
                      <el-option v-for="d in departamentosOptions" :key="d.departamento_id" :label="d.nombre"
                        :value="d.nombre" />
                    </el-select>
                  </el-form-item>

                  <el-form-item label="Fecha de nacimiento">
                    <el-date-picker v-model="form.infoGeneral.fechaNacimiento" type="date" format="DD/MM/YYYY"
                      value-format="YYYY-MM-DD" class="w-full" />
                  </el-form-item>

                  <el-form-item label="Edad (años)">
                    <el-input v-model="form.infoGeneral.edad" type="number" />
                  </el-form-item>
                  <el-form-item label="Grado actual o al que ingresa" class="md:col-span-2">
                    <el-input v-model="form.infoGeneral.grado" placeholder="p.ej., CICLO 22" />
                  </el-form-item>

                  <el-form-item label="Vinculado al sistema educativo (año anterior)" class="md:col-span-2">
                    <el-switch v-model="form.infoGeneral.vinculadoSistemaEducativo" />
                  </el-form-item>

                  <!-- ====== SELECTS EN CASCADA: PAÍS → DEPARTAMENTO → MUNICIPIO ====== -->
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

                  <el-form-item label="Barrio / Vereda" class="md:col-span-2">
                    <el-input v-model="form.infoGeneral.barrio" />
                  </el-form-item>

                  <el-form-item label="Dirección de vivienda" class="md:col-span-2">
                    <el-input v-model="form.infoGeneral.direccion" />
                  </el-form-item>

                  <el-form-item label="Teléfono">
                    <el-input v-model="form.infoGeneral.telefono" />
                  </el-form-item>
                  <el-form-item label="Celular">
                    <el-input v-model="form.infoGeneral.telefono_movil" />
                  </el-form-item>
                  <el-form-item label="Correo electrónico" class="md:col-span-2">
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
                  <el-form-item v-if="form.infoGeneral.centroProteccion" label="Lugar protección" class="md:col-span-2">
                    <el-input v-model="form.infoGeneral.lugarProteccion" type="text" />
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
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <el-form-item v-if="form.salud.consumeMedicamentos" label="Frecuencia">
                    <el-input v-model="form.salud.medicamentosFrecuencia" />
                  </el-form-item>
                  <el-form-item v-if="form.salud.consumeMedicamentos" label="Horario">
                    <el-input v-model="form.salud.medicamentosHorarios" />
                  </el-form-item>

                  <el-form-item label="¿Apoyos/ayudas técnicas o tecnológicas?">
                    <el-switch v-model="form.salud.apoyosTecnicos" />
                  </el-form-item>
                  <el-form-item v-if="form.salud.apoyosTecnicos" label="¿Cuáles?">
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

                <div class="relative mb-2">
                  <div
                    class="-translate-x-1/2 top-1 absolute bg-white border border-pink-700 flex flex-col justify-center left-10 p-1 rounded">
                    <img src="/src/assets/mama.png" alt="Logo" class=" w-10 h-10 rounded-full" />
                    <span class="text-pink-700 font-semibold">Madre</span>
                  </div>
                  <div
                    class="div ml-10 pl-10 card border-l-4 border border-pink-700 rounded-lg shadow bg-pink-100 grid grid-cols-1 md:grid-cols-4 gap-3">
                    <el-form-item label="Nombre" class=" font-semibold">
                      <el-input v-model="form.hogar.madreNombre" />
                    </el-form-item>
                    <el-form-item label="Ocupación ">
                      <el-input v-model="form.hogar.ocupacionMadre" />
                    </el-form-item>
                    <el-form-item label="Nivel educativo ">
                      <el-select v-model="form.hogar.nivelMadre" placeholder="Seleccione" filterable clearable>
                        <el-option label="Primaria" value="Primaria" />
                        <el-option label="Bachillerato" value="Bachillerato" />
                        <el-option label="Técnico" value="Técnico" />
                        <el-option label="Tecnólogo" value="Tecnólogo" />
                        <el-option label="Universitario" value="Universitario" />
                      </el-select>
                    </el-form-item>
                    <el-form-item label="Fallecido">
                      <el-switch v-model="form.hogar.fallecioMadre" active-text="Sí" inactive-text="No" />
                    </el-form-item>
                  </div>
                </div>
                <div class="relative mb-2">
                  <div
                    class="-translate-x-1/2 top-1 absolute bg-white border border-blue-700 flex flex-col justify-center left-10 p-1 rounded">
                    <img src="/src/assets/papa.png" alt="Logo" class=" w-10 h-10 rounded-full" />
                    <span class="text-blue-700 font-semibold">Padre</span>
                  </div>
                  <div
                    class="div ml-10 pl-10 card border-l-4 border border-blue-700 rounded-lg shadow bg-blue-100 grid grid-cols-1 md:grid-cols-4 gap-3">
                    <el-form-item label="Nombre  " class=" font-semibold">
                      <el-input v-model="form.hogar.padreNombre" />
                    </el-form-item>

                    <el-form-item label="Ocupación ">
                      <el-input v-model="form.hogar.ocupacionPadre" />
                    </el-form-item>

                    <el-form-item label="Nivel educativo">
                      <el-select v-model="form.hogar.nivelPadre" placeholder="Seleccione" filterable clearable>
                        <el-option label="Primaria" value="Primaria" />
                        <el-option label="Bachillerato" value="Bachillerato" />
                        <el-option label="Técnico" value="Técnico" />
                        <el-option label="Tecnólogo" value="Tecnólogo" />
                        <el-option label="Universitario" value="Universitario" />
                      </el-select>
                    </el-form-item>

                    <el-form-item label="Fallecido">
                      <el-switch v-model="form.hogar.fallecioPadre" active-text="Sí" inactive-text="No" />
                    </el-form-item>
                  </div>
                </div>


                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                    <el-input v-model="form.educativo.institucionInforme" :disabled="true" />
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
          <div class="w-full  relative" v-if="paso === 1">
            <div class="p-4 space-y-6 ">
              <el-form :model="form2" label-position="top" :disabled="loading" class="bg-white grid md:grid-cols-2">
                <el-form-item label="¿El estudiante requiere ajuste?">
                  <el-switch v-model="form2.requiere_ajuste" active-text="Sí" inactive-text="No" />
                </el-form-item>

                <el-form-item v-if="!form2.requiere_ajuste" label="¿Trabaja con DUA?">
                  <el-switch v-model="form2.trabaja_duba" active-text="Sí" inactive-text="No" />
                </el-form-item>

                <el-form-item v-if="!form2.requiere_ajuste" label="Descripción" class="md:col-span-2">
                  <QuillEditor v-model:content="form2.justificacion" t contentType="html" />
                </el-form-item>
              </el-form>

              <el-table v-if="form2.requiere_ajuste" :data="areas" style="width:100%" class=" rounded-lg shadow border"
                empty-text="No hay datos disponibles" @selection-change="actualizarAsignaturas">
                <el-table-column type="selection" width="55" />
                <el-table-column prop="area_id" label="ID Área" width="100" />
                <el-table-column prop="nombre_area" label="Nombre Área" />
              </el-table>

            </div>
          </div>

          <!-- PASO 2 -->
          <div class="w-full h-full relative" v-if="paso == 2">

            <div class="space-y-4" v-if="subpaso == 0">
              <el-collapse>
                <el-collapse-item v-for="area in informacion_barrera" :key="area.area_id" :title="area.nombre_area">
                  <div class="p-3 bg-gray-50 rounded-lg">
                    <div v-for="(detalle, index) in area.detalle_json" :key="index"
                      class="mb-6 border border-gray-200 rounded-lg overflow-hidden">
                      <!-- 🔹 Encabezado del período -->
                      <div class="flex justify-between items-center bg-blue-100 p-3 rounded-t-lg">
                        <span class="font-semibold text-blue-700">
                          Periodo: {{ detalle.periodo ?? '1' }}
                        </span>
                        <el-button type="primary" size="small"
                          class="!bg-green-600 hover:!bg-green-900 text-white font-semibold hover:shadow-md"
                          @click="agregarBarreras(area, detalle.periodo ?? '1')">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
                            stroke="currentColor" class="size-4 text-white">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>

                          Agregar barreras para este período
                        </el-button>
                      </div>

                      <!-- 🔹 Tabla de barreras -->
                      <el-table :data="barrerasUnicas" border stripe class="w-full text-sm">
                        <!-- 🔹 Columna editar -->
                        <el-table-column label="" width="80" align="center">
                          <template #default="{ row }">
                            <svg @click="editarDetalle(row)" xmlns="http://www.w3.org/2000/svg"
                              class="w-5 h-5 cursor-pointer text-blue-600 hover:text-blue-800" fill="none"
                              viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" title="Editar detalle">
                              <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15.232 5.232l3.536 3.536M9 11l6.232-6.232a2.5 2.5 0 113.536 3.536L12.536 14.536a2.5 2.5 0 01-1.768.732H9v-2.268a2.5 2.5 0 01.732-1.768z" />
                            </svg>
                          </template>
                        </el-table-column>

                        <!-- 🔹 ID -->
                        <el-table-column prop="detalle_id" label="ID Detalle" width="120" align="center" />

                        <!-- 🔹 Descripción -->
                        <el-table-column prop="descripcion_subcategoria" label="Descripción de la barrera">
                          <template #default="{ row }">
                            <p class="text-gray-700">{{ row.descripcion_subcategoria }}</p>
                          </template>
                        </el-table-column>
                      </el-table>


                    </div>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>

            <div class="p-4 space-y-6" v-if="subpaso == 1">

              <el-breadcrumb separator="/">
                <el-breadcrumb-item>Asignatura: {{ formularios[area_formulario].nombreAsignatura }}
                </el-breadcrumb-item>
                <el-breadcrumb-item>
                  Perido: {{ formularios[area_formulario].periodo }}
                </el-breadcrumb-item>
              </el-breadcrumb>

              <!-- Fila de selects encadenados -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <el-form-item label-position="top" label="Categoría de barrera" class="w-full">
                  <el-select v-model="formularios[area_formulario].categoriaId" placeholder="Seleccione categoría"
                    filterable clearable @change="(val: any) => onChangeCategoria(area_formulario, val)">
                    <el-option v-for="c in categoriasBarreras" :key="c.categoria_id" :label="c.nombre"
                      :value="c.categoria_id" />
                  </el-select>
                </el-form-item>

                <el-form-item label-position="top" label="Categoría de barrera" class="w-full md:col-span-2">
                  <el-input disabled v-model="formularios[area_formulario].descripcionCategoria" style="width: 100%"
                    :rows="2" type="textarea" placeholder="" />
                </el-form-item>

                <!-- Subcategorías (MULTI) -->
                <el-form-item label-position="top" label="Subcategorías" class="w-full md:col-span-3">
                  <el-select v-model="formularios[area_formulario].subcategoriaIds"
                    placeholder="Seleccione subcategorías" :disabled="!formularios[area_formulario].categoriaId"
                    multiple collapse-tags filterable clearable>
                    <el-option v-for="sc in formularios[area_formulario].subcategoriasOptions" :key="sc.subcategoria_id"
                      :label="sc.descripcion" :value="sc.subcategoria_id" />
                  </el-select>
                </el-form-item>

                <!-- Tipo de ajuste (simple) -->
                <el-form-item label-position="top" label="Tipo de ajuste" class="w-full">
                  <el-select v-model="formularios[area_formulario].tipoAjusteId" placeholder="Seleccione tipo"
                    filterable clearable @change="(val: any) => onChangeTipoAjuste(area_formulario, val)">
                    <el-option v-for="t in tiposAjustes" :key="t.tipo_ajuste_id" :label="t.nombre"
                      :value="t.tipo_ajuste_id">
                    </el-option>
                  </el-select>
                </el-form-item>

                <!-- Subtipos (MULTI) -->
                <el-form-item label-position="top" label="Subtipos" class="w-full col-span-2">
                  <el-select v-model="formularios[area_formulario].subtipoAjusteIds" placeholder="Seleccione subtipos"
                    :disabled="!formularios[area_formulario].tipoAjusteId" multiple collapse-tags filterable clearable>
                    <el-option v-for="st in formularios[area_formulario].subtiposOptions" :key="st.subtipo_ajuste_id"
                      :label="st.nombre" :value="st.subtipo_ajuste_id" />
                  </el-select>
                </el-form-item>

                <!-- Apoyo requerido (simple) -->
                <el-form-item label-position="top" label="Apoyo requerido" class="w-full">
                  <el-select v-model="formularios[area_formulario].apoyoId" placeholder="Seleccione apoyo" filterable
                    clearable @change="(val: any) => onChangeApoyo(area_formulario, val)">
                    <el-option v-for="ap in apoyosRequeridos" :key="ap.apoyo_id" :label="ap.nombre"
                      :value="ap.apoyo_id" />
                  </el-select>
                </el-form-item>

                <el-form-item label-position="top" label="Apoyo requerido" class="w-full md:col-span-2">
                  <el-input disabled v-model="formularios[area_formulario].apoyoRequeridoDescripcion"
                    style="width: 100%" :rows="2" type="textarea" placeholder="" />
                </el-form-item>

                <!-- Subapoyos (MULTI) -->
                <el-form-item label-position="top" label="Subapoyos" class="w-full md:col-span-3">
                  <el-select v-model="formularios[area_formulario].subapoyoIds" placeholder="Seleccione subapoyos"
                    :disabled="!formularios[area_formulario].apoyoId" multiple collapse-tags filterable clearable>
                    <el-option v-for="sap in formularios[area_formulario].subapoyosOptions" :key="sap.subapoyo_id"
                      :label="sap.descripcion" :value="sap.subapoyo_id" />
                  </el-select>
                </el-form-item>

                <div class="mb-4">
                  <el-button type="primary" @click="agregarBarrera(area_formulario)">
                    Agregar barrera
                  </el-button>
                </div>
              </div>

              <!-- Tabla de barreras agregadas -->


              <el-table :data="barrerasAgregadas" style="width: 100%" :row-key="(_: any, index: any) => index">


                <!-- Columnas principales -->
                <el-table-column prop="categoria" label="Categoría" />
                <el-table-column prop="tipoAjuste" label="Tipo de ajuste" />
                <el-table-column prop="apoyo" label="Apoyo" />

                <!-- Botón eliminar -->
                <el-table-column label="Acciones" width="120" align="center">
                  <template #default="{ $index }">
                    <el-button type="danger" size="small">
                      Eliminar
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>



              <!-- Seguimiento -->
              <div class="space-y-2 mt-4">
                <h3 class="font-semibold text-sky-900">Seguimiento</h3>
                <QuillEditor v-model:content="formularios[area_formulario].seguimiento" contentType="html" />
              </div>


              <el-form-item label-position="top" label="DBA" class="w-full md:col-span-2">
                <el-input v-model="formularios[area_formulario].dba" style="width: 100%" :rows="2" type="textarea"
                  placeholder="" />
              </el-form-item>

              <!-- boton guardar areas -->
              <div class="flex justify-end mt-4">
                <el-button type="success" :loading="saving" @click="guardarAsignatura(area_formulario)">
                  Guardar Asignatura
                </el-button>
              </div>


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
          <el-button text @click="cambiarPaso(false)" class="hover:bg-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="#79BBFF" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-8 text-blue-700 hover:bg-blue-700 hover:text-white rounded-full p-1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </el-button>
          <el-button text class="hover:bg-blue-500" @click="cambiarPaso(true)">
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
import { sw } from "element-plus/es/locales.mjs";
const barrerasAgregadas = ref<any[]>([]);
const area_formulario = ref(0);
const periodo = ref(null);

const paso = ref<number>(0)
const subpaso = ref<number>(0)
interface Barrera {
  detalle_id: number
  descripcion_subcategoria: string
}

interface Detalle {
  periodo: number | null
  nombreAsignatura: string
  barreras: Barrera[]
}

interface Area {
  area_id: number
  nombre_area: string
  detalle_json: Detalle[]
}

// 👉 Respuesta completa del backend
const informacion_barrera = ref<Area[]>([])
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
const tabActivo = ref<number | string>(0);
// ===== Tipos =====
interface OpcionBasica {
  id: number;
  nombre: string;
}

interface OpcionCategoria {
  categoria_id: number;
  nombre: string;
  descripcion: string
}

interface OpcionSubCategoria {
  categoria_id: number;
  nombre: string;
  descripcion: string;
  subcategoria_id: number;
}

interface OpcionTipo {
  tipo_ajuste_id: number;
  nombre: string;
}

interface OpcionSubTipo {
  tipo_ajuste_id: number;
  nombre: string;
  subtipo_ajuste_id: number;
  tipo_ajuste_nombre: string;
}

interface OpcionApoyoRequerido {
  apoyo_id: number;
  descripcion: string;
  nombre: string;
}
interface OpcionSubApoyo {
  apoyo_id: number;
  descripcion: string;
  nombre: string;
  apoyo_nombre: string;
  subapoyo_id: number;
}


interface BarreraFila {
  barrera: string;
  tipo: string;
}

interface FormularioAsignatura {
  periodo: String | null;
  nombreAsignatura: string;
  dba: string;
  // padres (simple)
  categoriaId: number | null;
  tipoAjusteId: number | null;
  apoyoId: number | null;

  // hijos (MULTI)
  subcategoriaIds: number[];     // <= multi
  subtipoAjusteIds: number[];    // <= multi
  subapoyoIds: number[];         // <= multi

  subcategoriaIdsCompletos: number[];     // <= multi
  subtipoAjusteIdsCompletos: number[];    // <= multi
  subapoyoIdsCompletos: number[];         // <= multi

  // opciones dependientes por tab
  subcategoriasOptions: OpcionSubCategoria[];
  subtiposOptions: OpcionSubTipo[];
  subapoyosOptions: OpcionSubApoyo[];

  descripcionCategoria: string,
  apoyoRequeridoDescripcion: string,

  // lo que ya usabas
  barreraSeleccionada: number | null;
  tipoSeleccionado: number | null;
  barreras: BarreraFila[];
  apoyoDocente: boolean;
  apoyoAcudiente: boolean;
  seguimiento: string;
}

// ===== Estado NUEVO/ajustado =====
const categoriasBarreras = ref<OpcionCategoria[]>([]);
const tiposAjustes = ref<OpcionTipo[]>([]);
const apoyosRequeridos = ref<OpcionApoyoRequerido[]>([]);

// Por asignatura:
const formularios: Record<string | number, FormularioAsignatura> = reactive({});

// Factory
const crearFormularioAsignatura = (): any => ({
  // padres
  periodo: null,
  nombreAsignatura: "",
  // padres simples
  categoriaId: null,
  tipoAjusteId: null,
  apoyoId: null,

  // hijos multi
  subcategoriaIds: [],
  subtipoAjusteIds: [],
  subapoyoIds: [],

  // hijos multi
  subcategoriaIdsCompletos: [],
  subtipoAjusteIdsCompletos: [],
  subapoyoIdsCompletos: [],

  // opciones dependientes
  subcategoriasOptions: [],
  subtiposOptions: [],
  subapoyosOptions: [],

  // existentes
  barreraSeleccionada: null,
  tipoSeleccionado: null,
  barreras: [],
  apoyoDocente: false,
  apoyoAcudiente: false,
  seguimiento: ""
});



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
const idPiar = ref<string>("")
const barrerasOptions = ref<OpcionCategoria[]>([]);
const idEstudiante = ref<string>("")
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
    telefono_movil: "",
    correo: "",

    // IDs seleccionados
    paisId: null as number | null,
    departamentoId: null as number | null,
    ciudadId: null as number | null,

    victimaConflicto: false,
    registroVictimas: false,
    centroProteccion: false,
    lugarProteccion: "",
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
/** ===== FORM PRINCIPAL (Step 2) ===== */
const form2 = reactive<any>({
  requiere_ajuste: true,
  trabaja_duba: true,
  justificacion: "",
  areas: [],
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
  form.infoGeneral.telefono = cont.telefono_fijo ?? "";
  form.infoGeneral.telefono_movil = cont.telefono_movil ?? "";
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
  // form.salud.medicamentosFrecuencia = trat.tratamiento_especial?.frecuencia_sesiones ?? "";
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
      idPiar.value = data.value.planes_piar[0].informacion_piar.identificador_piar
      mapIncomingToForm(incoming);
      // try {
      //   const parametros = { spName: "fn_avance_informes", params: [ idPiar.value] };
      //   const result = await GeneralService.ejecutarSP("fn_avance_informes", parametros);
      //   const incoming = result?.[0]?.fn_avance_informes ?? null;
      //   if (incoming) {
      //   console.log(incoming)

      //   }
      // } catch (err) {
      //   console.error(err);
      //   ElMessage.error("No fue posible cargar los catálogos");
      // } finally {
      //   loading.value = false;
      // }
    }
  } catch (err) {
    console.error(err);
    ElMessage.error("No fue posible cargar los datos del estudiante");
  } finally {
    loading.value = false;
  }

  loading.value = true;
  try {
    const parametros = { spName: "fn_obtener_estudiante_id", params: [tipo, id] };
    const result = await GeneralService.ejecutarSP("fn_obtener_estudiante_id", parametros);
    const incoming = result?.[0]?.fn_obtener_estudiante_id ?? null;
    if (incoming) {
      idEstudiante.value = incoming.estudiante_id;

    }
  } catch (err) {
    console.error(err);
    ElMessage.error("No fue posible cargar los catálogos");
  } finally {
    loading.value = false;
  }
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
    const param = { spName: "fn_consultar_grado_estudiante", params: [tipo, id] };
    const res = await GeneralService.ejecutarSP("fn_consultar_grado_estudiante", param);
    const inco = res?.[0]?.fn_consultar_grado_estudiante ?? null;

    if (inco) {
      gradoSeleccionado.value = inco;
      cargarAreas();
    }

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

  acta.institucion = localStorage.getItem("colegio")
  const usuarioStr = localStorage.getItem("usuario");
  const usuario = usuarioStr ? JSON.parse(usuarioStr) : null;
  acta.personaDiligencia = usuario?.nombre ?? "";
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




// Actualiza asignaturas seleccionadas y crea formularios por cada una
// Actualiza las asignaturas seleccionadas desde la tabla (type="selection")
const actualizarAsignaturas = (seleccion: Asignatura[]): void => {
  // 1) Actualiza el array reactivo con la selección de la tabla
  asignaturasSeleccionadas.value = seleccion ?? [];

  // 2) Asegura que cada asignatura tenga su formulario creado
  // asignaturasSeleccionadas.value.forEach((a) => {
  //   if (!formularios[area_formulario.value]) {
  //     formularios[area_formulario.value] = crearFormularioAsignatura();
  //   }
  // })
  // 3) Mantener el tab activo:
  //    - Si no hay selección, limpiar tab
  //    - Si el tab activo ya no está en la selección, moverlo al primero
  if (!asignaturasSeleccionadas.value.length) {
    tabActivo.value = 0;
  } else {
    const sigueActivo = asignaturasSeleccionadas.value.some(s => s.area_id === tabActivo.value);
    if (!sigueActivo) {
      tabActivo.value = asignaturasSeleccionadas.value[0].area_id;
    }
  }

  // 4) (Opcional) Limpiar formularios de asignaturas que fueron deseleccionadas
  //    Descomenta si quieres borrar el estado al deseleccionar.
  /*
  const idsSeleccionados = new Set(asignaturasSeleccionadas.value.map(s => s.area_id));
  Object.keys(formularios).forEach((key) => {
    const k = isNaN(Number(key)) ? key : Number(key);
    if (!idsSeleccionados.has(k)) {
      delete formularios[k as keyof typeof formularios];
    }
  });
  */
};

const cambiarPaso = async (arriba: boolean) => {
  if (arriba) {
    switch (paso.value) {
      case 0:
        sp_guardar_estudiante_completos();
        break;
      case 1:
        if (form2.requiere_ajuste == true) {
          //si hay asignatura falta
          console.log(asignaturasSeleccionadas.value);
          if (asignaturasSeleccionadas.value.length > 0) {
            await prepararPaso2();
            subpaso.value = 0
          } else {
            ElMessage.error('Oops, Almenos seleccione una area.')
          }

        } else {
          paso.value = 3
        }


        break;
      case 4:

        break;
      default:
        paso.value = paso.value + 1
        break;
    }
  }
  else {
    switch (paso.value) {
      case 0:

        break;
      case 2:
        if (form2.requiere_ajuste == true) {
          //si hay asignatura falta
          console.log(asignaturasSeleccionadas.value);
          if (asignaturasSeleccionadas.value.length > 0) {
            await prepararPaso2();
            subpaso.value = 0
          } else {
            ElMessage.error('Oops, Almenos seleccione una area.')
          }

        } else {
          paso.value = 3
        }


        break;
      default:
        paso.value = paso.value - 1
        break;
    }
  }



  // paso.value = 1;
};
const sp_guardar_estudiante_completos = async () => {
  // paso.value=1
  // Mapeamos directamente desde form
  // Array de valores con comentarios
  const mappedArray = [
    idEstudiante.value, // p_estudiante_id
    form.infoGeneral.direccion,            // p_direccion
    form.infoGeneral.barrio,               // p_barrio
    form.infoGeneral.telefono,             // p_telefono
    form.infoGeneral.telefono,             // p_celular (si tienes campo específico, cámbialo)
    form.infoGeneral.correo,               // p_email
    form.infoGeneral.centroProteccion,     // p_modalidad_proteccion
    form.infoGeneral.lugarProteccion,      // p_lugar_proteccion (ajusta si lo tienes en form)
    form.infoGeneral.perteneceGrupoEtnico, // p_pertenece_grupo_etnico
    form.descripcion.gustosIntereses,      // p_gustos_e_intereses
    form.salud.afiliado,                   // p_afiliado_sistema
    form.salud.regimenId,                  // p_regimen_id
    form.salud.eps,                        // p_eps
    form.salud.tieneDiagnostico,           // p_tiene_diagnostico
    form.salud.diagnosticoCual,            // p_diagnostico
    JSON.stringify([
      { tipo_terapia: form.salud.atencionMedicaCual, frecuencia: form.salud.frecuenciaAtencion }
    ]),                                    // p_terapias
    JSON.stringify([
      { nombre_medicamento: form.salud.medicamentosCuales, frecuencia: form.salud.medicamentosFrecuencia, hora: "08:00" }
    ]),                                    // p_medicamentos
    form.hogar.madreNombre,                // p_nombre_madre
    form.hogar.ocupacionMadre,             // p_ocupacion_madre
    form.hogar.padreNombre,                // p_nombre_padre
    form.hogar.cuidadorNombre,             // p_nombre_cuidador
    form.hogar.parentesco,                 // p_parentesco_cuidador
    form.educativo.vinculadoOtraInst,      // p_matriculado_otra_institucion
    form.educativo.ultimoGrado,            // p_ultimo_grado_cursado
    form.educativo.institucionesIds        // p_instituciones_ids
  ];
  // Mapeamos directamente desde form
  const mappedArrayExtras = [
    // === IDENTIFICADOR ===
    idEstudiante.value,          // p_estudiante_id

    // === DATOS ADICIONALES DEL ESTUDIANTE ===
    form.infoGeneral.registroVictimas,              // p_tiene_registro_victima
    form.descripcion.expectativasEstudiante,        // p_expectativas_estudiante
    form.descripcion.expectativasFamilia,           // p_expectativas_familia
    form.descripcion.redesApoyo.otras,              // p_redes_apoyo

    // === DATOS ADICIONALES DE SALUD ===
    form.salud.lugarEmergencia,                     // p_lugar_atencion_emergencia
    form.salud.tieneAtencionMedica,                 // p_tratamiento_especial
    form.salud.detalleTratamiento,                  // p_tratamiento_detalle
    form.salud.apoyosTecnicos,                      // p_apoyos_tecnicos
    form.salud.apoyosTecnicosCuales,                // p_detalle_apoyos
    JSON.stringify([
      {
        tipo_terapia: form.salud.atencionMedicaCual,
        frecuencia: form.salud.frecuenciaAtencion
      }
    ]),                                             // p_terapias
    JSON.stringify([
      {
        nombre_medicamento: form.salud.medicamentosCuales,
        frecuencia: form.salud.medicamentosFrecuencia,
        hora: "08:00"
      }
    ]),                                             // p_medicamentos

    // === DATOS FAMILIARES ADICIONALES ===
    form.hogar.nivelMadre,                          // p_nivel_educativo_madre
    form.hogar.ocupacionPadre,                      // p_ocupacion_padre
    form.hogar.nivelPadre,                          // p_nivel_educativo_padre
    form.hogar.cuidadorNivel,                       // p_nivel_educativo_cuidador
    form.hogar.cuidadorTelefono,                    // p_telefono_cuidador
    form.hogar.cuidadorCorreo,                      // p_correo_cuidador
    form.hogar.numHermanos,                         // p_numero_hermanos
    form.hogar.lugarQueOcupa,                       // p_lugar_entre_hermanos
    form.hogar.quienesApoyanCrianza,                // p_apoyan_crianza
    form.hogar.personasConQuienVive,                // p_personas_con_quien_vive
    form.hogar.fallecioMadre,                       // p_madre_viva (valor por defecto)
    form.hogar.fallecioPadre,                       // p_padre_vivo (valor por defecto)

    // === DATOS EDUCATIVOS ADICIONALES ===
    form.educativo.otrasInstituciones,              // p_detalle_otras_instituciones
    null,                                           // p_motivo_cambio (no existe en form)
    form.educativo.estado,                          // p_estado_ultimo_grado
    null,                                           // p_observaciones (no existe en form)
    form.educativo.recibeInformePedagogico,         // p_recibe_informe
    form.educativo.institucionInforme,              // p_institucion_informe
    form.educativo.programasComplementarios,        // p_asiste_programas_complementarios
    form.educativo.cualesProgramas                  // p_detalle_programas
  ];

  console.log("Objeto mapeado desde form:", mappedArray);
  // console.log("Formulario principal:", form);
  saving.value = true;
  try {
    const parametros = { spName: "fn_guardar_estudiante_simple", params: mappedArray };
    GeneralService.ejecutarSP("fn_guardar_estudiante_simple", parametros);
    ElMessage.success("Datos guardados correctamente");
    const parametros2 = { spName: "fn_guardar_estudiante_complementario", params: mappedArrayExtras };
    GeneralService.ejecutarSP("fn_guardar_estudiante_complementario", parametros2);

    paso.value = 1;
  } catch (e) {
    console.error(e);
    ElMessage.error("Error guardando los datos");
  } finally {
    saving.value = false;
  }
}

// Helper genérico para SP
// Helper genérico para SP
const callSP = async <T = any>(spName: string, params: any[] = []): Promise<T[]> => {
  const parametros = { spName, params };
  try {
    const result = await GeneralService.ejecutarSP(spName, parametros);
    // Estructura esperada: result?.[0]?.[spName] === array
    return (result?.[0]?.[spName] ?? []) as T[];
  } catch (err) {
    console.error(`Error ejecutando ${spName}:`, err);
    return [];
  }
};

// Cargas maestras (al entrar a Paso 2)
const sp_perido_barrera = async (): Promise<void> => {
  const param = { spName: "fn_periodo_barreras_json_table", params: [idPiar.value] };
  const res = await GeneralService.ejecutarSP("fn_periodo_barreras_json_table", param);
  const inco = res;
  if (inco) {
    informacion_barrera.value = inco;
  }
};

// Cargas maestras (al entrar a Paso 2)
const cargarCategoriasBarreras = async (): Promise<void> => {
  categoriasBarreras.value = await callSP<OpcionCategoria>('fn_listar_categorias_barreras');
};

const cargarTiposAjustes = async (): Promise<void> => {
  tiposAjustes.value = await callSP<OpcionTipo>('fn_listar_tipos_ajustes');
};

const cargarApoyosRequeridos = async (): Promise<void> => {
  apoyosRequeridos.value = await callSP<OpcionApoyoRequerido>('fn_listar_apoyos_requeridos');
};

const prepararPaso2 = async (): Promise<void> => {
  try {
    await Promise.all([
      sp_perido_barrera(),
      cargarCategoriasBarreras(),
      cargarTiposAjustes(),
      cargarApoyosRequeridos()
    ]);
    paso.value = 2;
  } catch (error) {
    console.error('Error cargando datos iniciales:', error);

  }
};
// ===== Dependientes por asignatura (padre simple -> hijo MULTI) =====

const onChangeCategoria = async (areaId: string | number, categoriaId: number | null): Promise<void> => {
  const form = formularios[areaId] ?? (formularios[areaId] = crearFormularioAsignatura());
  form.periodo = "1"
  form.categoriaId = categoriaId;
  const categoria = categoriasBarreras.value.find(c => c.categoria_id === categoriaId);
  formularios[areaId].descripcionCategoria = categoria ? categoria.descripcion : "Seleccione una barrera";
  // reset de sus hijos (MULTI)
  form.subcategoriaIds = [];
  form.subcategoriasOptions = [];

  if (!categoriaId) return;

  // carga subcategorías por categoría
  form.subcategoriasOptions = await callSP<OpcionSubCategoria>('fn_listar_subcategorias_por_categoria', [categoriaId]);
};

const onChangeTipoAjuste = async (areaId: string | number, tipoId: number | null): Promise<void> => {
  const form = formularios[areaId] ?? (formularios[areaId] = crearFormularioAsignatura());
  form.tipoAjusteId = tipoId;

  // reset de sus hijos (MULTI)
  form.subtipoAjusteIds = [];
  form.subtiposOptions = [];

  if (!tipoId) return;

  // carga subtipos por tipo
  form.subtiposOptions = await callSP<OpcionSubTipo>('fn_listar_subtipos_por_tipo', [tipoId]);
};

const onChangeApoyo = async (areaId: string | number, apoyoId: number | null): Promise<void> => {
  const form = formularios[areaId] ?? (formularios[areaId] = crearFormularioAsignatura());
  form.apoyoId = apoyoId;
  const apoyo = apoyosRequeridos.value.find(c => c.apoyo_id === apoyoId);
  formularios[areaId].apoyoRequeridoDescripcion = apoyo ? apoyo.descripcion : "Seleccione una barrera";
  // reset de sus hijos (MULTI)
  form.subapoyoIds = [];
  form.subapoyosOptions = [];

  if (!apoyoId) return;

  // carga subapoyos por apoyo
  form.subapoyosOptions = await callSP<OpcionSubApoyo>('fn_listar_subapoyos_por_apoyo', [apoyoId]);
};

// ===== Tabla "barreras" (si la mantienes) =====

const agregarBarrera = (areaId: string | number): void => {
  const form = formularios[areaId];
  // Validaciones
  if (!form.categoriaId) {
    ElMessage.error('Debe seleccionar una categoría de barrera.')
    return
  }
  if (form.subcategoriaIds.length === 0) {
    ElMessage.error('Debe seleccionar al menos una subcategoría.')
    return
  }
  if (!form.tipoAjusteId) {
    ElMessage.error('Debe seleccionar un tipo de ajuste.')
    return
  }
  if (form.subtipoAjusteIds.length === 0) {
    ElMessage.error('Debe seleccionar al menos un subtipo de ajuste.')
    return
  }
  if (!form.apoyoId) {
    ElMessage.error('Debe seleccionar un apoyo requerido.')
    return
  }
  if (form.subapoyoIds.length === 0) {
    ElMessage.error('Debe seleccionar al menos un subapoyo.')
    return
  }

  // Si todo está OK, continúa
  const categoria = categoriasBarreras.value.find(c => c.categoria_id === form.categoriaId)
  const tipo = tiposAjustes.value.find(t => t.tipo_ajuste_id === form.tipoAjusteId)
  const apoyo = apoyosRequeridos.value.find(a => a.apoyo_id === form.apoyoId)

  const subcategorias = form.subcategoriasOptions
    .filter((s: OpcionSubCategoria) => form.subcategoriaIds.includes(s.subcategoria_id))
    .map((s: OpcionSubCategoria) => s.descripcion)

  const subtipos = form.subtiposOptions
    .filter((st: OpcionSubTipo) => form.subtipoAjusteIds.includes(st.subtipo_ajuste_id))
    .map((st: OpcionSubTipo) => st.nombre)

  const subapoyos = form.subapoyosOptions
    .filter((sa: OpcionSubApoyo) => form.subapoyoIds.includes(sa.subapoyo_id))
    .map((sa: OpcionSubApoyo) => sa.descripcion)

  barrerasAgregadas.value.push({
    categoria: categoria?.nombre || '',
    descripcionCategoria: categoria?.descripcion || '',
    subcategorias,
    tipoAjuste: tipo?.nombre || '',
    subtipos,
    apoyo: apoyo?.nombre || '',
    descripcionApoyo: apoyo?.descripcion || '',
    subapoyos
  })
  console.log(barrerasAgregadas.value)
  // ✅ Mensaje de éxito

  ElMessage.success('Barrera agregada correctamente.')
  let valores=formularios[areaId].subapoyoIdsCompletos.concat(form.subapoyoIds)
  formularios[areaId].subapoyoIdsCompletos=valores
  valores=formularios[areaId].subtipoAjusteIdsCompletos.concat(form.subtipoAjusteIds)
  formularios[areaId].subtipoAjusteIdsCompletos=valores
  valores=formularios[areaId].subcategoriaIdsCompletos.concat(form.subcategoriaIds)

  formularios[areaId].subcategoriaIdsCompletos=valores


  // Limpia selecciones para nueva entrada
  formularios[areaId].categoriaId = null;
  formularios[areaId].subcategoriaIds = [];
  formularios[areaId].subcategoriasOptions = [];
  formularios[areaId].tipoAjusteId = null;
  formularios[areaId].subtipoAjusteIds = [];
  formularios[areaId].subtiposOptions = [];
  formularios[areaId].apoyoId = null;
  formularios[areaId].subapoyoIds = [];
  formularios[areaId].subapoyosOptions = [];
  formularios[areaId].descripcionCategoria = "Seleccione una barrera";
  formularios[areaId].apoyoRequeridoDescripcion = "Seleccione una barrera";


};

const eliminarBarrera = (areaId: string | number, index: number): void => {
  const form = formularios[areaId];
  if (!form) return;
  form.barreras.splice(index, 1);
};

const guardarAsignatura = (area: any) => {
  let dataEnviar = formularios[area];
  console.log(dataEnviar)
  const mappedArray = [
    idPiar.value,                                   // p_piar_id (puedes reemplazarlo dinámico si es ref)
    area_formulario.value,            // p_area_id
    Number(dataEnviar.periodo),                     // p_periodo
    dataEnviar.subcategoriaIdsCompletos,            // p_subcategoria_ids
    dataEnviar.subtipoAjusteIdsCompletos,           // p_subtipo_ajuste_ids
    dataEnviar.subapoyoIdsCompletos,                         // p_subapoyo_ids
    dataEnviar.seguimiento,                         // p_observaciones (array con el texto del seguimiento)
    dataEnviar.dba, // p_bdas
    new Date().toISOString().split('T')[0]  // p_fecha_seguimiento (ej: '2025-10-06')
  ];
  saving.value = true;
  try {
    const parametros = { spName: "fn_guardar_detalle_ajuste", params: mappedArray };
    GeneralService.ejecutarSP("fn_guardar_detalle_ajuste", parametros);
    ElMessage.success("Datos guardados correctamente");


    subpaso.value = 0;
  } catch (e) {
    console.error(e);
    ElMessage.error("Error guardando los datos");
  } finally {
    saving.value = false;
  }
}

// 👉 Función para fusionar filas con el mismo detalle_id
function mergeRows(
  { row, column, rowIndex, columnIndex }: any,
  barreras: any[]
): any {
  // Combinar las columnas "detalle_id" y "descripcion_subcategoria"
  if (
    column.property === 'detalle_id' ||
    column.property === 'descripcion_subcategoria'
  ) {
    const currentId = row.detalle_id
    const groupRows = barreras.filter((b) => b.detalle_id === currentId)
    const firstIndex = barreras.findIndex((b) => b.detalle_id === currentId)

    if (rowIndex === firstIndex) {
      return { rowspan: groupRows.length, colspan: 1 }
    } else {
      return { rowspan: 0, colspan: 0 }
    }
  }

  return { rowspan: 1, colspan: 1 }
}

/**
 * 🔹 Asigna una clase alterna a cada grupo (detalle_id)
 * para sombrear los bloques visualmente.
 */
function getGroupRowClass(
  { row, rowIndex }: any,
  barreras: any[]
): string {
  const currentId = row.detalle_id
  const firstIndex = barreras.findIndex((b) => b.detalle_id === currentId)
  const groupIndex = Object.keys(
    barreras
      .filter((b, idx) => barreras.findIndex((g) => g.detalle_id === b.detalle_id) === idx)
      .reduce((acc, g) => {
        acc[g.detalle_id] = true
        return acc
      }, {} as Record<number, boolean>)
  ).indexOf(String(currentId))

  // Alternar color entre grupos
  return groupIndex % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'
}

const barrerasUnicas = computed(() => {
  const mapa = new Map<number, Barrera>()

  informacion_barrera.value.forEach(area => {
    area.detalle_json.forEach(detalle => {
      detalle.barreras.forEach(b => {
        if (!mapa.has(b.detalle_id)) {
          mapa.set(b.detalle_id, {
            detalle_id: b.detalle_id,
            descripcion_subcategoria: b.descripcion_subcategoria
          })
        }
      })
    })
  })

  return Array.from(mapa.values())
})

/**
 * 🔹 Evento: agregar nueva barrera
 */
function agregarBarreras(area: any, periodo: any) {
  area_formulario.value = area.area_id;
  subpaso.value = 1;
  if (area_formulario.value) {
    formularios[area_formulario.value] = crearFormularioAsignatura();
  }
  formularios[area_formulario.value].nombreAsignatura = area.nombre_area;
  formularios[area_formulario.value].periodo = periodo;
  console.log(formularios[area_formulario.value])
  barrerasAgregadas.value = [];
  // Aquí puedes abrir un modal o emitir un evento hacia el padre
}

/**
 * 🔹 Evento: editar detalle (clic en icono)
 */
function editarDetalle(row: any) {
  console.log('Editar detalle con ID:', row.detalle_id)
  // Aquí podrías abrir un formulario modal de edición
}
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
