import axios from 'axios';

const token = `Bearer ${process.env.NEXT_PUBLIC_API_ACCESS_TOKEN}`

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://gorest.co.in/',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: token,
  },
});

export default instance;
