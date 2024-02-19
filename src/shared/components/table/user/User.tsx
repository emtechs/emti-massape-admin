import sortArray from 'sort-array'
import { useMemo, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { TableRow } from '@mui/material'
import {
  ActionsUser,
  LinkText,
  TableBase,
  TableCellDataLoading,
  iHeadCell,
  iUser,
  rolePtBr,
  useAppThemeContext,
  useParamsContext,
} from '../../../../shared'

interface iTableUserProps {
  listData: iUser[]
  list: () => void
}

export const TableUser = ({ list, listData }: iTableUserProps) => {
  const { school_id } = useParams()
  const { mdDown } = useAppThemeContext()
  const { isLoading } = useParamsContext()
  const [searchParams] = useSearchParams()
  const [userData, setUserData] = useState<iUser>()

  const order = searchParams.get('order') || undefined
  const by = searchParams.get('by') || undefined

  const handleUser = (newUser: iUser) => setUserData(newUser)

  const handleTo = (id: string, key?: string) => {
    let base = `/user/${id}`
    if (key && school_id) base += `?school_id=${school_id}&key=${key}`
    return base
  }

  const data = useMemo(() => {
    return sortArray<iUser>(listData, { by: order, order: by })
  }, [by, listData, order])

  const headCells: iHeadCell[] = useMemo(() => {
    if (mdDown)
      return [
        { order: 'name', numeric: 'left', label: 'Nome Completo' },
        { numeric: 'left', label: 'CPF' },
        { numeric: 'left', label: 'Ações' },
      ]

    return [
      { order: 'name', numeric: 'left', label: 'Nome Completo' },
      { numeric: 'left', label: 'CPF' },
      { order: 'role', numeric: 'left', label: 'Função' },
      { numeric: 'left', label: 'Ações' },
    ]
  }, [mdDown])

  return (
    <TableBase headCells={headCells} message="Nenhum usuário encotrado">
      {data.map((user) => {
        const { id, name, is_active, cpf, role, key } = user
        const to = handleTo(id, key)
        return (
          <TableRow key={id} hover>
            <TableCellDataLoading loading={isLoading}>
              {is_active ? (
                <LinkText
                  isLoading={isLoading}
                  label={name}
                  width={250}
                  to={to}
                />
              ) : (
                name
              )}
            </TableCellDataLoading>
            <TableCellDataLoading loading={isLoading}>
              {cpf}
            </TableCellDataLoading>
            {!mdDown && (
              <TableCellDataLoading loading={isLoading}>
                {rolePtBr(role)}
              </TableCellDataLoading>
            )}
            <TableCellDataLoading loading={isLoading}>
              <ActionsUser
                handleUser={handleUser}
                list={list}
                to={to}
                user={user}
                userData={userData}
              />
            </TableCellDataLoading>
          </TableRow>
        )
      })}
    </TableBase>
  )
}
