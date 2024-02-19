import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Footer,
  PaginationTable,
  TableSchool,
  apiSchool,
  iSchool,
  useParamsContext,
} from '../../../shared'

export const ViewSchoolPage = () => {
  const { setCount, setIsLoading } = useParamsContext()
  const [searchParams] = useSearchParams()
  const [listData, setListData] = useState<iSchool[]>([])

  const page = Number(searchParams.get('page') || 1)
  const is_active = searchParams.get('is_active')
  const is_director = searchParams.get('is_director')

  const getSchools = useCallback((query: string) => {
    setIsLoading(true)
    apiSchool
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
    if (is_director) query += `&is_director=${is_director}`
    return query
  }, [is_active, is_director, page])

  const list = () => getSchools(define_query)

  useEffect(() => getSchools(define_query), [define_query])

  return (
    <>
      <TableSchool listData={listData} list={list} />
      <PaginationTable />
      <Footer />
    </>
  )
}
