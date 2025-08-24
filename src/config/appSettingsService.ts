import { EndPoints } from '@/config/end-point';

// src/services/appSettingsService.js
export class AppSettingsService {
    /**
     * @description: End-point auth
     */
    static auth = {
        url: {
            login: EndPoints.urlBase('login'),
            userInfo: EndPoints.urlBase('api/v1/security/userInfo'),
            listarEstu:EndPoints.urlBase('execute-sp')
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

        /**
     * @description: End-point productos
     */
    static sp = {
        url: {
            sp: EndPoints.urlLocal(''),
        }
    }
}
