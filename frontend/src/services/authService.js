import api from "./api";

const API_URL =`${import.meta.env.VITE_API_URL}/auth`;

export const registerUser = (userData) => {
  return api.post(
    `${API_URL}/register`,
    userData
  );
};

export const loginUser = (credentials) => {
  return api.post(
    `${API_URL}/login`,
    credentials
  );
};

