import axios from 'axios';

// 📡 Apuntamos directamente al búnker de Marie en Render
const API_URL = 'https://cyberenteradosnews.onrender.com';

const api = axios.create({
    baseURL: API_URL
});

export default api;