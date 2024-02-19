import { useNavigate } from 'react-router-dom'
import {
  DialogBase,
  apiClassYear,
  iDialogBaseProps,
  useAppThemeContext,
} from '../../../../shared'

interface iDialogRemoveClassProps extends iDialogBaseProps {
  class_name: string
  school_name: string
  class_id: string
  back?: string
}

export const DialogRemoveClass = ({
  class_id,
  school_name,
  class_name,
  getData,
  onClose,
  open,
  back,
}: iDialogRemoveClassProps) => {
  const navigate = useNavigate()
  const { setLoading, handleSucess, handleError } = useAppThemeContext()

  const deleteClass = async () => {
    try {
      onClose()
      setLoading(true)
      await apiClassYear.destroy(class_id)
      handleSucess('Turma removida com sucesso!')
      getData && getData()
      if (back) navigate(back)
    } catch {
      handleError('Não foi possível remover a turma no momento!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <DialogBase
      open={open}
      onClose={onClose}
      title="Remover Turma"
      description={`Deseja continuar removendo a turma ${class_name.toUpperCase()} da Escola ${school_name.toUpperCase()}?`}
      action={deleteClass}
      actionTitle="Continuar"
    />
  )
}
