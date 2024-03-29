import { FieldValues } from 'react-hook-form'
import { apiUsingNow, iPeriod, iYear } from '../../shared'

const create = async (data: FieldValues, id: string): Promise<iPeriod> => {
  const { data: response } = await apiUsingNow.post<iPeriod>(
    `/calendar/${id}`,
    data,
  )

  return response
}

const listYear = async (): Promise<iYear[]> => {
  const { data: response } = await apiUsingNow.get<iYear[]>(`/calendar/year`)

  return response
}

const createYear = async (data: FieldValues): Promise<iYear> => {
  const { data: response } = await apiUsingNow.post<iYear>(
    '/calendar/year',
    data,
  )

  return response
}

const year = async (year: number): Promise<iYear> => {
  const { data: response } = await apiUsingNow.get<iYear>(
    `/calendar/year/${year}`,
  )

  return response
}

interface iListPeriodReturn {
  result: iPeriod[]
  total: number
}

const listPeriod = async (query: string): Promise<iListPeriodReturn> => {
  const { data: response } = await apiUsingNow.get<iListPeriodReturn>(
    `/calendar/period${query}`,
  )

  return response
}

const updatePeriod = async (
  data: FieldValues,
  id: string,
): Promise<iPeriod> => {
  const { data: response } = await apiUsingNow.patch<iPeriod>(
    `/calendar/period/${id}`,
    data,
  )

  return response
}

export const apiCalendar = {
  year,
  create,
  createYear,
  listYear,
  listPeriod,
  updatePeriod,
}
