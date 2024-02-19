import sortArray from 'sort-array'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { TableRow } from '@mui/material'
import { Visibility, RemoveDone, DoneAll } from '@mui/icons-material'
import {
  ButtonIcon,
  DialogActiveClass,
  LinkIcon,
  LinkText,
  TableBase,
  TableCellDataLoading,
  iClass,
  iHeadCell,
  useParamsContext,
} from '../../../../shared'

interface iTableClassProps {
  listData: iClass[]
  list: () => void
}

export const TableClass = ({ list, listData }: iTableClassProps) => {
  const { isLoading } = useParamsContext()
  const [searchParams] = useSearchParams()
  const [classData, setClassData] = useState<iClass>()
  const [openActive, setOpenActive] = useState(false)

  const handleClass = (newClass: iClass) => setClassData(newClass)
  const handleOpenActive = () => setOpenActive((old) => !old)

  const order = searchParams.get('order') || undefined
  const by = searchParams.get('by') || undefined

  const data = useMemo(() => {
    return sortArray<iClass>(listData, { by: order, order: by })
  }, [by, listData, order])

  const headCells: iHeadCell[] = useMemo(() => {
    return [
      { order: 'name', numeric: 'left', label: 'Turma' },
      { order: 'schools', numeric: 'right', label: 'Escolas' },
      { order: 'students', numeric: 'right', label: 'Alunos' },
      { numeric: 'left', label: 'Ações' },
    ]
  }, [])

  return (
    <>
      <TableBase headCells={headCells} message="Nenhuma turma encotrada">
        {data.map((cl) => {
          const { id, name, is_active, schools, students } = cl
          const to = `/class/${id}`
          const handleData = () => handleClass(cl)
          const onClickActive = () => {
            handleData()
            handleOpenActive()
          }
          return (
            <TableRow key={id} hover>
              <TableCellDataLoading loading={isLoading}>
                {is_active ? (
                  <LinkText
                    label={name}
                    isLoading={isLoading}
                    to={to}
                    width={250}
                  />
                ) : (
                  name
                )}
              </TableCellDataLoading>
              <TableCellDataLoading loading={isLoading} width={200} isNumeric>
                {schools}
              </TableCellDataLoading>
              <TableCellDataLoading loading={isLoading} width={200} isNumeric>
                {students}
              </TableCellDataLoading>
              <TableCellDataLoading loading={isLoading}>
                {is_active ? (
                  <>
                    <LinkIcon
                      icon={<Visibility fontSize="small" />}
                      label="Detalhar"
                      to={to}
                    />
                    <ButtonIcon
                      title="Desativar"
                      color="error"
                      size="small"
                      onClick={onClickActive}
                      startIcon={<RemoveDone fontSize="small" />}
                    />
                  </>
                ) : (
                  <ButtonIcon
                    title="Ativar"
                    color="success"
                    size="small"
                    onClick={onClickActive}
                    startIcon={<DoneAll fontSize="small" />}
                  />
                )}
              </TableCellDataLoading>
            </TableRow>
          )
        })}
        {classData && (
          <DialogActiveClass
            classData={classData}
            onClose={handleOpenActive}
            open={openActive}
            getData={list}
          />
        )}
      </TableBase>
    </>
  )
}
