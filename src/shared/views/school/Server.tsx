import { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { PersonAdd } from '@mui/icons-material'
import {
  DialogCreateServer,
  Footer,
  LayoutDrawer,
  PaginationTable,
  SearchSchoolUser,
  TableUser,
  TabsRetrieveSchool,
  TitleSchoolServer,
  Tools,
  apiServer,
  iUser,
  useParamsContext,
} from '../../../shared'

export const ViewSchoolServer = () => {
  const { school_id } = useParams()
  const { setCount, setIsLoading } = useParamsContext()
  const [searchParams] = useSearchParams()
  const [listData, setListData] = useState<iUser[]>([])
  const [open, setOpen] = useState(false)

  const page = Number(searchParams.get('page') || 1)

  const onClose = () => setOpen((old) => !old)

  const getServer = useCallback((query: string) => {
    setIsLoading(true)
    apiServer
      .list(query)
      .then((res) => {
        setListData(res.result)
        setCount(res.total)
      })
      .finally(() => setIsLoading(false))
  }, [])

  const define_query = useMemo(() => {
    let query = `?take=5&skip=${5 * (page - 1)}`
    if (school_id) query += `&school_id=${school_id}`
    return query
  }, [page, school_id])

  const list = () => getServer(define_query)

  useEffect(() => getServer(define_query), [define_query])

  return (
    <LayoutDrawer
      title={<TitleSchoolServer />}
      tools={
        <Tools
          iconNew={<PersonAdd />}
          isNew
          titleNew="Servidor"
          onClickNew={onClose}
          search={<SearchSchoolUser />}
        />
      }
    >
      <TabsRetrieveSchool />
      <TableUser listData={listData} list={list} />
      <PaginationTable />
      <Footer />
      {school_id && (
        <DialogCreateServer
          getData={list}
          school_id={school_id}
          onClose={onClose}
          open={open}
        />
      )}
    </LayoutDrawer>
  )
}
