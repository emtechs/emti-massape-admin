import { FieldValues } from 'react-hook-form'
import {
  DialogBase,
  apiUser,
  iDialogUserProps,
  useAppThemeContext,
} from '../../../../shared'

export const DialogActiveUser = ({
  onClose,
  open,
  user,
  getData,
}: iDialogUserProps) => {
  const { setLoading, handleError, handleSucess } = useAppThemeContext()

  const updateUser = async (id: string, data: FieldValues) => {
    try {
      setLoading(true)
      await apiUser.update(id, data)
      handleSucess('Sucesso ao alterar o estado do usuário!')
      getData && getData()
    } catch {
      handleError('Não foi possível atualizar o estado do usuário no momento!')
    } finally {
      setLoading(false)
    }
  }

  return (
    user && (
      <DialogBase
        open={open}
        onClose={onClose}
        title={`${user.is_active ? 'Desativar' : 'Ativar'} Usuário`}
        description={`Deseja continuar ${user.is_active ? 'desativando' : 'ativando'} o usúario ${user.name.toUpperCase()}?`}
        actionTitle="Continuar"
        action={() => {
          updateUser(user.id, { role: 'SERV', is_active: !user.is_active })
          onClose()
        }}
      />
    )
  )
}
