import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";
const API_USER_URL = "http://localhost:8080/files/";

const isPostLiked = (postId) => {
  return axios.get(API_USER_URL + "likes/" + postId + "/" + JSON.parse(localStorage.getItem("user"))["id"], { headers: authHeader() });
}

const saveLike = (postId) => {
  return axios.post(API_USER_URL + "likes/" + postId, "like", { headers: authHeader() });
}

const deleteLike = (postId) => {
  return axios.delete(API_USER_URL + "likes/" + postId + "/" + JSON.parse(localStorage.getItem("user"))["id"], {headers: authHeader()});
}

const countLikes = (postId) => {
  return axios.get(API_USER_URL + "like/" + postId, {headers: authHeader()} )
}

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getTimeline = () => {
  return axios.get(API_USER_URL, { headers: authHeader() });
};

const getUserBoard = () => {
  if(JSON.parse(localStorage.getItem("user"))["username"]){
    return axios.get(API_USER_URL + JSON.parse(localStorage.getItem("user"))["username"], { headers: authHeader() });
  }else{
    localStorage.setItem("username", "GUEST");
    return "GUEST";
  }
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
  getTimeline,
  saveLike,
  deleteLike,
  countLikes,
  isPostLiked
};

export default UserService;