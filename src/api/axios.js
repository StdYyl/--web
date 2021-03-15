import axios from 'axios'

export default function requested(url, method = 'get', data, headers={'Content-Type': 'application/x-www-form-urlencoded'}) {
  return axios({ method, url, data, timeout:60000,headers})
}
