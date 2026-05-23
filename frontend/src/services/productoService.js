import axios from "axios";

const API_URL = "http://localhost:3000/api/productos";

class ProductoService {

  async getAll() {

    const response = await axios.get(API_URL);

    return response.data;
  }

  async getById(id) {

    const response = await axios.get(`${API_URL}/${id}`);

    return response.data;
  }

  async create(data) {

    const response = await axios.post(API_URL, data);

    return response.data;
  }
async update(id, data) {

  const response = await axios.put(
    `${API_URL}/${id}`,
    data
  );

  if (!response.data) {
    throw new Error("No se recibió respuesta del servidor");
  }

  return response.data;
}

  async delete(id) {

    const response = await axios.delete(`${API_URL}/${id}`);

    return response.data;
  }
}

export default new ProductoService();