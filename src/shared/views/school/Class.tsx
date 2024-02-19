import { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { Box } from '@mui/material'
import {
  DialogCreateSchoolClass,
  Footer,
  LayoutDrawer,
  PaginationTable,
  SearchSchoolClass,
  TableSchoolClass,
  TabsRetrieveSchool,
  TabsYear,
  TitleSchoolClass,
  Tools,
  apiClassYear,
  iClassYear,
  useAuthContext,
  useParamsContext,
} from '../../../shared'

export const ViewSchoolClass = () => {
  const { school_id } = useParams()
  const { yearData } = useAuthContext()
  const { setCount, setIsLoading } = useParamsContext()
  const [searchParams] = useSearchParams()
  const [listData, setListData] = useState<iClassYear[]>([])
  const [open, setOpen] = useState(false)

  const page = Number(searchParams.get('page') || 1)
  const year_id = searchParams.get('year_id')

  const onClose = () => setOpen((old) => !old)

  const getClass = useCallback((query: string) => {
    setIsLoading(true)
    apiClassYear
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
    return query
  }, [page, school_id, year_id])

  const list = () => getClass(define_query)

  useEffect(() => getClass(define_query), [define_query])

  return (
    <LayoutDrawer
      title={<TitleSchoolClass />}
      tools={
        <Tools
          isNew={year_id === yearData?.id}
          titleNew="Turma"
          onClickNew={onClose}
          search={<SearchSchoolClass />}
        />
      }
    >
      <TabsRetrieveSchool />
      <Box display="flex" justifyContent="space-between">
        <TabsYear />
        <Box flex={1}>
          <TableSchoolClass listData={listData} list={list} />
          <PaginationTable />
        </Box>
      </Box>
      <Footer />
      {school_id && year_id && (
        <DialogCreateSchoolClass
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
