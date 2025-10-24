<template>
    <div class="bg-gray-100 min-h-screen py-6" >
        <div ref="pdfContent" id="pdfContent" class="text-sm leading-relaxed bg-white p-6 max-w-5xl mx-auto  text-gray-800 font-sans text-[13px] " v-if="data">
            <!-- CABECERA -->
            <section class="border border-black grid grid-cols-12">
                <div class="col-span-8 p-3">
                    <img src="/src/assets/minieducacion.png" alt="logo" />
                </div>

                <div class="col-span-4 flex flex-col justify-center align-middle text-center text-2xl font-semibold">
                    <p class="w-full uppercase">PIAR</p>
                    <p>Decreto 1421/2017</p>
                </div>
            </section>

            <!-- ENCABEZADO -->
            <section class="mt-4">
                <h2 class="bg-sky-900 text-white font-semibold px-4 py-2">PLAN INDIVIDUAL DE AJUSTES RAZONABLES</h2>
                <div class="border border-gray-400 divide-y">
                    <div class="grid grid-cols-2">
                        <div class="bg-gray-50 px-3 py-2 font-semibold border-r border-gray-300">Fecha y Lugar de
                            Diligenciamiento</div>
                        <div class="px-3 py-2">{{ data.piar?.fecha_elaboracion || '—' }}</div>
                    </div>

                    <div class="grid grid-cols-2">
                        <div class="bg-gray-50 px-3 py-2 font-semibold border-r border-gray-300">Nombre y rol de la
                            Persona que diligencia</div>
                        <div class="px-3 py-2">{{ data?.acta?.personaDiligencia || data?.acudientes?.[0]?.nombre || '—'
                            }}</div>
                    </div>

                    <div class="grid grid-cols-2">
                        <div class="bg-gray-50 px-3 py-2 font-semibold border-r border-gray-300">Institución Educativa
                        </div>
                        <div class="px-3 py-2">{{ data.entorno_educativo?.institucion?.nombre || '—' }}</div>
                    </div>
                </div>
            </section>

            <!-- INFORMACIÓN GENERAL -->
            <section>
                <h2 class="bg-sky-900 text-white font-semibold px-4 py-2">1. Información General del Estudiante</h2>

                <div class="border border-gray-400 divide-y grid grid-cols-2">
                    <div class="grid grid-cols-2">
                        <div class="bg-gray-50 px-3 py-2 font-semibold border-r border-gray-300">Nombres</div>
                        <div class="px-3 py-2">{{ data.estudiante?.datos?.nombres || '—' }}</div>
                    </div>

                    <div class="grid grid-cols-2">
                        <div class="bg-gray-50 px-3 py-2 font-semibold border-r border-gray-300">Apellidos</div>
                        <div class="px-3 py-2">{{ data.estudiante?.datos?.apellidos || '—' }}</div>
                    </div>

                    <div class="grid grid-cols-2">
                        <div class="bg-gray-50 px-3 py-2 font-semibold border-r border-gray-300">Tipo Identificación
                        </div>
                        <div class="px-3 py-2">{{ data.estudiante?.datos?.tipo_identificacion || '—' }}</div>
                    </div>

                    <div class="grid grid-cols-2">
                        <div class="bg-gray-50 px-3 py-2 font-semibold border-r border-gray-300">Número Documento</div>
                        <div class="px-3 py-2">{{ data.estudiante?.datos?.numero_documento || '—' }}</div>
                    </div>

                    <div class="grid grid-cols-2">
                        <div class="bg-gray-50 px-3 py-2 font-semibold border-r border-gray-300">Edad</div>
                        <div class="px-3 py-2">{{ data.estudiante?.datos?.edad ?? '—' }}</div>
                    </div>

                    <div class="grid grid-cols-2">
                        <div class="bg-gray-50 px-3 py-2 font-semibold border-r border-gray-300">Grado Actual</div>
                        <div class="px-3 py-2">{{ data.estudiante?.datos?.grado_actual ?? '—' }}</div>
                    </div>

                    <div class="grid grid-cols-2">
                        <div class="bg-gray-50 px-3 py-2 font-semibold border-r border-gray-300">Dirección</div>
                        <div class="px-3 py-2">{{ data.estudiante?.datos?.direccion || '—' }}</div>
                    </div>

                    <div class="grid grid-cols-2">
                        <div class="bg-gray-50 px-3 py-2 font-semibold border-r border-gray-300">Barrio</div>
                        <div class="px-3 py-2">{{ data.estudiante?.datos?.barrio || '—' }}</div>
                    </div>

                    <div class="grid grid-cols-2">
                        <div class="bg-gray-50 px-3 py-2 font-semibold border-r border-gray-300">Teléfono</div>
                        <div class="px-3 py-2">{{ data.estudiante?.datos?.telefono || data.estudiante?.datos?.celular ||
                            '—' }}</div>
                    </div>

                    <div class="grid grid-cols-2">
                        <div class="bg-gray-50 px-3 py-2 font-semibold border-r border-gray-300">Correo Electrónico
                        </div>
                        <div class="px-3 py-2">{{ data.estudiante?.datos?.email || '—' }}</div>
                    </div>

                    <div class="grid grid-cols-2">
                        <div class="bg-gray-50 px-3 py-2 font-semibold border-r border-gray-300">Departamento</div>
                        <div class="px-3 py-2">{{ data.estudiante?.ubicacion?.departamento || '—' }}</div>
                    </div>

                    <div class="grid grid-cols-2">
                        <div class="bg-gray-50 px-3 py-2 font-semibold border-r border-gray-300">Ciudad</div>
                        <div class="px-3 py-2">{{ data.estudiante?.ubicacion?.ciudad || '—' }}</div>
                    </div>
                </div>

                <div class="border border-gray-400 border-t-0 grid grid-cols-3">
                    <div class="text-justify bg-gray-50 p-3 border border-gray-300">
                        <p>
                            Descripción general del estudiante con énfasis en sus capacidades, gustos e intereses o
                            aspectos que le desagradan,
                            expectativas del estudiante y la familia, acompañamiento familiar y redes de apoyo con los
                            que se entablecen.
                        </p>
                    </div>

                    <div class="col-span-2 divide-y space-y-3">
                        <div class="px-3 py-3">
                            <h3 class="font-semibold text-sky-800">Expectativas del estudiante</h3>
                            <div v-html="data.estudiante?.datos?.expectativas_estudiante || '—'"></div>
                        </div>

                        <div class="px-3 py-3">
                            <h3 class="font-semibold text-sky-800">Expectativas de la familia</h3>
                            <div v-html="data.estudiante?.datos?.expectativas_familia || '—'"></div>
                        </div>

                        <div class="px-3 py-3">
                            <h3 class="font-semibold text-sky-800">Redes de apoyo</h3>
                            <div v-html="data.estudiante?.datos?.redes_apoyo || '—'"></div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- ENTORNO DE SALUD -->
            <section>
                <h2 class="bg-sky-900 text-white font-semibold px-4 py-2">2. Entorno de Salud</h2>
                <div class="border border-gray-400 divide-y">
                    <div class="grid grid-cols-2">
                        <div class="bg-gray-50 px-3 py-2 font-semibold border-r border-gray-300">Afiliado al sistema
                        </div>
                        <div class="px-3 py-2">{{ data.entorno_salud?.afiliado_sistema ? 'Sí' : 'No' }}</div>
                    </div>

                    <div class="grid grid-cols-2">
                        <div class="bg-gray-50 px-3 py-2 font-semibold border-r border-gray-300">Régimen</div>
                        <div class="px-3 py-2">{{ data.entorno_salud?.regimen || '—' }}</div>
                    </div>

                    <div class="grid grid-cols-2">
                        <div class="bg-gray-50 px-3 py-2 font-semibold border-r border-gray-300">EPS</div>
                        <div class="px-3 py-2">{{ data.entorno_salud?.eps || '—' }}</div>
                    </div>

                    <div class="grid grid-cols-2">
                        <div class="bg-gray-50 px-3 py-2 font-semibold border-r border-gray-300">Diagnóstico (breve)
                        </div>
                        <div class="px-3 py-2">
                            <div v-html="data.entorno_salud?.diagnostico || '—'"></div>
                        </div>
                    </div>

                    <div class="grid grid-cols-2">
                        <div class="bg-gray-50 px-3 py-2 font-semibold border-r border-gray-300">Tratamiento especial
                        </div>
                        <div class="px-3 py-2">{{ data.entorno_salud?.tratamiento_especial ? 'Sí' : 'No' }}</div>
                    </div>

                    <div class="grid grid-cols-2">
                        <div class="bg-gray-50 px-3 py-2 font-semibold border-r border-gray-300">Detalle del tratamiento
                        </div>
                        <div class="px-3 py-2">
                            <div v-html="data.entorno_salud?.detalle_tratamiento || '—'"></div>
                        </div>
                    </div>

                    <div class="grid grid-cols-2">
                        <div class="bg-gray-50 px-3 py-2 font-semibold border-r border-gray-300">Consume medicamentos
                        </div>
                        <div class="px-3 py-2">{{ data.entorno_salud?.consume_medicamentos ? 'Sí' : 'No' }}</div>
                    </div>

                    <div class="grid grid-cols-2">
                        <div class="bg-gray-50 px-3 py-2 font-semibold border-r border-gray-300">Apoyos técnicos /
                            ayudas</div>
                        <div class="px-3 py-2">{{ data.entorno_salud?.apoyos_tecnicos ? 'Sí' : 'No' }}</div>
                    </div>

                    <div class="grid grid-cols-2">
                        <div class="bg-gray-50 px-3 py-2 font-semibold border-r border-gray-300">Detalle apoyos técnicos
                        </div>
                        <div class="px-3 py-2">
                            <div v-html="data.entorno_salud?.detalle_apoyos || '—'"></div>
                        </div>
                    </div>
                </div>

                <div class="border border-gray-400 border-t-0 p-4 space-y-3">
                    <div>
                        <h3 class="font-semibold text-sky-800">Terapias</h3>
                        <div v-if="data.entorno_salud?.terapias && data.entorno_salud.terapias.length">
                            <ul class="list-disc pl-6">
                                <li v-for="(t, i) in data.entorno_salud.terapias" :key="i">
                                    <strong>{{ t.tipo_terapia || 'Terapia' }}</strong> — {{ t.frecuencia || '—' }}
                                </li>
                            </ul>
                        </div>
                        <div v-else class="text-gray-400 italic">—</div>
                    </div>

                    <div>
                        <h3 class="font-semibold text-sky-800">Medicamentos</h3>
                        <div v-if="data.entorno_salud?.medicamentos && data.entorno_salud.medicamentos.length">
                            <table class="min-w-full text-sm border border-gray-200">
                                <thead class="bg-gray-100">
                                    <tr>
                                        <th class="px-3 py-1 text-left border">Nombre</th>
                                        <th class="px-3 py-1 text-left border">Frecuencia</th>
                                        <th class="px-3 py-1 text-left border">Hora</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(m, mi) in data.entorno_salud.medicamentos" :key="mi">
                                        <td class="px-3 py-1 border">{{ m.nombre || JSON.stringify(m) || '—' }}</td>
                                        <td class="px-3 py-1 border">{{ m.frecuencia || '—' }}</td>
                                        <td class="px-3 py-1 border">{{ m.hora || '—' }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div v-else class="text-gray-400 italic">—</div>
                    </div>
                </div>
            </section>

            <!-- ENTORNO HOGAR -->
            <section>
                <h2 class="bg-sky-900 text-white font-semibold px-4 py-2">3. Entorno Hogar</h2>

                <div class="border border-gray-400 divide-y">
                    <div class="grid grid-cols-2">
                        <div class="bg-gray-50 px-3 py-2 font-semibold border-r border-gray-300">Personas con quien vive
                        </div>
                        <div class="px-3 py-2">
                            <div v-if="data?.acudientes && data.acudientes.length">
                                <template v-for="(a, idx) in data.acudientes" :key="idx">
                                    <div class="mb-1">
                                        <strong>{{ a.parentesco || a.tipo || 'Acudiente' }}:</strong> {{ a.nombre || '—'
                                        }}
                                    </div>
                                </template>
                            </div>
                            <div v-else class="text-gray-400 italic">—</div>
                        </div>
                    </div>

                    <div class="grid grid-cols-2">
                        <div class="bg-gray-50 px-3 py-2 font-semibold border-r border-gray-300">Nombre cuidador</div>
                        <div class="px-3 py-2">
                            {{
                                (data.acudientes?.find((x: any) => x?.tipo === 'cuidador')?.nombre)
                                || (data.acudientes?.find((x: any) =>
                                    x?.parentesco?.toLowerCase()?.includes('madre'))?.nombre)
                                || '—'
                            }}
                        </div>
                    </div>

                    <div class="grid grid-cols-2">
                        <div class="bg-gray-50 px-3 py-2 font-semibold border-r border-gray-300">Teléfono de contacto
                        </div>
                        <div class="px-3 py-2">
                            {{
                                (data.acudientes?.[0]?.telefono)
                                || (data.estudiante?.datos?.telefono)
                                || '—'
                            }}
                        </div>
                    </div>
                </div>

                <div class="border border-gray-400 border-t-0 p-4">
                    <h3 class="font-semibold text-sky-800 mb-2">Detalle de acudientes</h3>
                    <div v-if="data?.acudientes && data.acudientes.length">
                        <div v-for="(a, ai) in data.acudientes" :key="ai" class="mb-3 border-b pb-2">
                            <p><strong>Tipo:</strong> {{ a.tipo || '—' }}</p>
                            <p><strong>Nombre:</strong> {{ a.nombre || '—' }}</p>
                            <p><strong>Ocupación:</strong> {{ a.ocupacion || '—' }}</p>
                            <p><strong>Nivel educativo:</strong> {{ a.nivel_educativo || '—' }}</p>
                            <p><strong>Parentesco:</strong> {{ a.parentesco || '—' }}</p>
                            <p><strong>Teléfono:</strong> {{ a.telefono || '—' }}</p>
                            <p><strong>Correo:</strong> {{ a.correo || '—' }}</p>
                        </div>
                    </div>
                    <div v-else class="text-gray-400 italic">No hay información de acudientes.</div>
                </div>
            </section>

            <!-- ENTORNO EDUCATIVO -->
            <section>
                <h2 class="bg-sky-900 text-white font-semibold px-4 py-2">4. Entorno Educativo</h2>
                <div class="border border-gray-400 divide-y">
                    <div class="grid grid-cols-2">
                        <div class="bg-gray-50 px-3 py-2 font-semibold border-r border-gray-300">Institución</div>
                        <div class="px-3 py-2">{{ data.entorno_educativo?.institucion?.nombre || '—' }}</div>
                    </div>

                    <div class="grid grid-cols-2">
                        <div class="bg-gray-50 px-3 py-2 font-semibold border-r border-gray-300">Sede</div>
                        <div class="px-3 py-2">{{ data.entorno_educativo?.institucion?.sede || '—' }}</div>
                    </div>

                    <div class="grid grid-cols-2">
                        <div class="bg-gray-50 px-3 py-2 font-semibold border-r border-gray-300">Último grado cursado
                        </div>
                        <div class="px-3 py-2">{{ data.entorno_educativo?.ultimo_grado_cursado || '—' }}</div>
                    </div>

                    <div class="grid grid-cols-2">
                        <div class="bg-gray-50 px-3 py-2 font-semibold border-r border-gray-300">Estado</div>
                        <div class="px-3 py-2">{{ data.entorno_educativo?.estado_ultimo_grado || '—' }}</div>
                    </div>
                </div>

                <div class="border border-gray-400 border-t-0 p-4">
                    <p><strong>Observaciones:</strong> {{ data.entorno_educativo?.observaciones || '—' }}</p>
                </div>
            </section>

            <!-- AJUSTES RAZONABLES -->
            <section>
                <h2 class="bg-sky-900 text-white font-semibold px-4 py-2">Ajustes Razonables</h2>
                <div class="space-y-6">
                    <div v-for="(ajuste, index) in data.ajustes_razonables || []" :key="index"
                        class="border border-gray-300 p-4 shadow-sm">
                        <h3 class="text-sky-800 font-semibold mb-1 uppercase">{{ ajuste.area }}</h3>
                        <p><strong>Apoyo:</strong> {{ ajuste.apoyo || '—' }}</p>
                        <p><strong>Objetivo:</strong> {{ ajuste.objetivo || '—' }}</p>
                        <p><strong>Estrategias:</strong> {{ ajuste.estrategias || '—' }}</p>

                        <div class="overflow-x-auto mt-3">
                            <table class="min-w-full border border-gray-300 text-sm">
                                <thead class="bg-gray-100 text-gray-700">
                                    <tr>
                                        <th class="border border-gray-300 p-2 text-left">Barreras identificadas</th>
                                        <th class="border border-gray-300 p-2 text-left">Tipo de ajuste</th>
                                        <th class="border border-gray-300 p-2 text-left">Apoyo requerido</th>
                                        <th class="border border-gray-300 p-2 text-left">Observación</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(detalle, i) in ajuste.detalle || []" :key="i">
                                        <td class="border border-gray-300 p-2">{{ detalle.subcategoria || '—' }}</td>
                                        <td class="border border-gray-300 p-2">{{ detalle.tipo_ajuste || '-' }}</td>
                                        <td class="border border-gray-300 p-2">{{ detalle.subapoyo || '-' }}</td>
                                        <td class="border border-gray-300 p-2">
                                            <div v-html="detalle.observacion || '-'"></div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            <!-- ACTA DE ACUERDO -->
            <section>
                <h2 class="bg-sky-900 text-white font-semibold px-4 py-2">Acta de Acuerdo</h2>
                <div class="border border-gray-400 divide-y">
                    <div class="grid grid-cols-2">
                        <div class="bg-gray-50 px-3 py-2 font-semibold border-r border-gray-300">Fecha y Lugar de
                            Diligenciamiento</div>
                        <div class="px-3 py-2">{{ data.piar?.fecha_elaboracion || '—' }}</div>
                    </div>

                    <div class="grid grid-cols-2">
                        <div class="bg-gray-50 px-3 py-2 font-semibold border-r border-gray-300">Nombre y rol de la
                            Persona que diligencia</div>
                        <div class="px-3 py-2">{{ data?.acta?.personaDiligencia || data?.acudientes?.[0]?.nombre || '—'
                            }}</div>
                    </div>

                    <div class="grid grid-cols-2">
                        <div class="bg-gray-50 px-3 py-2 font-semibold border-r border-gray-300">Institución Educativa
                        </div>
                        <div class="px-3 py-2">{{ data.entorno_educativo?.institucion?.nombre || '—' }}</div>
                    </div>

                    <div class="grid grid-cols-8">
                        <div class="bg-gray-50 px-3 py-2 font-semibold border-r border-gray-300 col-span-2">Nombre
                        </div>
                        <div class="px-3 py-2 col-span-2">{{ data.estudiante.datos.nombres }} {{
                            data.estudiante.datos.apellidos }}
                        </div>
                        <div class="bg-gray-50 px-3 py-2 font-semibold border-r border-gray-300">Edad
                        </div>
                        <div class="px-3 py-2">{{ data.estudiante.datos.edad }} </div>
                        <div class="bg-gray-50 px-3 py-2 font-semibold border-r border-gray-300">Grado
                        </div>
                        <div class="px-3 py-2">{{ data.estudiante.datos.grado_actual }}</div>
                    </div>
                </div>
                <!-- Texto introductorio -->
                <div class="mt-4 space-y-3 text-justify">
                    <p>
                        Según el Decreto 1421 de 2017 la educación inclusiva es un proceso permanente que reconoce,
                        valora y
                        responde
                        a la diversidad de características, intereses, posibilidades y expectativas de los estudiantes
                        para
                        promover su
                        desarrollo, aprendizaje y participación, en un ambiente de aprendizaje común, sin discriminación
                        o
                        exclusión.
                    </p>
                    <p>
                        La inclusión solo es posible cuando se unen los esfuerzos del colegio, el estudiante, docentes,
                        directivos
                        docentes y familias. De ahí la importancia de formalizar con las firmas, la presente Acta de
                        Acuerdo.
                    </p>
                    <p>
                        <span class="font-semibold">El Establecimiento Educativo</span> ha realizado la valoración
                        pedagógica
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
                    <div class="bg-gray-100 px-3 border border-gray-300">
                        Incluya aquí los compromisos específicos para implementar en el aula que requieran ampliación o
                        detalle
                        adicional al incluido en el PIAR.
                        <ul class="list-disc pl-6">
                            <li v-for="(compromiso, index) in data.compromisos || []" :key="index">
                                {{ compromiso.descripcion }}
                            </li>
                        </ul>
                    </div>
                    <div class=" px-3 border border-gray-300">
                        Y en casa apoyará con las siguientes actividades:
                        <ul class="list-disc pl-6">
                            <li v-for="(compromiso, index) in data.compromisos || []" :key="index">
                                {{ compromiso.nombre_actividad }}
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            <!-- COMPROMISOS -->
            <section class="mt-8">
                <h2 class="bg-sky-900 text-white font-semibold px-4 py-2">7. Compromisos del PIAR</h2>
                <div class="overflow-x-auto mt-4">
                    <table class="min-w-full border border-gray-300 text-sm">
                        <thead class="bg-gray-100 text-gray-700">
                            <tr>
                                <th class="border border-gray-300 p-2 text-left">Actividad</th>
                                <th class="border border-gray-300 p-2 text-left">Descripción</th>
                                <th class="border border-gray-300 p-2 text-left">Frecuencia</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(c, i) in data.compromisos || []" :key="i">
                                <td class="border border-gray-300 p-2">{{ c.nombre_actividad || '—' }}</td>
                                <td class="border border-gray-300 p-2">{{ c.descripcion || '—' }}</td>
                                <td class="border border-gray-300 p-2">{{ c.frecuencia || '—' }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <!-- FIRMAS -->
            <section class="mt-10 text-center">
                <div class="grid grid-cols-3 gap-4 border border-gray-300 p-4 mt-6">
                    <div>
                        <p class="font-semibold">Nombre docente</p>
                        <p>{{ data.acta?.docentes?.[0]?.nombre || '________________' }}</p>
                        <p class="font-semibold mt-2">Área</p>
                        <p>{{ data.acta?.docentes?.[0]?.area || '________________' }}</p>
                        <p class="font-semibold mt-2">Firma digital</p>
                        <p>{{ data.acta?.docentes?.[0]?.firma || '________________' }}</p>
                    </div>

                    <div>
                        <p class="font-semibold">Nombre docente</p>
                        <p>{{ data.acta?.docentes?.[1]?.nombre || '________________' }}</p>
                        <p class="font-semibold mt-2">Área</p>
                        <p>{{ data.acta?.docentes?.[1]?.area || '________________' }}</p>
                        <p class="font-semibold mt-2">Firma digital</p>
                        <p>{{ data.acta?.docentes?.[1]?.firma || '________________' }}</p>
                    </div>

                    <div>
                        <p class="font-semibold">Nombre docente</p>
                        <p>{{ data.acta?.docentes?.[2]?.nombre || '________________' }}</p>
                        <p class="font-semibold mt-2">Área</p>
                        <p>{{ data.acta?.docentes?.[2]?.area || '________________' }}</p>
                        <p class="font-semibold mt-2">Firma digital</p>
                        <p>{{ data.acta?.docentes?.[2]?.firma || '________________' }}</p>
                    </div>
                </div>

                <div class="grid grid-cols-3 gap-4 border border-gray-300 p-4 mt-6">
                    <div>
                        <p class="font-semibold">Nombre docente</p>
                        <p>{{ data.acta?.docentes?.[3]?.nombre || '________________' }}</p>
                        <p class="font-semibold mt-2">Área</p>
                        <p>{{ data.acta?.docentes?.[3]?.area || '________________' }}</p>
                        <p class="font-semibold mt-2">Firma digital</p>
                        <p>{{ data.acta?.docentes?.[3]?.firma || '________________' }}</p>
                    </div>

                    <div>
                        <p class="font-semibold">Nombre docente orientador</p>
                        <p>{{ data.acta?.orientador?.nombre || '________________' }}</p>
                        <p class="font-semibold mt-2">Área</p>
                        <p>{{ data.acta?.orientador?.area || '________________' }}</p>
                        <p class="font-semibold mt-2">Firma digital</p>
                        <p>{{ data.acta?.orientador?.firma || '________________' }}</p>
                    </div>

                    <div>
                        <p class="font-semibold">Nombre coordinador pedagógico</p>
                        <p>{{ data.acta?.coordinador?.nombre || '________________' }}</p>
                        <p class="font-semibold mt-2">Área</p>
                        <p>{{ data.acta?.coordinador?.area || '________________' }}</p>
                        <p class="font-semibold mt-2">Firma digital</p>
                        <p>{{ data.acta?.coordinador?.firma || '________________' }}</p>
                    </div>
                </div>

            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { GeneralService } from "@/services/generalService";
import html2pdf from 'html2pdf.js'
import { useRoute, useRouter } from "vue-router";
import type  Html2PdfOptions  from 'html2pdf.js'
const pdfContent = ref<HTMLElement | null>(null)
const data = ref();
const loading = ref(false);
const route = useRoute();
const p_estudiante_id = route.params.idEstudiante as string;;
const p_piar_id = route.params.idPiar as string;;
const p_anio = 2025;
// Ruta actual
onMounted(async () => {
    loading.value = true;
    try {
        const parametros = {
            spName: "fn_generar_pdf_json",
            params: [p_estudiante_id, p_piar_id, p_anio],
        };
        const result = await GeneralService.ejecutarSP("fn_generar_pdf_json", parametros);
        const incoming = result?.[0]?.fn_generar_pdf_json ?? null;
        if (incoming) {
            data.value = incoming;
        }
    } catch (err) {
        console.error(err);
        ElMessage.error("No fue posible cargar los datos del estudiante");
    } finally {
        loading.value = false;
    }

    setTimeout(() => {
        generatePDF();
    }, 1000);
});
const generatePDF = () => {
  const element = pdfContent.value
  if (!element) return

  const opt:any = {
    margin: 0.4,
    filename: 'acta_firmas.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  }

  html2pdf().set(opt).from(element).save()
}
</script>
