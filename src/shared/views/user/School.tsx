import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  DialogCreateSchoolServer,
  Footer,
  LayoutDrawer,
  PaginationTable,
  SearchUserSchool,
  TableUserSchool,
  TabsRetrieveUser,
  TitleUserSchool,
  Tools,
  apiServer,
  iSchoolServer,
  useDataContext,
  useParamsContext,
} from '../../../shared'

export const ViewUserSchool = () => {
  const { userData } = useDataContext()
  const { setCount, setIsLoading } = useParamsContext()
  const [searchParams] = useSearchParams()
  const [listData, setListData] = useState<iSchoolServer[]>([])
  const [openEdit, setOpenEdit] = useState(false)

  const handleOpenEdit = () => setOpenEdit((old) => !old)

  const page = Number(searchParams.get('page') || 1)

  const getSchool = useCallback((query: string) => {
    setIsLoading(true)
    apiServer
      .schools(query)
      .then((res) => {
        setListData(res.result)
        setCount(res.total)
      })
      .finally(() => setIsLoading(false))
  }, [])

  const define_query = useMemo(() => {
    let query = `?take=5&skip=${5 * (page - 1)}`
    if (userData) query += `&user_id=${userData.id}`
    return query
  }, [page, userData])

  const list = useCallback(() => getSchool(define_query), [define_query])

  useEffect(() => list(), [list])

  return (
    <LayoutDrawer
      title={<TitleUserSchool />}
      tools={
        <Tools
          isNew
          onClickNew={handleOpenEdit}
          titleNew="Nova"
          search={<SearchUserSchool />}
        />
      }
    >
      <TabsRetrieveUser />
      <TableUserSchool listData={listData} getData={list} />
      <PaginationTable />
      <Footer />
      {userData && (
        <DialogCreateSchoolServer
          open={openEdit}
          onClose={handleOpenEdit}
          user={userData}
          getData={list}
        />
      )}
    </LayoutDrawer>
  )
}
