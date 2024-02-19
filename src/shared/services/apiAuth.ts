import axios from 'axios'
import { FieldValues } from 'react-hook-form-mui'
import {
  iLoginRequest,
  iLoginResponse,
  iRecoveryPasswordRequest,
  iRecoveryRequest,
} from '../../shared'

const apiUsingNow = axios.create({
  baseURL: 'https://auth.emsolucoestecnologicas.com.br/',
  timeout: 100000,
})

const login = async (data: iLoginRequest): Promise<iLoginResponse> => {
  const { data: response } = await apiUsingNow.post<iLoginResponse>(
    'login',
    data,
  )
  return response
}

const refresh = async (token: string): Promise<iLoginResponse> => {
  const { data: response } = await apiUsingNow.post<iLoginResponse>(
    `token/${token}`,
  )
  return response
}

const verifyToken = async (token: string): Promise<string> => {
  const { data: response } = await apiUsingNow.get<string>(`token/${token}`)
  return response
}

const recovery = async (data: iRecoveryRequest): Promise<void> => {
  await apiUsingNow.post('password', {
    ...data,
    base_url: 'https://emtidigital-massape-admin.emsolucoestecnologicas.com.br',
  })
}

const passwordRecovery = async (
  data: iRecoveryPasswordRequest,
  userId: string,
  token: string,
): Promise<void> => {
  await apiUsingNow.post(`password/${userId}/${token}`, data)
}

const verifyPassword = async (
  data: iRecoveryPasswordRequest,
): Promise<void> => {
  await apiUsingNow.post('password/verify', data)
}

const createImage = async (data: FieldValues) => {
  const token = localStorage.getItem('@EMTechs:token')
  await apiUsingNow.post('images', data, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

const createUser = async (data: FieldValues): Promise<{ id: string }> => {
  const { data: response } = await apiUsingNow.post<{ id: string }>(
    'users',
    data,
  )
  return response
}

const updateUser = async (id: string, data: FieldValues) => {
  const token = localStorage.getItem('@EMTechs:token')
  await apiUsingNow.patch(`users/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export const apiAuth = {
  login,
  refresh,
  verifyToken,
  recovery,
  passwordRecovery,
  verifyPassword,
  createImage,
  createUser,
  updateUser,
}
