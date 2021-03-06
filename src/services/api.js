//跨域代理前缀
// const API_PROXY_PREFIX='/api'
// const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_BASE_URL : API_PROXY_PREFIX
const BASE_URL =  "http://101.43.38.236:8085"
// const BASE_URL =  "http://175.24.201.104:8085";
module.exports = {
  ADMIN_LOGIN: `${BASE_URL}/api/admin/login`,
  LOGIN: `${BASE_URL}/api/user/login`,
  REGISTER: `${BASE_URL}/api/user/register`,
  CHECK: `${BASE_URL}/api/user/login/check`,
  ADMIN_CHECK: `${BASE_URL}/api/admin/login/check`,
}
