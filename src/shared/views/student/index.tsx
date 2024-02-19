import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Footer,
  PaginationTable,
  TableStudent,
  apiStudent,
  iStudent,
  useParamsContext,
} from '../../../shared'

export const ViewStudentPage = () => {
  const { setCount, setIsLoading } = useParamsContext()
  const [searchParams] = useSearchParams()
  const [listData, setListData] = useState<iStudent[]>([])

  const page = Number(searchParams.get('page') || 1)
  const is_active = searchParams.get('is_active')

  const getStudents = useCallback((query: string) => {
    setIsLoading(true)
    apiStudent
      .list(query)
      .then((res) => {
        setListData(res.result)
        setCount(res.total)
      })
      .finally(() => setIsLoading(false))
  }, [])

  const define_query = useMemo(() => {
    let query = `?take=5&skip=${5 * (page - 1)}`
    if (is_active) query += `&is_active=${is_active}`

    return query
  }, [is_active, page])

  const list = () => getStudents(define_query)

  useEffect(() => getStudents(define_query), [define_query])

  return (
    <>
      <TableStudent listData={listData} list={list} />
      <PaginationTable />
      <Footer />
    </>
  )
}
