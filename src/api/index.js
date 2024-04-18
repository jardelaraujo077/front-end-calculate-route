import axios from 'axios'

 const api = axios.create({
        baseURL: `https://calculate-route-api.herokuapp.com`
    });


export default api;
