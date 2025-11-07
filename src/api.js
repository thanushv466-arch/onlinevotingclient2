import axios from 'axios';

const API = axios.create({ baseURL:'https://digital-elections.onrender.com/api'});
//text changes
export default API;

