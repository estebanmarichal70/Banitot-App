import axios from "axios";
import {API_URL} from "../config/config";

const addDefaultHeaders = () => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${  JSON.parse(localStorage.getItem('accessToken'))}`;
}

export default {
  services: {
    login(data) {
      return axios.post(`${API_URL}/auth/login`, data);
    },
    register(data){
      return axios.post(`${API_URL}/auth/register`, data);
    },
    getAllArticulos(page, order, search, marca, preciomax, preciomin, categoria) {
      return axios.get(`${API_URL}/articulos?page=${  page  }&order=${  order  }&search=${  search  }&marca=${  marca   }&preciomax=${  preciomax  }&preciomin=${  preciomin  }&categoria=${  categoria}`);

    },
    getArticuloById(id) {
      return axios.get(`${API_URL}/articulos/${  id}`);
    },
    updateUser(data){
      console.log(data);
      addDefaultHeaders();
      return axios.put(`${API_URL}/auth/update`, data);
    },
    getCarrito(id){
      return axios.get(`${API_URL}/carrito/${  id}`);
    },
    atachCarrito(data){
      return axios.post(`${API_URL}/carrito/`, data);
    },
    detachCarrito(data){
      return axios.post(`${API_URL}/carrito/detach`, data);
    },
    getWishlist(id){
      return axios.get(`${API_URL}/wishlist/${  id}`);
    },
    atachWishlist(data){
      return axios.post(`${API_URL}/wishlist/`, data);
    },
    detachWishlist(data){
      return axios.post(`${API_URL}/wishlist/detach`, data);
    },
  }
}
