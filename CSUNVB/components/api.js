import axios from "axios";

let connectAPI = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  timeout: 10000,
});

let config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("user_token"),
  },
};

class API {
  getBases() {
    return connectAPI.get("bases", {});
  }

  getToken(payload) {
    return connectAPI.post("gettoken", payload)
  }

  getUser(){
    return connectAPI.get('user', config)
  }


  postNovaCheck(payload){
    return connectAPI.post('novacheck', payload, config)
  }


}

const APIKit = new API();
export default APIKit;
