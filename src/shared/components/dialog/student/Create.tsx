import { FormContainer, TextFieldElement } from 'react-hook-form-mui'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@mui/material'
import {
  useAppThemeContext,
  BaseContentChildren,
  DialogBaseChildren,
  iDialogBaseProps,
  apiStudent,
  studentCreateSchema,
  iStudentRequest,
} from '../../../../shared'

export const DialogCreateStudent = ({ onClose, open }: iDialogBaseProps) => {
  const { setLoading, handleSucess, handleError } = useAppThemeContext()

  const createStudent = async (data: iStudentRequest) => {
    try {
      onClose()
      setLoading(true)
      await apiStudent.create(data)
      handleSucess('O aluno foi cadastrada com sucesso!')
    } catch {
      handleError(
        'No momento, não foi possível cadastrar o aluno. Por favor, tente novamente mais tarde.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <DialogBaseChildren
      open={open}
      onClose={onClose}
      title="Novo Aluno"
      description=""
    >
      <FormContainer
        onSuccess={createStudent}
        resolver={zodResolver(studentCreateSchema)}
      >
        <BaseContentChildren>
          <TextFieldElement
            name="registry"
            label="Matrícula"
            required
            fullWidth
          />
          <TextFieldElement name="name" label="Nome" required fullWidth />
          <Button variant="contained" type="submit" fullWidth>
            Salvar
          </Button>
        </BaseContentChildren>
      </FormContainer>
    </DialogBaseChildren>
  )
}
