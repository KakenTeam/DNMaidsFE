import axios from 'axios';

export default axios.create({
  baseURL: 'https://dnmaids.herokuapp.com/api/',
});