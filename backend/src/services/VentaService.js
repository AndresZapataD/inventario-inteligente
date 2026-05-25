import axios from "axios";

const API_URL = "http://localhost:3000/api/ventas";

const VentaService = {

  // Obtener todas las ventas
  getAll: async () => {
    return await axios.get(API_URL);
  },

  // Obtener una venta por ID
  getById: async (id) => {
    return await axios.get(`${API_URL}/${id}`);
  },

  // Crear venta
  create: async (ventaData) => {
    return await axios.post(API_URL, ventaData);
  },

  // Actualizar venta
  update: async (id, ventaData) => {
    return await axios.put(`${API_URL}/${id}`, ventaData);
  },

  // Eliminar venta
  delete: async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
  }

};

export default VentaService;