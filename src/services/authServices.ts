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

    private static async setUserInfo() {
        const response = await httpRequest('GET', AppSettingsService.auth.url.userInfo);
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
