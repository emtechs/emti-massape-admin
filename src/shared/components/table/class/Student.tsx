import sortArray from 'sort-array'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { TableRow } from '@mui/material'
import { Delete, SyncAlt } from '@mui/icons-material'
import {
  ButtonIcon,
  DialogRemoveStudent,
  DialogTransferStudent,
  TableBase,
  TableCellDataLoading,
  iClassStudent,
  iHeadCell,
  useAuthContext,
  useParamsContext,
} from '../../../../shared'

interface iTableClassStudentProps {
  listData: iClassStudent[]
  list: () => void
}

export const TableClassStudent = ({
  list,
  listData,
}: iTableClassStudentProps) => {
  const { isLoading } = useParamsContext()
  const { yearData } = useAuthContext()
  const [searchParams] = useSearchParams()
  const [studentData, setStudentData] = useState<iClassStudent>()
  const [openRemove, setOpenRemove] = useState(false)
  const [openTransfer, setOpenTransfer] = useState(false)

  const handleStudent = (newStudent: iClassStudent) =>
    setStudentData(newStudent)
  const handleRemove = () => setOpenRemove((old) => !old)
  const handleTransfer = () => setOpenTransfer((old) => !old)

  const order = searchParams.get('order') || undefined
  const by = searchParams.get('by') || undefined
  const year_id = searchParams.get('year_id')

  const data = useMemo(() => {
    let listClassStudent: iClassStudent[]

    if (order === 'school_name')
      listClassStudent = sortArray<iClassStudent>(listData, {
        by: order,
        order: by,
        computed: { class_name: (row) => row.class.school.name },
      })

    if (order === 'class_year')
      listClassStudent = sortArray<iClassStudent>(listData, {
        by: order,
        order: by,
        computed: { class_year: (row) => row.class.year },
      })

    listClassStudent = sortArray<iClassStudent>(listData, {
      by: order,
      order: by,
    })

    return listClassStudent
  }, [by, listData, order])

  const headCells: iHeadCell[] = useMemo(() => {
    return [
      { order: 'registry', numeric: 'right', label: 'Matrícula' },
      { order: 'name', numeric: 'left', label: 'Aluno' },
      { order: 'school_name', numeric: 'left', label: 'Escola' },
      { order: 'class_year', numeric: 'right', label: 'Ano Letivo' },
      { numeric: 'left', label: 'Ações' },
    ]
  }, [])

  return (
    <>
      <TableBase headCells={headCells} message="Nenhum aluno encotrado">
        {data.map((data) => {
          const { id, name, registry } = data
          const handleData = () => handleStudent(data)
          const onClickRemove = () => {
            handleData()
            handleRemove()
          }
          const onClickTransfer = () => {
            handleData()
            handleTransfer()
          }

          return (
            <TableRow key={id} hover>
              <TableCellDataLoading loading={isLoading} isNumeric>
                {registry}
              </TableCellDataLoading>
              <TableCellDataLoading loading={isLoading}>
                {name}
              </TableCellDataLoading>
              <TableCellDataLoading loading={isLoading}>
                {data.class.school.name}
              </TableCellDataLoading>
              <TableCellDataLoading loading={isLoading} isNumeric>
                {data.class.year}
              </TableCellDataLoading>
              <TableCellDataLoading loading={isLoading}>
                {yearData?.id === year_id && (
                  <>
                    <ButtonIcon
                      title="Transferir"
                      color="info"
                      size="small"
                      onClick={onClickTransfer}
                      startIcon={<SyncAlt fontSize="small" />}
                    />
                    <ButtonIcon
                      title="Remover"
                      color="error"
                      size="small"
                      onClick={onClickRemove}
                      startIcon={<Delete fontSize="small" />}
                    />
                  </>
                )}
              </TableCellDataLoading>
            </TableRow>
          )
        })}
      </TableBase>
      {studentData && (
        <DialogRemoveStudent
          class_id={studentData.key}
          class_name={studentData.class.name}
          student_name={studentData.name}
          getData={list}
          open={openRemove}
          onClose={handleRemove}
        />
      )}
      {studentData && (
        <DialogTransferStudent
          class_id={studentData.key}
          student_id={studentData.id}
          class_name={studentData.class.name}
          student_name={studentData.name}
          getData={list}
          open={openTransfer}
          onClose={handleTransfer}
        />
      )}
    </>
  )
}
