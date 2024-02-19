/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { apiAuth, apiToken } from '../../shared'

export const baseURL = 'https://emti-massape-api.vercel.app/'

export const apiUsingNow = axios.create({
  baseURL,
  timeout: 100000,
})

apiUsingNow.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('@EMTechs:token')
    config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => {
    Promise.reject(error)
  },
)

apiUsingNow.interceptors.response.use(
  (response) => {
    return response
  },
  async function (error) {
    const originalRequest = error.config
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true
      const tokenLocal = String(localStorage.getItem('@EMTechs:refresh_token'))

      try {
        const { refresh_token, token } = await apiAuth.refresh(tokenLocal)
        await apiToken.verify(token)
        axios.defaults.headers.common.Authorization = `Bearer ${token}`
        localStorage.setItem('@EMTechs:token', token)
        localStorage.setItem('@EMTechs:refresh_token', refresh_token)
        return apiUsingNow(originalRequest)
      } catch (error: any) {
        localStorage.removeItem('@EMTechs:token')
        location.href = ''
        if (error.response && error.response.data) {
          return Promise.reject(error.response.data)
        }
      }
    }
    return Promise.reject(error)
  },
)
