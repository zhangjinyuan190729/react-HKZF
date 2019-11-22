import axios from "axios"
import { BASE_URL } from "./url.js"
export const Request  = axios.create({
    baseURL:BASE_URL
})