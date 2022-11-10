import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";
const API_USER_URL = "http://localhost:8080/files/";


const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getTimeline = () => {
  return axios.get(API_USER_URL, { headers: authHeader() });
};

const getUserBoard = () => {
  return axios.get(API_USER_URL + JSON.parse(localStorage.getItem("user"))["username"], { headers: authHeader() });
};

const getFile = (url) => {
  console.log("getFile url: " + url);
  return axios.get(url, { headers: authHeader() });
}

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getFile,
  getTimeline
};

export default UserService;