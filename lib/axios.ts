import axios from 'axios';

const token = `Bearer ${process.env.API_ACCESS_TOKEN}`

const instance = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: token,
  },
});

export default instance;
