// src/services/authService.js

import { AppSettingsService } from '@/config/appSettingsService';
import type { SeachProducts } from '@/interfaces/productTypes';
import { httpRequest } from '@/services/httpService';

export class ProductService {


    static async seachProducts(product: SeachProducts) {

        const response = await httpRequest('POST', AppSettingsService.productos.url.busquedaCodDes, product);

        if (response.success) {
          
        }
        return response;

    }
}