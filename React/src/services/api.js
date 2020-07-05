import axios from "axios";
const api = axios.create({
    baseURL: "https://e-ncarte.com"
})

export default api;