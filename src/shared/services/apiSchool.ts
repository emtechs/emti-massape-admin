import { FieldValues } from 'react-hook-form'
import { apiUsingNow, iSchool } from '../../shared'

const create = async (data: FieldValues): Promise<iSchool> => {
  const { data: response } = await apiUsingNow.post<iSchool>('schools', data)
  return response
}

const update = async (data: FieldValues, id: string): Promise<iSchool> => {
  const { data: response } = await apiUsingNow.patch<iSchool>(
    `schools/${id}`,
    data,
  )
  return response
}

interface iList {
  total: number
  result: iSchool[]
}

const list = async (query: string): Promise<iList> => {
  const { data: response } = await apiUsingNow.get<iList>(`schools${query}`)

  return response
}

const retrieve = async (id: string): Promise<iSchool> => {
  const { data: response } = await apiUsingNow.get<iSchool>(`schools/${id}`)

  return response
}

const verify = async (id: string) => {
  await apiUsingNow.get(`schools/verify/${id}`)
}

export const apiSchool = {
  create,
  update,
  list,
  retrieve,
  verify,
}
