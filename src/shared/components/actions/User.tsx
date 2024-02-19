import { useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Delete,
  DoneAll,
  RemoveDone,
  School,
  Visibility,
} from '@mui/icons-material'
import {
  ButtonIcon,
  DialogActiveUser,
  DialogCreateSchoolServer,
  DialogRemoveUser,
  LinkIcon,
  iUser,
  useDataContext,
} from '../../../shared'

interface iActionsUserProps {
  to: string
  user: iUser
  userData: iUser | undefined
  handleUser: (newUser: iUser) => void
  list: () => void
}

export const ActionsUser = ({
  handleUser,
  list,
  to,
  user,
  userData,
}: iActionsUserProps) => {
  const { school_id } = useParams()
  const { schoolData } = useDataContext()
  const [openActive, setOpenActive] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openRemove, setOpenRemove] = useState(false)

  const handleOpenActive = () => setOpenActive((old) => !old)
  const handleOpenEdit = () => setOpenEdit((old) => !old)
  const handleOpenRemove = () => setOpenRemove((old) => !old)

  const onClickActive = () => {
    handleUser(user)
    handleOpenActive()
  }
  const onClickEdit = () => {
    handleUser(user)
    handleOpenEdit()
  }
  const onClickRemove = () => {
    handleUser(user)
    handleOpenRemove()
  }

  return (
    <>
      {school_id ? (
        <>
          <LinkIcon
            icon={<Visibility fontSize="small" />}
            label="Detalhar"
            to={to}
          />
          <ButtonIcon
            title="Remover"
            color="error"
            size="small"
            onClick={onClickRemove}
            startIcon={<Delete fontSize="small" />}
          />
        </>
      ) : user.is_active ? (
        <>
          <LinkIcon
            icon={<Visibility fontSize="small" />}
            label="Detalhar"
            to={to}
          />
          {user.role !== 'ADMIN' && (
            <ButtonIcon
              title="Liberar Acesso"
              color="secondary"
              size="small"
              onClick={onClickEdit}
              startIcon={<School fontSize="small" />}
            />
          )}
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
      {userData && (
        <DialogActiveUser
          open={openActive}
          onClose={handleOpenActive}
          user={userData}
          getData={list}
        />
      )}
      {userData && (
        <DialogCreateSchoolServer
          open={openEdit}
          onClose={handleOpenEdit}
          user={userData}
        />
      )}
      {userData && schoolData && (
        <DialogRemoveUser
          server_id={userData.key || ''}
          school_name={schoolData.name}
          user_name={userData.name}
          user_role={userData.role}
          open={openRemove}
          onClose={handleOpenRemove}
          getData={list}
        />
      )}
    </>
  )
}
