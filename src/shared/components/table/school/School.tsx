import sortArray from 'sort-array'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { TableRow } from '@mui/material'
import {
  Visibility,
  Edit,
  Person,
  RemoveDone,
  DoneAll,
} from '@mui/icons-material'
import {
  iSchool,
  iHeadCell,
  TableBase,
  LinkText,
  TableCellDataLoading,
  useParamsContext,
  DialogActiveSchool,
  DialogDirectorSchool,
  DialogEditSchool,
  LinkIcon,
  ButtonIcon,
} from '../../../../shared'

interface iTableSchoolProps {
  listData: iSchool[]
  list: () => void
}

export const TableSchool = ({ list, listData }: iTableSchoolProps) => {
  const { isLoading } = useParamsContext()
  const [searchParams] = useSearchParams()
  const [schoolData, setSchoolData] = useState<iSchool>()
  const [openEdit, setOpenEdit] = useState(false)
  const [openDirector, setOpenDirector] = useState(false)
  const [openActive, setOpenActive] = useState(false)

  const handleSchool = (newSchool: iSchool) => setSchoolData(newSchool)
  const handleOpenEdit = () => setOpenEdit((old) => !old)
  const handleOpenDirector = () => setOpenDirector((old) => !old)
  const handleOpenActive = () => setOpenActive((old) => !old)

  const order = searchParams.get('order') || undefined
  const by = searchParams.get('by') || undefined

  const data = useMemo(() => {
    let listSchool: iSchool[]

    if (order === 'director_name')
      listSchool = sortArray<iSchool>(listData, {
        by: order,
        order: by,
        computed: { director_name: (row) => row.director?.name },
      })

    listSchool = sortArray<iSchool>(listData, { by: order, order: by })

    return listSchool
  }, [by, listData, order])

  const headCells: iHeadCell[] = [
    { order: 'name', numeric: 'left', label: 'Escola' },
    { order: 'director_name', numeric: 'left', label: 'Diretor' },
    { numeric: 'left', label: 'Ações' },
  ]

  return (
    <>
      <TableBase headCells={headCells} message="Nenhuma escola encotrada">
        {data.map((school) => {
          const { id, name, director, is_active } = school
          const to = `/school/${school.id}`
          const handleData = () => handleSchool(school)
          const onClickEdit = () => {
            handleData()
            handleOpenEdit()
          }
          const onClickDirector = () => {
            handleData()
            handleOpenDirector()
          }
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
              <TableCellDataLoading loading={isLoading} width={200}>
                {director?.name}
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
                      title="Editar"
                      color="success"
                      size="small"
                      onClick={onClickEdit}
                      startIcon={<Edit fontSize="small" />}
                    />
                    <ButtonIcon
                      title="Diretor"
                      color="primary"
                      size="small"
                      onClick={onClickDirector}
                      startIcon={<Person fontSize="small" />}
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
      </TableBase>
      {schoolData && (
        <DialogEditSchool
          school={schoolData}
          getData={list}
          open={openEdit}
          onClose={handleOpenEdit}
        />
      )}
      {schoolData && (
        <DialogDirectorSchool
          school={schoolData}
          getData={list}
          open={openDirector}
          onClose={handleOpenDirector}
        />
      )}
      {schoolData && (
        <DialogActiveSchool
          school={schoolData}
          getData={list}
          open={openActive}
          onClose={handleOpenActive}
        />
      )}
    </>
  )
}
