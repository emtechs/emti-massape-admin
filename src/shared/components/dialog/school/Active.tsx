import {
  iDialogSchoolProps,
  useAppThemeContext,
  apiSchool,
  DialogBase,
} from '../../../../shared'

export const DialogActiveSchool = ({
  onClose,
  open,
  school,
  getData,
}: iDialogSchoolProps) => {
  const { setLoading, handleSucess, handleError } = useAppThemeContext()

  const updateSchool = async () => {
    try {
      onClose()
      setLoading(true)
      await apiSchool.update(
        {
          is_active: !school.is_active,
        },
        school.id,
      )
      handleSucess(`Sucesso ao alterar o estado da Escola!`)
      getData && getData()
    } catch {
      handleError(`Não foi possível atualizar o estado da escola no momento!`)
    } finally {
      setLoading(false)
    }
  }

  return (
    school && (
      <DialogBase
        open={open}
        onClose={onClose}
        title={`${school.is_active ? 'Desativar' : 'Ativar'} Escola`}
        description={`Deseja continuar ${school.is_active ? 'desativando' : 'ativando'} a escola ${school.name.toUpperCase()}?`}
        actionTitle="Continuar"
        action={updateSchool}
      />
    )
  )
}
