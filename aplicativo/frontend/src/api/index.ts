import Axios from "axios";

// export const baseURL = "http://localhost:1337";
export const baseURL = "http://192.168.0.7:1337";
export const api = Axios.create({
    baseURL: `${baseURL}/api/`,
    timeout: 10000
});
