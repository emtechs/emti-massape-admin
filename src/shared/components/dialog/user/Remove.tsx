import { useNavigate } from 'react-router-dom'
import {
  DialogBase,
  apiServer,
  iDialogBaseProps,
  iRole,
  rolePtBr,
  useAppThemeContext,
} from '../../../../shared'

interface iDialogRemoveUserProps extends iDialogBaseProps {
  user_name: string
  user_role: iRole
  school_name: string
  server_id: string
  back?: string
}

export const DialogRemoveUser = ({
  server_id,
  school_name,
  user_name,
  user_role,
  getData,
  onClose,
  open,
  back,
}: iDialogRemoveUserProps) => {
  const navigate = useNavigate()
  const { setLoading, handleSucess, handleError } = useAppThemeContext()

  const deleteServer = async () => {
    try {
      onClose()
      setLoading(true)
      await apiServer.destroy(server_id)
      handleSucess('Usuário removido da função com sucesso!')
      getData && getData()
      if (back) navigate(back)
    } catch {
      handleError('Não foi possível remover o usuário da função no momento!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <DialogBase
      open={open}
      onClose={onClose}
      title="Remover Usuário da Função"
      description={`Deseja continuar removendo o usúario ${user_name.toUpperCase()} da
    Função ${rolePtBr(user_role).toUpperCase()} da Escola ${school_name.toUpperCase()}?`}
      action={deleteServer}
      actionTitle="Continuar"
    />
  )
}
