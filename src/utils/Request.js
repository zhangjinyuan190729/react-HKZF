import axios from "axios"
import { BASE_URL } from "./url.js"
import {getToken} from "./token"
 let Request  = axios.create({
    baseURL:BASE_URL
})
Request.interceptors.request.use((config)=>{
    if(config.url.startsWith("/user")&& !config.url.startsWith("/user/login")&& !config.url.startsWith("/user/registered")){
        config.headers.authorization = getToken()
    }
    // console.log(config);
    return config
})
export {Request}