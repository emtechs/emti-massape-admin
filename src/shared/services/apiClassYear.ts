import { FieldValues } from 'react-hook-form'
import { apiUsingNow, iClassYear } from '../../shared'

const create = async (data: FieldValues): Promise<iClassYear> => {
  const { data: response } = await apiUsingNow.post<iClassYear>(
    'classyear',
    data,
  )
  return response
}

interface ilistReturn {
  total: number
  result: iClassYear[]
}

const list = async (query: string): Promise<ilistReturn> => {
  const { data: response } = await apiUsingNow.get<ilistReturn>(
    `classyear${query}`,
  )

  return response
}

const schools = async (query: string): Promise<ilistReturn> => {
  const { data: response } = await apiUsingNow.get<ilistReturn>(
    `classyear/schools${query}`,
  )

  return response
}

const destroy = async (id: string) => {
  await apiUsingNow.delete(`classyear/${id}`)
}

export const apiClassYear = {
  create,
  list,
  schools,
  destroy,
}
