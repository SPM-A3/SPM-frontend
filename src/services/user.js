import {LOGIN, CHECK, ADMIN_LOGIN, ADMIN_CHECK} from '@/services/api'
import Cookies from 'js-cookie'
// import store from '../store/store'


export function isAdmin(){
  return getRole() === "admin";
}

export async function login(account, password) {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify({account,password}),
  };

  return fetch(LOGIN, requestOptions)
}

export async function adminLogin(account, password) {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify({account,password}),
  };

  return fetch(ADMIN_LOGIN, requestOptions)
}

export async function tokenLogin(){
  var myHeaders = new Headers();
  myHeaders.append("token", getAccessToken());

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
  };
  if(isAdmin()){
    return fetch(ADMIN_CHECK, requestOptions);
  }
  return fetch(CHECK, requestOptions);
}


export function setAccessToken(token){
  Cookies.set("access_token", token)
}

export function getAccessToken(){
  return Cookies.get("access_token");
}

export function setUserInfo(userInfo){
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
}

export function getUserInfo(){
  return JSON.parse(localStorage.getItem("userInfo"));
}

export function setRole(role){
  localStorage.setItem("role", role);
}

export function getRole(){
  return localStorage.getItem("role");
}

export function clearUserInfo(){
  localStorage.removeItem('userInfo')
  clearRole();
}

export function clearRole(){
  localStorage.removeItem('role');
}

export function refreshUserInfo(){
  localStorage.removeItem('userInfo');
  tokenLogin()
    .then(res => res.json())
    .then( res => {
      const {data, code, msg} = res;
      console.log(res)
      if(code == 0 || code == '0'){
        setUserInfo(data);
      }else{
        clearUserInfo()
      }
    })
    .catch( err => {
      console.log(err);
    })
}

/**
 * 退出登录
 */
export function logout() {
  Cookies.remove("access_token");
  clearUserInfo('userInfo');
}

export default {
  login,
  setAccessToken,
  getAccessToken,
  getUserInfo,
  setUserInfo,
  refreshUserInfo,
  logout,
}
