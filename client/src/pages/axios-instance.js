import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", // Replace with a default backend URL
  withCredentials: true, // This will include cookies in the requests
});

export default instance;
