import { useNavigate } from 'react-router-dom'
import {
  DialogBase,
  apiClassStudent,
  iDialogBaseProps,
  useAppThemeContext,
} from '../../../../shared'

interface iDialogRemoveStudentProps extends iDialogBaseProps {
  class_name: string
  student_name: string
  class_id: string
  back?: string
}

export const DialogRemoveStudent = ({
  class_id,
  student_name,
  class_name,
  getData,
  onClose,
  open,
  back,
}: iDialogRemoveStudentProps) => {
  const navigate = useNavigate()
  const { setLoading, handleSucess, handleError } = useAppThemeContext()

  const deleteStudent = async () => {
    try {
      onClose()
      setLoading(true)
      await apiClassStudent.destroy(class_id)
      handleSucess('Aluno removido com sucesso!')
      getData && getData()
      if (back) navigate(back)
    } catch {
      handleError('Não foi possível remover o aluno no momento!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <DialogBase
      open={open}
      onClose={onClose}
      title="Remover Aluno"
      description={`Deseja continuar removendo o aluno ${student_name.toUpperCase()} da Turma ${class_name.toUpperCase()}?`}
      action={deleteStudent}
      actionTitle="Continuar"
    />
  )
}
