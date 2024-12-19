import axios from "axios";

const api = axios.create({
  baseURL: "http://94.74.86.174:8080/api",
  timeout: 10000,
});

export const registerAPI = async (params) => {
  const response = await api.post("/register", params, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};

export const loginAPI = async (params) => {
  const response = await api.post("/login", params, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};
