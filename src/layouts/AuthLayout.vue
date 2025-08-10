<template>
    <div
        class="h-full h-screen flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0">
        <div
            class="relative hidden md:flex flex-auto items-center justify-center h-full p-16 lg:px-28 overflow-hidden bg-gray-800 dark:border-r">
            <svg viewBox="0 0 220 192" width="300" height="300" fill="none"
                class="absolute -top-16 -right-16 text-gray-700 ng-tns-c4179171547-51">
                <defs class="ng-tns-c4179171547-51">
                    <pattern id="837c3e70-6c3a-44e6-8854-cc48c737b659" x="0" y="0" width="20" height="20"
                        patternUnits="userSpaceOnUse" class="ng-tns-c4179171547-51">
                        <rect x="0" y="0" width="4" height="4" fill="currentColor" class="ng-tns-c4179171547-51"></rect>
                    </pattern>
                </defs>
                <rect width="300" height="300" fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
                    class="ng-tns-c4179171547-51"></rect>
            </svg>
            <svg class="absolute inset-0 pointer-events-none" xmlns="http://www.w3.org/2000/svg" version="1.1"
                viewBox="0 0 1080 1080" width="100%" height="100%">
                <g transform="scale(10)">
                    <g transform="matrix(1 0 0 1 50 50)">
                        <g>
                            <g transform="matrix(1 0 0 1 -49.72 -50)">
                                <path style="fill: rgba(55, 65, 81, 0.25);"
                                    d="M 61.661 14.239 C 75.599 14.239 86.982 25.568 86.982 39.506 C 86.982 50.999 79.318 60.716 68.823 63.769 L 55.941 41.448 L 51.443 49.333 L 51.443 37.061 L 36.451 37.061 C 37.729 24.235 48.501 14.239 61.661 14.239 z" />
                            </g>
                            <g transform="matrix(1 0 0 1 -19.05 7.02)">
                                <polygon style="fill: rgba(55, 65, 81, 0.25);"
                                    points="-17.94,-17.41 17.94,-17.41 17.94,-3.31 11.49,7.86 6,17.41 -17.94,17.41" />
                            </g>
                            <g transform="matrix(1 0 0 1 5.97 16.16)">
                                <polygon style="fill: rgba(55, 65, 81, 0.25);"
                                    points="-0.03,-19.6 11.3,0 22.63,19.6 -22.63,19.6 -11.35,0" />
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
            <!-- @formatter:on -->
            <!-- Content -->
            <div class="z-10 relative w-full max-w-2xl">
                <div class="text-6xl font-bold leading-none text-gray-100">
                    <div>Sistema de Inclusión</div>
                </div>
                <div class="mt-6 text-2xl tracking-tight leading-6 text-gray-400">
                    La diversidad nos permite ver lo importante, valioso y único que encontramos en las diferencias. 
                    Aquí diseñamos un sistema que reconoce la diversidad, integra sus necesidades y fortalece sus potencialidades.
                </div>
                <div class="mt-8 flex flex-0 items-center -space-x-1.5 "><img src="/src/assets/logoAlcaldia.jpg"
                        class="h-10 rounded-full flex-0 router object-cover ring-4 ring-gray-800 ring-offset-1 ring-offset-gray-800 ">
                    <div class="ml-10 pl-3 font-medium tracking-tight text-gray-400 ng-tns-c210218206-60"> ALCALDIA DE
                         </div>
                    <div class="ml-10 pl-3 font-extrabold text-2xl tracking-tight text-gray-400 ng-tns-c210218206-60"> 
                        BARRANQUILLA </div>
                </div>
            </div>

        </div>
        <div
            class="md:flex md:items-center md:justify-start w-full sm:w-auto md:h-full  py-8 px-4 sm:p-12 md:p-16 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none sm:bg-card">
            <router-view></router-view>
        </div>
    </div>

</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>