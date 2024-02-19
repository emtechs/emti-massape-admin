import {
  DialogBase,
  apiUser,
  iDialogUserProps,
  useAppThemeContext,
} from '../../../../shared'

export const DialogFitUser = ({
  onClose,
  open,
  user,
  getData,
}: iDialogUserProps) => {
  const { setLoading, handleError, handleSucess } = useAppThemeContext()

  const fitUser = async () => {
    try {
      onClose()
      setLoading(true)
      await apiUser.update(
        user.id,
        user.role !== 'ADMIN' ? { role: 'ADMIN' } : { role: 'SERV' },
      )
      handleSucess('Sucesso ao alterar a função do usuário!')
      getData && getData()
    } catch {
      handleError('Não foi possível atualizar a função do usuário no momento!')
    } finally {
      setLoading(false)
    }
  }

  return (
    user && (
      <DialogBase
        open={open}
        onClose={onClose}
        title={`${user.role !== 'ADMIN' ? 'Promover' : 'Rebaixar'} Usuário`}
        description={`Deseja continuar ${user.role !== 'ADMIN' ? 'promovendo' : 'rebaixando'} o usúario ${user.name.toUpperCase()}?`}
        actionTitle="Continuar"
        action={fitUser}
      />
    )
  )
}
