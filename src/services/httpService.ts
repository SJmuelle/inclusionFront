import apiClient from '@/config/axiosConfig';
import type { HttpMethod } from '@/interfaces/httpType';

async function httpRequest(method: HttpMethod, endpoint: string, data?: any) {
  try {
    const response = await apiClient.request({
      url: endpoint,
      method: method,
      data: data,
    });
    return response.data;
  } catch (error: any) {
    handleError(error);
    throw error;
  }
}

function handleError(error: any) {
  console.error('Error en la solicitud HTTP:', error.message);
  // Aquí puedes agregar manejo de errores adicional, como mostrar una notificación al usuario
}

export { httpRequest };
