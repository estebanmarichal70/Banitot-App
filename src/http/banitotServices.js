import axios from "axios";
import {API_URL} from "../config/config";

export default {
  services: {
    login(data){
      return axios.post(API_URL + "/auth/login");
    }
  }
}
