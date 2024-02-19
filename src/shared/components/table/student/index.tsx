import sortArray from 'sort-array'
import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { TableRow } from '@mui/material'
import {
  iHeadCell,
  TableBase,
  TableCellDataLoading,
  useParamsContext,
  iStudent,
} from '../../../../shared'

interface iTableStudentProps {
  listData: iStudent[]
  list: () => void
}

export const TableStudent = ({ listData }: iTableStudentProps) => {
  const { isLoading } = useParamsContext()
  const [searchParams] = useSearchParams()

  const order = searchParams.get('order') || undefined
  const by = searchParams.get('by') || undefined

  const data = useMemo(() => {
    return sortArray<iStudent>(listData, { by: order, order: by })
  }, [by, listData, order])

  const headCells: iHeadCell[] = [
    { order: 'registry', numeric: 'left', label: 'Matrícula' },
    { order: 'name', numeric: 'left', label: 'Aluno' },
  ]

  return (
    <TableBase headCells={headCells} message="Nenhum aluno encotrado">
      {data.map((el) => (
        <TableRow key={el.id} hover>
          <TableCellDataLoading loading={isLoading}>
            {el.registry}
          </TableCellDataLoading>
          <TableCellDataLoading loading={isLoading} width={200}>
            {el.name}
          </TableCellDataLoading>
        </TableRow>
      ))}
    </TableBase>
  )
}
