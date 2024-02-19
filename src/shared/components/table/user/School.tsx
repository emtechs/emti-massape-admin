import sortArray from 'sort-array'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { TableRow } from '@mui/material'
import { Delete, Visibility } from '@mui/icons-material'
import {
  ButtonIcon,
  DialogRemoveUser,
  LinkIcon,
  LinkText,
  TableBase,
  TableCellDataLoading,
  iHeadCell,
  iSchoolServer,
  rolePtBr,
  useDataContext,
  useParamsContext,
} from '../../../../shared'

interface iTableUserSchoolProps {
  listData: iSchoolServer[]
  getData: () => void
}

export const TableUserSchool = ({
  getData,
  listData,
}: iTableUserSchoolProps) => {
  const { userData } = useDataContext()
  const { isLoading } = useParamsContext()
  const [searchParams] = useSearchParams()
  const [schoolData, setSchoolData] = useState<iSchoolServer>()
  const [openRemove, setOpenRemove] = useState(false)

  const handleSchool = (newSchool: iSchoolServer) => setSchoolData(newSchool)
  const handleRemove = () => setOpenRemove((old) => !old)

  const order = searchParams.get('order') || undefined
  const by = searchParams.get('by') || undefined

  const data = useMemo(() => {
    return sortArray<iSchoolServer>(listData, { by: order, order: by })
  }, [by, listData, order])

  const headCells: iHeadCell[] = useMemo(() => {
    return [
      { order: 'name', numeric: 'left', label: 'Escola' },
      { numeric: 'left', label: 'Função' },
      { numeric: 'left', label: 'Ações' },
    ]
  }, [])

  return (
    <>
      <TableBase headCells={headCells} message="Nenhuma escola encotrada">
        {data.map((el) => {
          const { key, name, role, id } = el
          const to = `/school/${id}?user_id=${key}`
          const handleData = () => handleSchool(el)
          const onClick = () => {
            handleData()
            handleRemove()
          }
          return (
            <TableRow key={key} hover>
              <TableCellDataLoading loading={isLoading} width={250}>
                <LinkText
                  isLoading={isLoading}
                  label={name}
                  width={250}
                  to={to}
                />
              </TableCellDataLoading>
              <TableCellDataLoading loading={isLoading}>
                {rolePtBr(role)}
              </TableCellDataLoading>
              <TableCellDataLoading loading={isLoading}>
                <LinkIcon
                  icon={<Visibility fontSize="small" />}
                  label="Detalhar"
                  to={to}
                />
                <ButtonIcon
                  title="Remover"
                  color="error"
                  size="small"
                  onClick={onClick}
                  startIcon={<Delete fontSize="small" />}
                />
              </TableCellDataLoading>
            </TableRow>
          )
        })}
      </TableBase>
      {userData && schoolData && (
        <DialogRemoveUser
          server_id={schoolData.key}
          school_name={schoolData.name}
          user_name={userData.name}
          user_role={schoolData.role}
          getData={getData}
          open={openRemove}
          onClose={handleRemove}
        />
      )}
    </>
  )
}
