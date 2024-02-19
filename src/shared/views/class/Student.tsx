import { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { Box } from '@mui/material'
import {
  DialogCreateClassStudent,
  Footer,
  LayoutDrawer,
  PaginationTable,
  SearchClassStudent,
  TableClassStudent,
  TabsRetrieveClass,
  TabsYear,
  TitleClassStudent,
  Tools,
  apiClassStudent,
  iClassStudent,
  useAuthContext,
  useParamsContext,
} from '../../../shared'

export const ViewClassStudent = () => {
  const { class_id } = useParams()
  const { yearData } = useAuthContext()
  const { setCount, setIsLoading } = useParamsContext()
  const [searchParams] = useSearchParams()
  const [listData, setListData] = useState<iClassStudent[]>([])
  const [open, setOpen] = useState(false)

  const page = Number(searchParams.get('page') || 1)
  const year_id = searchParams.get('year_id')
  const school_id = searchParams.get('school_id')

  const onClose = () => setOpen((old) => !old)

  const getClass = useCallback((query: string) => {
    setIsLoading(true)
    apiClassStudent
      .list(query)
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
    if (school_id) query += `&school_id=${school_id}`
    return query
  }, [page, class_id, year_id, school_id])

  const list = () => getClass(define_query)

  useEffect(() => getClass(define_query), [define_query])

  return (
    <LayoutDrawer
      title={<TitleClassStudent />}
      tools={
        <Tools
          isNew={year_id === yearData?.id}
          titleNew="Aluno"
          onClickNew={onClose}
          search={<SearchClassStudent />}
        />
      }
    >
      <TabsRetrieveClass />
      <Box display="flex" justifyContent="space-between">
        <TabsYear />
        <Box flex={1}>
          <TableClassStudent listData={listData} list={list} />
          <PaginationTable />
        </Box>
      </Box>
      <Footer />
      {class_id && year_id && (
        <DialogCreateClassStudent
          onClose={onClose}
          open={open}
          getData={list}
          class_id={class_id}
          year_id={year_id}
        />
      )}
    </LayoutDrawer>
  )
}
