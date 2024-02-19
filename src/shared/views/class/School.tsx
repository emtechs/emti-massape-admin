import { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { Box } from '@mui/material'
import {
  DialogCreateClassSchool,
  Footer,
  LayoutDrawer,
  PaginationTable,
  SearchClassSchool,
  TableClassSchool,
  TabsRetrieveClass,
  TabsYear,
  TitleClassSchool,
  Tools,
  apiClassYear,
  iClassYear,
  useAuthContext,
  useParamsContext,
} from '../../../shared'

export const ViewClassSchool = () => {
  const { class_id } = useParams()
  const { setCount, setIsLoading } = useParamsContext()
  const [searchParams] = useSearchParams()
  const { yearData } = useAuthContext()
  const [listData, setListData] = useState<iClassYear[]>([])
  const [open, setOpen] = useState(false)

  const page = Number(searchParams.get('page') || 1)
  const year_id = searchParams.get('year_id')

  const onClose = () => setOpen((old) => !old)

  const getClass = useCallback((query: string) => {
    setIsLoading(true)
    apiClassYear
      .schools(query)
      .then((res) => {
        setListData(res.result)
        setCount(res.total)
      })
      .finally(() => setIsLoading(false))
  }, [])

  const define_query = useMemo(() => {
    let query = `?take=5&skip=${5 * (page - 1)}`
    if (class_id) query += `&class_id=${class_id}`
    if (year_id) query += `&year_id=${year_id}`
    return query
  }, [page, year_id])

  const list = () => getClass(define_query)

  useEffect(() => getClass(define_query), [define_query])

  return (
    <LayoutDrawer
      title={<TitleClassSchool />}
      tools={
        <Tools
          isNew={year_id === yearData?.id}
          titleNew="Escola"
          onClickNew={onClose}
          search={<SearchClassSchool />}
        />
      }
    >
      <TabsRetrieveClass />
      <Box display="flex" justifyContent="space-between">
        <TabsYear />
        <Box flex={1}>
          <TableClassSchool listData={listData} list={list} />
          <PaginationTable />
        </Box>
      </Box>
      <Footer />
      {class_id && year_id && (
        <DialogCreateClassSchool
          class_id={class_id}
          year_id={year_id}
          open={open}
          onClose={onClose}
          getData={list}
        />
      )}
    </LayoutDrawer>
  )
}
