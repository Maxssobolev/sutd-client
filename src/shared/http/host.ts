import axios from 'axios';


const $host = axios.create({
  baseURL: process.env.API_URL,
});


export { $host };
