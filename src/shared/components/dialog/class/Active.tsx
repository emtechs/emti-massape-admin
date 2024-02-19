import {
  DialogBase,
  apiClass,
  iDialogClassProps,
  useAppThemeContext,
} from '../../../../shared'

export const DialogActiveClass = ({
  classData,
  onClose,
  open,
  getData,
}: iDialogClassProps) => {
  const { setLoading, handleSucess, handleError } = useAppThemeContext()

  const updateClass = async () => {
    try {
      onClose()
      setLoading(true)
      await apiClass.update(
        {
          is_active: !classData.is_active,
        },
        classData.id,
      )
      handleSucess(`Sucesso ao alterar o estado da Turma!`)
      getData && getData()
    } catch {
      handleError(`Não foi possível atualizar o estado da turma no momento!`)
    } finally {
      setLoading(false)
    }
  }

  return (
    classData && (
      <DialogBase
        open={open}
        onClose={onClose}
        title={`${classData.is_active ? 'Desativar' : 'Ativar'} Turma`}
        description={`Deseja continuar ${classData.is_active ? 'desativando' : 'ativando'} a turma ${classData.name.toUpperCase()}?`}
        actionTitle="Continuar"
        action={updateClass}
      />
    )
  )
}
