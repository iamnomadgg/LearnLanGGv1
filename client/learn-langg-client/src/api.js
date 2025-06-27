import axios from 'axios';

const api = axios.create({
    baseURL: '/api', //Vite proxy, this maps to http://localhost:5000
});

export default api;
