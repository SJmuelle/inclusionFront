import apiClient from '@/config/axiosConfig';
import type { HttpMethod } from '@/interfaces/httpType';
import router from '@/router';
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

  // Algunos clientes Axios devuelven el código en error.response.status
  const status = error?.response?.status || error?.status;

  if (status === 403) {
    logout();
  }
  console.error('Error en la solicitud HTTP:', error.message);
}

function logout() {
  // Limpia datos de sesión
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
  sessionStorage.clear();

  // Redirige a login
  router.push({ name: 'Login' });
}

export { httpRequest };
