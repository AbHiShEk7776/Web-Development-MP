import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:5000", // This will read from the .env file
});

export default api;
