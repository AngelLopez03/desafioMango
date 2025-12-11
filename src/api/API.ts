import axios from "axios";
import { AppConfig } from "../config/config";

const API = axios.create({
    timeout: AppConfig.apiTimeout,
    baseURL: AppConfig.apiBaseUrl,
    headers: {
        'Content-Type': 'Application/json',
    },
});

export default API;