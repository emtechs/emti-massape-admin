import { zodResolver } from '@hookform/resolvers/zod'
import { FormContainer } from 'react-hook-form-mui'
import { Button } from '@mui/material'
import {
  AutoCompleteClassSchool,
  AutoCompleteStudent,
  BaseContentChildren,
  DialogBaseChildren,
  apiClassStudent,
  classSchoolStudentCreateSchema,
  iClassSchoolStudentRequest,
  iDialogBaseProps,
  useAppThemeContext,
} from '../../../../shared'

interface iDialogCreateClassStudentProps extends iDialogBaseProps {
  class_id: string
  year_id: string
}

export const DialogCreateClassStudent = ({
  onClose,
  open,
  class_id,
  year_id,
  getData,
}: iDialogCreateClassStudentProps) => {
  const { setLoading, handleError, handleSucess } = useAppThemeContext()

  const createClass = async (data: iClassSchoolStudentRequest) => {
    try {
      onClose()
      setLoading(true)
      await apiClassStudent.createSchool({ ...data, class_id, year_id })
      handleSucess('O aluno foi cadastrada com sucesso na turma!')
      getData && getData()
    } catch {
      handleError(
        'No momento, não foi possível cadastrar o aluno na turma. Por favor, tente novamente mais tarde.',
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
        onSuccess={createClass}
        resolver={zodResolver(classSchoolStudentCreateSchema)}
      >
        <BaseContentChildren>
          <AutoCompleteClassSchool
            name="classSchool"
            query={`&class_id=${class_id}&year_id=${year_id}`}
          />
          <AutoCompleteStudent
            query={`&year_id=${year_id}`}
            name="students"
            isMultiple
          />
          <Button variant="contained" type="submit" fullWidth>
            Salvar
          </Button>
        </BaseContentChildren>
      </FormContainer>
    </DialogBaseChildren>
  )
}
