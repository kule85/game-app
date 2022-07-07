import axios from 'axios'

export let request = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
})

request.interceptors.response.use(
  async (config) => {
    return config
  },
  async (error) => {
    return Promise.reject(error)
  }
)
