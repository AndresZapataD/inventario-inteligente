import axios from "axios";

const API_URL = "http://localhost:3000/api/clientes";

const getAll = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

const create = async (cliente) => {
  const response = await axios.post(API_URL, cliente);
  return response.data;
};

const update = async (id, cliente) => {
  const response = await axios.put(`${API_URL}/${id}`, cliente);
  return response.data;
};

const remove = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export default {
  getAll,
  getById,
  create,
  update,
  remove
};