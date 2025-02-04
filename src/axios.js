import axios from 'axios';

const token = localStorage.getItem('token'); // or use a different method for token retrieval

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api', // Your API base URL
  headers: {
    Authorization: `Bearer ${token}`, // Add token to Authorization header
  },
});

export default axiosInstance;
