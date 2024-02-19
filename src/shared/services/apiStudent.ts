import { FieldValues } from 'react-hook-form'
import { apiUsingNow, iStudent } from '../../shared'

const create = async (data: FieldValues): Promise<iStudent> => {
  const { data: response } = await apiUsingNow.post<iStudent>('students', data)
  return response
}

interface ilistReturn {
  total: number
  result: iStudent[]
}

const list = async (query: string): Promise<ilistReturn> => {
  const { data: response } = await apiUsingNow.get<ilistReturn>(
    `students${query}`,
  )

  return response
}

export const apiStudent = {
  create,
  list,
}
