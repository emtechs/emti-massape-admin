import { FieldValues } from 'react-hook-form'
import { apiUsingNow, iSchoolServer, iUser } from '../../shared'

const connect = async (data: FieldValues): Promise<iUser> => {
  const { data: response } = await apiUsingNow.post<iUser>(
    'servers/connect',
    data,
  )
  return response
}

const create = async (data: FieldValues): Promise<iUser> => {
  const { data: response } = await apiUsingNow.post<iUser>('servers', data)
  return response
}

const destroy = async (id: string) => {
  await apiUsingNow.delete(`servers/${id}`)
}

interface iSchoolsReturn {
  total: number
  result: iSchoolServer[]
}

const schools = async (query: string) => {
  const { data: response } = await apiUsingNow.get<iSchoolsReturn>(
    `servers/schools${query}`,
  )
  return response
}

interface iListReturn {
  total: number
  result: iUser[]
}

const list = async (query: string): Promise<iListReturn> => {
  const { data: response } = await apiUsingNow.get<iListReturn>(
    `servers${query}`,
  )
  return response
}

const retrieve = async (id: string): Promise<iUser> => {
  const { data: response } = await apiUsingNow.get<iUser>(`servers/${id}`)
  return response
}

const verify = async (id: string) => {
  await apiUsingNow.get(`servers/verify/${id}`)
}

export const apiServer = {
  create,
  connect,
  list,
  schools,
  verify,
  retrieve,
  destroy,
}
