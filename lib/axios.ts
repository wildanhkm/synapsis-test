import axios from 'axios';

const token = `Bearer ${process.env.NEXT_PUBLIC_API_ACCESS_TOKEN}`;

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: '0',
    Authorization: token,
  },
});

export default instance;
