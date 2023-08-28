import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/v1/";

export const signupApi = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}user/signup`, userData);
  return response.data;
};

export const signinApi = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}user/signin`, userData);
  return response.data;
}

export const signOutApi = async (userData) => {
  const response = await axios.get(`${API_BASE_URL}user/logout`,{
    headers:{
      Authorization: `Bearer ${sessionStorage.getItem("token")}`
    }
  });
  return response.data;
}