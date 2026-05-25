import axios from "axios";

const API_URL = "http://localhost:3000/api/detalles-venta";

const DetalleVentaService = {

  // Obtener todos los detalles
  getAll: async () => {
    return await axios.get(API_URL);
  },

  // Obtener detalle por ID
  getById: async (id) => {
    return await axios.get(`${API_URL}/${id}`);
  },

  // Crear detalle
  create: async (detalleData) => {
    return await axios.post(API_URL, detalleData);
  },

  // Actualizar detalle
  update: async (id, detalleData) => {
    return await axios.put(`${API_URL}/${id}`, detalleData);
  },

  // Eliminar detalle
  delete: async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
  }

};

export default DetalleVentaService;