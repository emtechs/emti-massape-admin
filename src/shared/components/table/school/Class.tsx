import sortArray from 'sort-array'
import { useMemo, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { TableRow } from '@mui/material'
import { Visibility, Delete } from '@mui/icons-material'
import {
  ButtonIcon,
  DialogRemoveClass,
  LinkIcon,
  LinkText,
  TableBase,
  TableCellDataLoading,
  iClassYear,
  iHeadCell,
  useDataContext,
  useParamsContext,
} from '../../../../shared'

interface iTableSchoolClassProps {
  listData: iClassYear[]
  list: () => void
}

export const TableSchoolClass = ({
  list,
  listData,
}: iTableSchoolClassProps) => {
  const { school_id } = useParams()
  const { isLoading } = useParamsContext()
  const { schoolData } = useDataContext()
  const [searchParams] = useSearchParams()
  const [classData, setClassData] = useState<iClassYear>()
  const [openRemove, setOpenRemove] = useState(false)

  const handleClass = (newClass: iClassYear) => setClassData(newClass)
  const handleRemove = () => setOpenRemove((old) => !old)

  const order = searchParams.get('order') || undefined
  const by = searchParams.get('by') || undefined

  const data = useMemo(() => {
    return sortArray<iClassYear>(listData, {
      by: order,
      order: by,
    })
  }, [by, listData, order])

  const headCells: iHeadCell[] = useMemo(() => {
    return [
      { order: 'name', numeric: 'left', label: 'Turma' },
      { order: 'year', numeric: 'right', label: 'Ano Letivo' },
      { order: 'students', numeric: 'right', label: 'Alunos' },
      { numeric: 'left', label: 'Ações' },
    ]
  }, [])

  return (
    <>
      <TableBase headCells={headCells} message="Nenhuma turma encotrada">
        {data.map((data) => {
          const { id, name, year, students, key } = data
          const to = `/class/${id}?school_id=${school_id}&key=${key}&view=student`
          const handleData = () => handleClass(data)
          const onClick = () => {
            handleData()
            handleRemove()
          }
          return (
            <TableRow key={id} hover>
              <TableCellDataLoading loading={isLoading}>
                <LinkText
                  isLoading={isLoading}
                  label={name}
                  width={250}
                  to={to}
                />
              </TableCellDataLoading>
              <TableCellDataLoading loading={isLoading} isNumeric>
                {year}
              </TableCellDataLoading>
              <TableCellDataLoading loading={isLoading} isNumeric>
                {students}
              </TableCellDataLoading>
              <TableCellDataLoading loading={isLoading}>
                <LinkIcon
                  icon={<Visibility fontSize="small" />}
                  label="Detalhar"
                  to={to}
                />
                {students === 0 && (
                  <ButtonIcon
                    title="Remover"
                    color="error"
                    size="small"
                    onClick={onClick}
                    startIcon={<Delete fontSize="small" />}
                  />
                )}
              </TableCellDataLoading>
            </TableRow>
          )
        })}
      </TableBase>
      {classData && schoolData && (
        <DialogRemoveClass
          class_id={classData.key}
          school_name={schoolData.name}
          class_name={classData.name}
          getData={list}
          open={openRemove}
          onClose={handleRemove}
        />
      )}
    </>
  )
}
