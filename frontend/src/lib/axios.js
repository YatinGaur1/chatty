import axios from "axios";

export const axiosInstance=axios.create({
baseURL: import.meta.env.MODE === "development"?"http://localhost:5005/api":"/api",
withCredentials:true,//this is for send cookie for every single request if cookie present in that api code,
});