// src/services/authService.js

import { AppSettingsService } from '@/config/appSettingsService';
import { httpRequest } from '@/services/httpService';
import LZString from 'lz-string';
import type { userToken } from '@/interfaces/userType';

export class GeneralService {





    static async ejecutarSP(p0: string, parametros: { spName: string; params: any[]; }) {
        try {
            const response = await httpRequest(
                'POST',
                AppSettingsService.auth.url.listarEstu,
                {
                    spName: parametros.spName,
                    params: parametros.params
                }
            );

            console.log("Respuesta SP:", response);
            return response;
        } catch (err) {
            console.error("Error ejecutando SP:", err);
            throw err;
        }
    }




}
