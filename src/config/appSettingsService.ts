import { EndPoints } from '@/config/end-point';

// src/services/appSettingsService.js
export class AppSettingsService {
    /**
     * @description: End-point auth
     */
    static auth = {
        url: {
            login: EndPoints.urlBase('sso/sapi/v1/security/login'),
            userInfo: EndPoints.urlBase('api/v1/security/userInfo'),
        }
    }

    /**
     * @description: End-point productos
     */
    static productos = {
        url: {
            busquedaCodDes: EndPoints.urlLocal('ServicesEposWeb/api/ewpos/referencias/buscarproductos'),
        }
    }
}
