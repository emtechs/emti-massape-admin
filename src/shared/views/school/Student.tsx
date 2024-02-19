import { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { Box } from '@mui/material'
import {
  DialogCreateSchoolStudent,
  Footer,
  LayoutDrawer,
  PaginationTable,
  SearchSchoolStudent,
  TableSchoolStudent,
  TabsRetrieveSchool,
  TabsYear,
  TitleSchoolStudent,
  Tools,
  apiClassStudent,
  iClassStudent,
  useAuthContext,
  useParamsContext,
} from '../../../shared'

export const ViewSchoolStudent = () => {
  const { school_id } = useParams()
  const { yearData } = useAuthContext()
  const { setCount, setIsLoading } = useParamsContext()
  const [searchParams] = useSearchParams()
  const [listData, setListData] = useState<iClassStudent[]>([])
  const [open, setOpen] = useState(false)

  const page = Number(searchParams.get('page') || 1)
  const year_id = searchParams.get('year_id')
  const class_id = searchParams.get('class_id')

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
    if (school_id) query += `&school_id=${school_id}`
    if (year_id) query += `&year_id=${year_id}`
    if (class_id) query += `&class_id=${class_id}`
    return query
  }, [class_id, page, school_id, year_id])

  const list = () => getClass(define_query)

  useEffect(() => getClass(define_query), [define_query])

  return (
    <LayoutDrawer
      title={<TitleSchoolStudent />}
      tools={
        <Tools
          isNew={year_id === yearData?.id}
          titleNew="Aluno"
          onClickNew={onClose}
          search={<SearchSchoolStudent />}
        />
      }
    >
      <TabsRetrieveSchool />
      <Box display="flex" justifyContent="space-between">
        <TabsYear />
        <Box flex={1}>
          <TableSchoolStudent listData={listData} list={list} />
          <PaginationTable />
        </Box>
      </Box>
      <Footer />
      {school_id && year_id && (
        <DialogCreateSchoolStudent
          onClose={onClose}
          open={open}
          getData={list}
          school_id={school_id}
          year_id={year_id}
        />
      )}
    </LayoutDrawer>
  )
}
