import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/v1/";

export const getAllProductsApi = async () => {
  const response = await axios.get(`${API_BASE_URL}product`,{
    headers:{
      Authorization: `Bearer ${sessionStorage.getItem("token")}`
    }
  });
  return response.data;
};

