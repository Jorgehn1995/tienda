import Vue from "vue";
import axios from "axios";
import VueCookie from "vue-cookie";

axios.defaults.baseURL = "/api/";
axios.interceptors.request.use(
    (config) => {
        const token = VueCookie.get("token");
        if (token) {
            config.headers.Authorization = `${token}`;
        }
        return config;
    },
    (response) => {
        //console.log(response.status);
        return Promise.resolve(response);
    },
    (error) => {
        return Promise.reject(error);
    }
);

Vue.prototype.$axios = axios;
