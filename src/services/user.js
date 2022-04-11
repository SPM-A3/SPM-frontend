import {LOGIN, CHECK} from '@/services/api'
import Cookies from 'js-cookie'
/**
 * 登录服务
 * @param account 账户名
 * @param password 账户密码
 * @returns 
 */
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

export async function tokenLogin(){
  var myHeaders = new Headers();
  myHeaders.append("token", getAccessToken());

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
  };

  return fetch(CHECK, requestOptions)
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
  return localStorage.getItem("userInfo");
}

export function clearUserInfo(){
  localStorage.removeItem('userInfo')
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
  logout,
}