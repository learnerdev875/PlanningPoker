import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost/planning-poker",
});

export default API;
