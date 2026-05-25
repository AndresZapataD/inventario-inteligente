import axios from "axios";

const API_URL = "http://localhost:3000/api/tipos-documento";

const getAll = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo tipos de documento:", error);
    throw error;
  }
};

const getById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo tipo de documento:", error);
    throw error;
  }
};

const create = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.error("Error creando tipo de documento:", error);
    throw error;
  }
};

const update = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error actualizando tipo de documento:", error);
    throw error;
  }
};

const remove = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error eliminando tipo de documento:", error);
    throw error;
  }
};

export default {
  getAll,
  getById,
  create,
  update,
  remove
};