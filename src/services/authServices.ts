// src/services/authService.js

import { AppSettingsService } from '@/config/appSettingsService';
import { httpRequest } from '@/services/httpService';
import LZString from 'lz-string';
import type { userToken } from '@/interfaces/userType';

export class AuthService {


    static async login(credentials: { username: string, password: string }) {

        const response = await httpRequest('POST', AppSettingsService.auth.url.login, credentials);

        if (response.success) {
            this.setToken(response.data);

            return AuthService.setUserInfo()
        }
        return response;

    }


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


    private static async setUserInfo() {
        const response = await httpRequest('POST', AppSettingsService.auth.url.userInfo);
        if (response.success) {
            localStorage.setItem('propExt', JSON.stringify(response.data.propExt));
        }
        response.type = 1
        return response;
    }

    static getToken() {
        return localStorage.getItem('token');
    }

    static setToken(token: string) {
        localStorage.setItem('token', token);
    }

    static isAuthenticated(): Boolean {
        let res: Boolean = !!localStorage.getItem('token')
        return res;
    }


    static getUserInfo(): userToken | null {
        const dscTk = this.getToken();
        if (dscTk !== null) {
            const decompressedTk = LZString.decompressFromEncodedURIComponent(dscTk);
            if (decompressedTk) {

                return JSON.parse(decompressedTk);

            }
        }

        return null

    }

    static getPropExt(): any {
        return JSON.parse(localStorage.getItem('propExt') + '');
    }





    static logout() {
        localStorage.removeItem('token');
    }


}
