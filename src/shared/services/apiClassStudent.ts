import { FieldValues } from 'react-hook-form'
import { apiUsingNow, iClassStudent } from '../../shared'

const create = async (data: FieldValues): Promise<iClassStudent> => {
  const { data: response } = await apiUsingNow.post<iClassStudent>(
    'classstudent',
    data,
  )
  return response
}

const createSchool = async (data: FieldValues): Promise<iClassStudent> => {
  const { data: response } = await apiUsingNow.post<iClassStudent>(
    'classstudent/school',
    data,
  )
  return response
}

interface ilistReturn {
  total: number
  result: iClassStudent[]
}

const list = async (query: string): Promise<ilistReturn> => {
  const { data: response } = await apiUsingNow.get<ilistReturn>(
    `classstudent${query}`,
  )

  return response
}

const destroy = async (id: string) => {
  await apiUsingNow.delete(`classstudent/${id}`)
}

export const apiClassStudent = {
  create,
  createSchool,
  list,
  destroy,
}
