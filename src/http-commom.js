import axios from 'axios';

export default axios.create({
  baseURL: 'https://ac9789.store/api/',
  headers: {
    "Content-type": "application/json",  
    'authorization': `Bearer ${window.localStorage.getItem('token')}`
  }
});