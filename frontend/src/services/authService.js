import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";

export const login = async (userData) => {

  const response = await axios.post(
    `${API_URL}/login`,
    userData
  );

  return response.data;
};