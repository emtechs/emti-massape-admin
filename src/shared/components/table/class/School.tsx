import sortArray from 'sort-array'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { TableRow } from '@mui/material'
import { Visibility, Delete } from '@mui/icons-material'
import {
  iHeadCell,
  TableBase,
  LinkText,
  TableCellDataLoading,
  useParamsContext,
  LinkIcon,
  ButtonIcon,
  iClassYear,
  DialogRemoveClass,
} from '../../../../shared'

interface iTableSchoolProps {
  listData: iClassYear[]
  list: () => void
}

export const TableClassSchool = ({ list, listData }: iTableSchoolProps) => {
  const { isLoading } = useParamsContext()
  const [searchParams] = useSearchParams()
  const [classData, setClassData] = useState<iClassYear>()
  const [openRemove, setOpenRemove] = useState(false)

  const handleClass = (newClass: iClassYear) => setClassData(newClass)
  const handleRemove = () => setOpenRemove((old) => !old)

  const order = searchParams.get('order') || undefined
  const by = searchParams.get('by') || undefined

  const data = useMemo(() => {
    let listSchool: iClassYear[]

    if (order === 'school_name')
      listSchool = sortArray<iClassYear>(listData, {
        by: order,
        order: by,
        computed: { director_name: (row) => row.school?.name },
      })

    listSchool = sortArray<iClassYear>(listData, { by: order, order: by })

    return listSchool
  }, [by, listData, order])

  const headCells: iHeadCell[] = [
    { order: 'school_name', numeric: 'left', label: 'Escola' },
    { order: 'students', numeric: 'right', label: 'Alunos' },
    { order: 'year', numeric: 'right', label: 'Ano Letivo' },
    { numeric: 'left', label: 'Ações' },
  ]

  return (
    <>
      <TableBase headCells={headCells} message="Nenhuma escola encotrada">
        {data.map((cl) => {
          const { id, school, students, year, key } = cl
          const to = `/school/${school.id}?class_id=${id}&key=${key}&view=student`
          const handleData = () => handleClass(cl)
          const onClick = () => {
            handleData()
            handleRemove()
          }
          return (
            <TableRow key={id} hover>
              <TableCellDataLoading loading={isLoading}>
                <LinkText
                  label={school.name}
                  isLoading={isLoading}
                  to={to}
                  width={250}
                />
              </TableCellDataLoading>
              <TableCellDataLoading loading={isLoading} width={200} isNumeric>
                {students}
              </TableCellDataLoading>
              <TableCellDataLoading loading={isLoading} width={200} isNumeric>
                {year}
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
      {classData && (
        <DialogRemoveClass
          class_id={classData.key}
          school_name={classData.school.name}
          class_name={classData.name}
          getData={list}
          open={openRemove}
          onClose={handleRemove}
        />
      )}
    </>
  )
}
