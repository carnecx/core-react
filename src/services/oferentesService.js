import api from './api';

// Core2: oferentes relacionados a un puesto
export const getOferentesPorPuesto = async (codigoPuesto) => {
  const response = await api.get(`/api/oferentes/por-puesto/${codigoPuesto}`);
  return response.data;
};

// Core8: detalle de un oferente
export const getOferenteDetalle = async (identificacion) => {
  const response = await api.get(`/api/oferentes/${identificacion}`);
  return response.data;
};

// Aut3: postulación de un oferente a un puesto (con currículum)
export const crearPostulacion = async (datos, archivoCurriculum) => {
  const formData = new FormData();
  formData.append('Identificacion', datos.identificacion);
  formData.append('TipoIdentificacion', datos.tipoIdentificacion);
  formData.append('NombreCompleto', datos.nombreCompleto);
  formData.append('FechaNacimiento', datos.fechaNacimiento);
  formData.append('Correos', datos.correos);
  formData.append('Telefonos', datos.telefonos);
  formData.append('CodigoPuesto', datos.codigoPuesto);
  if (archivoCurriculum) {
    formData.append('Curriculum', archivoCurriculum);
  }

  const response = await api.post('/api/oferentes/postulacion', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};