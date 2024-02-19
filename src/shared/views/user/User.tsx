import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Footer,
  PaginationTable,
  TableUser,
  apiUser,
  iUser,
  useParamsContext,
} from '../../../shared'

export const ViewUserPage = () => {
  const { setCount, setIsLoading } = useParamsContext()
  const [searchParams] = useSearchParams()
  const [listData, setListData] = useState<iUser[]>([])

  const page = Number(searchParams.get('page') || 1)
  const role = searchParams.get('role')
  const is_active = searchParams.get('is_active')

  const getUsers = useCallback((query: string) => {
    setIsLoading(true)
    apiUser
      .list(query)
      .then((res) => {
        setListData(res.result)
        setCount(res.total)
      })
      .finally(() => setIsLoading(false))
  }, [])

  const define_query = useMemo(() => {
    let query = `?take=5&skip=${5 * (page - 1)}`
    if (role) query += `&role=${role}`
    if (is_active) query += `&is_active=${is_active}`
    return query
  }, [is_active, page, role])

  const list = () => getUsers(define_query)

  useEffect(() => getUsers(define_query), [define_query])

  return (
    <>
      <TableUser listData={listData} list={list} />
      <PaginationTable />
      <Footer />
    </>
  )
}
