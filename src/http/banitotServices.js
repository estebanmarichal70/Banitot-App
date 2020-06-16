import axios from "axios";
import {API_URL} from "../config/config";

export default {
  services: {
    login(data) {
      return axios.post(API_URL + "/auth/login", data);
    },
    getAllArticulos(page, order, search, marca, preciomax, preciomin) {
      console.log(preciomin);
      console.log(preciomax);
      return axios.get(API_URL + "/articulos?page=" + page + "&order=" + order + "&search=" + search + "&marca=" + marca  + "&preciomax=" + preciomax + "&preciomin=" + preciomin);

    },
    getArticuloById(id) {
      return axios.get(API_URL + "/articulos/" + id);
    },
    register(data){
      return axios.post(API_URL + "/auth/register", data);
    }
  }
}
