import axios from 'axios';

// 🚀 CONEXIÓN AL BÚNKER REAL (Render)
// Agregamos el /api final para que el enrutamiento sea exacto
const API_URL = 'https://cyberenteradosnews.onrender.com/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;