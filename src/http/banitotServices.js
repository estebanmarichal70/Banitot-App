import axios from "axios";
import {API_URL} from "../config/config";

export default {
  services: {
    login(data) {
      return axios.post(API_URL + "/auth/login", data);
    },
    getAllArticulos(page, order, search) {
      return axios.get(API_URL + "/articulos?page=" + page + "&order=" + order + "&search=" + search);
    }
  }
}
