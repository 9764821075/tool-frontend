import axios from "axios"

axios.defaults.baseURL = "/api";
axios.defaults.headers.common["Content-Type"] = "application/json";
