import axios from 'axios';

export const httpClient = axios.create({
  baseURL: `https://api.byecom.in/api/`, //YOUR_API_URL HERE
  headers: {
    'Content-Type': 'application/json',
    api_key: '',
  },
});
