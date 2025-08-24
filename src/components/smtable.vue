<template>
    <div>
        <div v-if="totalRows === 0" class="flex items-center justify-center h-100%">
            <el-empty description="" />
        </div>

        <div v-if="totalRows > 0">
            <el-row justify="end">
                <el-input v-model="filtro" style="width: 240px" placeholder="Filtrar datos en la tabla"></el-input>
                <el-button v-if="!exportar == true" type="success" plain @click="exportar_fn()">Exportar</el-button>
            </el-row>

            <el-table :data="displayedData" style="width: 100%" :border="true"
                @selection-change="handleSelectionChange_fn" :row-class-name="getRowClass">
                <template v-for="columna in columns" :key="columna.prop">
                    <el-table-column v-if="columna.mascara === 'seleccion'" label="" width="100">
                        <template #default="scope">
                            <el-checkbox v-model="scope.row[columna.prop]"
                                @change="handleSelectionChange_fn(scope.row, columna.prop)"></el-checkbox>
                        </template>
                    </el-table-column>

                    <el-table-column v-else :prop="columna.prop" :label="columna.label" :width="columna.width">
                        <!-- Slot para personalizar el renderizado de la celda -->
                        <template #default="scope">
                            <span v-if="columna.mascara === 'date'">
                                {{ formatDate_sm(scope.row[columna.prop]) }}
                            </span>
                            <span v-else-if="columna.mascara === 'numero'">
                                {{ formatNumber_sm(scope.row[columna.prop]) }}
                            </span>
                            <span v-else-if="columna.mascara === 'moneda'">
                                ${{ formatNumber_sm(scope.row[columna.prop]) }}
                            </span>
                            <span v-else-if="columna.mascara === 'boton'">
                                <el-button @click="notificarPadre(scope.row, 'hago')" type="success" plain>{{
                                    columna.prop
                                    }}</el-button>
                            </span>
                            <span v-else-if="columna.mascara === 'estado'">
                                <el-tag v-if="scope.row[columna.prop] == 'Terminado'" type="danger">
                                    Terminado
                                </el-tag>

                                <el-tag v-else type="success">
                                    Pendiente
                                </el-tag>
                            </span>
                            <span v-else-if="columna.mascara === 'opciones'">

                                <div class="flex gap-2">
                                    <!-- Botón PDF -->
                                    <svg class="cursor-pointer hover:scale-110"
                                        @click="notificarPadre(scope.row, 'pdf')" xmlns="http://www.w3.org/2000/svg"
                                        width="80" height="80" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6H6z"
                                            fill="#E53E3E" />
                                        <path d="M14 2v6h6" fill="#FFF" />
                                        <text x="6" y="17" font-size="6" fill="#FFF"
                                            font-family="Arial, sans-serif">PDF</text>
                                    </svg>

                                    <!-- Botón JSON -->
                                    <svg class="cursor-pointer hover:scale-110" v-if="scope.row.enviado_cuve == 0"
                                        @click="notificarPadre(scope.row, 'json')" xmlns="http://www.w3.org/2000/svg"
                                        width="80" height="80" viewBox="0 0 24 24">
                                        <path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6H6z"
                                            fill="#f59e0b" />
                                        <path d="M14 2v6h6" fill="#FFF" />
                                        <text x="12" y="17" font-size="5.5" text-anchor="middle" fill="#FFF"
                                            font-family="Arial, sans-serif">{
                                            JSON }</text>
                                    </svg>

                                    <svg class="cursor-pointer hover:scale-110" v-if="scope.row.enviado_cuve == 1"
                                        @click="notificarPadre(scope.row, 'json')" xmlns="http://www.w3.org/2000/svg"
                                        width="80" height="80" viewBox="0 0 24 24">
                                        <path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6H6z"
                                            fill="#ab01ff" />
                                        <path d="M14 2v6h6" fill="#FFF" />
                                        <text x="12" y="17" font-size="5.5" text-anchor="middle" fill="#FFF"
                                            font-family="Arial, sans-serif">{
                                            CUVE }</text>
                                    </svg>

                                    <!-- Botón Excel -->
                                    <svg class="cursor-pointer hover:scale-110"
                                        @click="notificarPadre(scope.row, 'xlxs')" xmlns="http://www.w3.org/2000/svg"
                                        width="80" height="80" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6H6z"
                                            fill="#2F855A" />
                                        <path d="M14 2v6h6" fill="#FFF" />
                                        <text x="5" y="17" font-size="6" fill="#FFF"
                                            font-family="Arial, sans-serif">XLM</text>
                                    </svg>

                                    <!-- Botón RIPS -->
                                    <svg class="cursor-pointer hover:scale-110"
                                        @click="notificarPadre(scope.row, 'RIPS')" xmlns="http://www.w3.org/2000/svg"
                                        width="80" height="80" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6H6z"
                                            fill="#84B8F8" />
                                        <path d="M14 2v6h6" fill="#FFF" />
                                        <text x="5" y="17" font-size="6" fill="#FFF"
                                            font-family="Arial, sans-serif">RIPS</text>
                                    </svg>

                                </div>
                            </span>
                            <span v-else-if="columna.mascara === 'boton-icon'">
                                <el-button @click="notificarPadre(scope.row, 'edito')"
                                    class="bg-green-400 text-white hover:bg-green-50 hover:text-green-400 hover:border-green-400 border-2"
                                    round :icon="Edit" circle></el-button>
                            </span>

                            <span v-else-if="columna.mascara === 'boton-eliminar'">

                                <el-button @click="notificarPadre(scope.row, 'elimino')"
                                    class="bg-red-400 text-white hover:bg-red-50 hover:text-red-400 hover:border-red-400 border-2"
                                    round :icon="DeleteFilled" circle></el-button>

                            </span>
                            <span v-else :class="getDynamicClass(columna, scope.row[columna.prop], scope.row)">
                                {{ scope.row[columna.prop] }}
                            </span>
                        </template>
                    </el-table-column>
                </template>
            </el-table>
            <el-pagination v-if="totalRows > 0" v-model:current-page="currentPage" v-model:page-size="pageSize"
                :page-sizes="[5, 10, 20, 50]" :small="true" layout="total, sizes, prev, pager, next"
                :total="totalRowsFilter" @size-change="handleSizeChange" @current-change="cambioPagina_fn" />
        </div>
    </div>
</template>

<script>
import { ref, computed, watch } from "vue";
import * as XLSX from 'xlsx';
import { Edit, DeleteFilled, Check, Minus, Document, DocumentAdd } from "@element-plus/icons-vue";
export default {
    name: "smtable",
    props: {
        rows: {
            type: Array,
            default: () => [],
        },
        columns: {
            type: Array,
            default: () => [
                {
                    prop: "",
                    label: "",
                    width: 0,
                    mascara: "",
                },
            ],
        },
        exportar: true,
        nombreExcel: "reporte",
        getRowClassName: {
            type: Function,
            default: null, // o podrías omitir el valor por defecto si es opcional
        }, // Recibe la función para asignar la clase
    },
    emits: ["accionDesdeHijo", "dataSeleccionadaCecoRappi", "enviarFactura"], // Declaración del evento emitido
    methods: {
        getRowClass({ row }) {
            // Verifica si getRowClassName es una función antes de llamarla
            if (typeof this.getRowClassName === "function") {
                return this.getRowClassName(row);
            }
            // Si no es una función, puedes devolver un valor por defecto
            return ""; // o lo que desees como valor por defecto
        },
    },
    setup(props, { emit }) {
        const totalRows = ref(0);
        const totalRowsFilter = ref(0);
        const currentPage = ref(1);
        const pageSize = ref(10);
        const filtro = ref("");
        const multipleSelection = ref([]);

        const filteredData = computed(() => {
            if (!filtro.value) return props.rows;
            return props.rows.filter((row) => {
                return Object.keys(row).some((key) => {
                    return String(row[key])
                        .toLowerCase()
                        .includes(filtro.value.toLowerCase());
                });
            });
        });

        const displayedData = computed(() => {
            const startIndex = (currentPage.value - 1) * pageSize.value;
            const endIndex = startIndex + pageSize.value;
            totalRowsFilter.value = filteredData.value.length;
            return filteredData.value.slice(startIndex, endIndex);
        });

        const handleSelectionChange_fn = (val) => {
            multipleSelection.value = val;
            emit("dataSeleccionadaCecoRappi", multipleSelection.value);
        };

        const notificarPadre = (data, accion) => {
            emit("accionDesdeHijo", data, accion);
        };

        watch(
            () => props.rows,
            (newVal) => {
                totalRows.value = newVal.length;
                totalRowsFilter.value = newVal.length;
                emit("dataSeleccionadaCecoRappi", newVal);

            }
        );

        const cambioPagina_fn = (pag) => {
            currentPage.value = pag;
        };

        const handleSizeChange = (newSize) => {
            pageSize.value = newSize;
            currentPage.value = 1; // Opcional: reinicia la página a la primera cuando se cambia el tamaño
        };

        const formatDate_sm = (dateString) => {
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            const hours = String(date.getHours()).padStart(2, "0");
            const minutes = String(date.getMinutes()).padStart(2, "0");
            const seconds = String(date.getSeconds()).padStart(2, "0");

            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        };

        const formatNumber_sm = (number) => {
            if (number) {
                return number.toLocaleString("en-US", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                });
            }
            return 0;
        };

        const enviarFactura = (data) => {

            emit("enviarFactura", data);
        };


        const exportar_fn = () => {
            // Crear una nueva hoja de trabajo (workbook) y una hoja (worksheet)

            const ws = XLSX.utils.json_to_sheet(props.rows);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Datos");

            // Generar el archivo Excel
            XLSX.writeFile(wb, props.nombreExcel + ".xlsx");
        };

        const getDynamicClass = (col, valor, row) => {
            if (typeof col.cellClass === 'function') {
                return col.cellClass(valor, row)
            }
            return col.cellClass || ''
        }

        return {
            totalRows,
            currentPage,
            pageSize,
            filtro,
            totalRowsFilter,
            displayedData,
            Edit,
            DeleteFilled,
            cambioPagina_fn,
            getDynamicClass,
            exportar_fn,
            formatDate_sm,
            formatNumber_sm,
            handleSelectionChange_fn,
            handleSizeChange,
            notificarPadre,
            enviarFactura
        };
    },
};
</script>

<style>
.cell {
    line-height: 13px !important;
    font-size: 11px !important;
}

th {
    /* text-transform: capitalize; */
    font-size: 8px !important;
    background: #ebeef5 !important;
    color: #90a0c2 !important;
    font-weight: 500 !important;
}

/* Ocultar el checkbox en el encabezado de la tabla */
th .el-checkbox {
    display: none;
}

label.el-checkbox.is-checked {
    height: 12px !important;
}

.verde {
    background: #1ab39487 !important;
}

.rojo {
    background: #ed5565c2 !important;
}

.azul {
    background: #409effa6 !important;
}

.morado {
    background: #7040ffb2 !important;
}

.amarillo {
    background: #f8ac598a !important;
}
</style>