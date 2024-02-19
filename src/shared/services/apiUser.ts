import { FieldValues } from 'react-hook-form'
import { apiUsingNow, iUser } from '../../shared'

const create = async (data: FieldValues): Promise<iUser> => {
  const { data: response } = await apiUsingNow.post<iUser>('users', data)
  return response
}

interface iListReturn {
  total: number
  result: iUser[]
}

const list = async (query: string): Promise<iListReturn> => {
  const { data: response } = await apiUsingNow.get<iListReturn>(`users${query}`)
  return response
}

const profile = async (): Promise<iUser> => {
  const { data: response } = await apiUsingNow.get<iUser>('users/profile')

  return response
}

const verify = async (id: string) => {
  await apiUsingNow.get(`users/verify/${id}`)
}

const retrieve = async (id: string): Promise<iUser> => {
  const { data: response } = await apiUsingNow.get<iUser>(`users/${id}`)
  return response
}

const update = async (id: string, data: FieldValues): Promise<iUser> => {
  const { data: response } = await apiUsingNow.patch<iUser>(`users/${id}`, data)
  return response
}

export const apiUser = {
  create,
  list,
  profile,
  verify,
  retrieve,
  update,
}
