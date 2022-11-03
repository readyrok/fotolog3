import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/files/";

const upload = (formData) => {
    return axios.post(API_URL, formData, {
        headers: authHeader()
    });
};

const FileService = {
    upload
}

export default FileService;