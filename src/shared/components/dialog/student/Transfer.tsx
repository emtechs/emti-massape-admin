import { useNavigate } from 'react-router-dom'
import {
  AutoCompleteSchool,
  AutoCompleteTransfer,
  BaseContentChildren,
  DialogBaseChildren,
  apiClassStudent,
  classStudentTranferSchema,
  iClassStudentTranferRequest,
  iDialogBaseProps,
  useAppThemeContext,
} from '../../../../shared'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@mui/material'
import { FormContainer } from 'react-hook-form-mui'

interface iDialogTransferStudentProps extends iDialogBaseProps {
  class_name: string
  student_name: string
  class_id: string
  student_id: string
  back?: string
}

export const DialogTransferStudent = ({
  class_id,
  student_id,
  student_name,
  class_name,
  getData,
  onClose,
  open,
  back,
}: iDialogTransferStudentProps) => {
  const navigate = useNavigate()
  const { setLoading, handleSucess, handleError } = useAppThemeContext()

  const transferStudent = async (data: iClassStudentTranferRequest) => {
    try {
      onClose()
      setLoading(true)
      await apiClassStudent.destroy(class_id)
      await apiClassStudent.create({ ...data, students: [{ id: student_id }] })
      handleSucess('Aluno transferido com sucesso!')
      getData && getData()
      if (back) navigate(back)
    } catch {
      handleError('Não foi possível transferir o aluno no momento!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <DialogBaseChildren
      open={open}
      onClose={onClose}
      title="Transferir Aluno de Turma"
      description={`Deseja continuar transferindo o aluno ${student_name.toUpperCase()} da
      Turma ${class_name.toUpperCase()}?`}
    >
      <FormContainer
        onSuccess={transferStudent}
        resolver={zodResolver(classStudentTranferSchema)}
      >
        <BaseContentChildren>
          <AutoCompleteSchool />
          <AutoCompleteTransfer />
          <Button variant="contained" type="submit" fullWidth>
            Salvar
          </Button>
        </BaseContentChildren>
      </FormContainer>
    </DialogBaseChildren>
  )
}
