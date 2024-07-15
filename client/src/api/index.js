import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const signIn = (formData) => API.post("/user/signin", formData);

export const signUp = (formdata, code) => API.post(`/user/signup`, formdata);

export const passwordReset = (passwordForm, code) =>
  API.patch(`/user/reset/${code}`, passwordForm);