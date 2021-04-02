import axios from 'axios'

axios.defaults.withCredentials=true

export default function requested(
  url,
  method = 'get',
  data,
  headers={'Content-Type': 'application/json',
    "token":localStorage.getItem("token")}) {
  return axios({ method, url, data, timeout:60000,headers})
}
