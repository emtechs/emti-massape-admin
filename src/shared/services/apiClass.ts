import { FieldValues } from 'react-hook-form'
import { apiUsingNow, iClass } from '../../shared'

const create = async (data: FieldValues): Promise<iClass> => {
  const { data: response } = await apiUsingNow.post<iClass>('classes', data)
  return response
}

const update = async (data: FieldValues, id: string): Promise<iClass> => {
  const { data: response } = await apiUsingNow.patch<iClass>(
    `classes/${id}`,
    data,
  )
  return response
}

interface ilistReturn {
  total: number
  result: iClass[]
}

const list = async (query: string): Promise<ilistReturn> => {
  const { data: response } = await apiUsingNow.get<ilistReturn>(
    `classes${query}`,
  )

  return response
}

const retrieve = async (id: string): Promise<iClass> => {
  const { data: response } = await apiUsingNow.get<iClass>(`classes/${id}`)

  return response
}

const verify = async (id: string) => {
  await apiUsingNow.get(`classes/verify/${id}`)
}

export const apiClass = {
  create,
  update,
  list,
  retrieve,
  verify,
}
