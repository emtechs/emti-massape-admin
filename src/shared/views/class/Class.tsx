import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Footer,
  PaginationTable,
  TableClass,
  apiClass,
  iClass,
  useParamsContext,
} from '../../../shared'

export const ViewClassPage = () => {
  const { setCount, setIsLoading } = useParamsContext()
  const [searchParams] = useSearchParams()
  const [listData, setListData] = useState<iClass[]>([])

  const page = Number(searchParams.get('page') || 1)
  const is_active = searchParams.get('is_active')

  const getClass = useCallback((query: string) => {
    setIsLoading(true)
    apiClass
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

  const list = () => getClass(define_query)

  useEffect(() => getClass(define_query), [define_query])

  return (
    <>
      <TableClass listData={listData} list={list} />
      <PaginationTable />
      <Footer />
    </>
  )
}
