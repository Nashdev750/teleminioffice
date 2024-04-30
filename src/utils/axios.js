/**
 * axios setup to use mock service
 */

import axios from 'axios';
// https://mock-data-api-nextjs.vercel.app/
// const axiosServices = axios.create({ baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api/' });

const axiosServices = axios.create({ baseURL: 'http://localhost:4000/api/' });

// interceptor for http
axiosServices.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response.data) || 'Wrong Services')
);

export default axiosServices;
