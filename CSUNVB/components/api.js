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

  getMissingChecks(baseId){
    return connectAPI.get('missingchecks/'+baseId, config)
  }
  
  getReports(){
    return connectAPI.get("reports/", config)
  }

  getMyActionInShift(actionId){
    return connectAPI.get("myactionsinshift/"+actionId, config)
  }

  getUnconfirmedWorkPlan(){
    return connectAPI.get('unconfirmedworkplans', config)
  }


  postConfirmWorkPlan(payload){
    return connectAPI.post('confirmworkplan', payload, config)
  }

  postNovaCheck(payload){
    return connectAPI.post('novacheck', payload, config)
  }

  postPharmaCheck(payload){
    return connectAPI.post('pharmacheck', payload, config)
  }

}

const APIKit = new API();
export default APIKit;
