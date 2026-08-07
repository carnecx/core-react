import api from './api';

export const getPuestosActivos = async () => {
  const response = await api.get('/api/puestos/activos');
  return response.data;
};