import { zodResolver } from '@hookform/resolvers/zod'
import { FormContainer } from 'react-hook-form-mui'
import { Button } from '@mui/material'
import {
  AutoCompleteClassYear,
  AutoCompleteStudent,
  BaseContentChildren,
  DialogBaseChildren,
  apiClassStudent,
  classStudentCreateSchema,
  iClassStudentRequest,
  iDialogBaseProps,
  useAppThemeContext,
} from '../../../../shared'

interface iDialogCreateSchoolStudentProps extends iDialogBaseProps {
  school_id: string
  year_id: string
}

export const DialogCreateSchoolStudent = ({
  onClose,
  open,
  school_id,
  year_id,
  getData,
}: iDialogCreateSchoolStudentProps) => {
  const { setLoading, handleError, handleSucess } = useAppThemeContext()

  const createClass = async (data: iClassStudentRequest) => {
    try {
      onClose()
      setLoading(true)
      await apiClassStudent.create(data)
      handleSucess('O aluno foi cadastrada com sucesso na escola!')
      getData && getData()
    } catch {
      handleError(
        'No momento, não foi possível cadastrar o aluno na escola. Por favor, tente novamente mais tarde.',
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
        resolver={zodResolver(classStudentCreateSchema)}
      >
        <BaseContentChildren>
          <AutoCompleteClassYear
            query={`&school_id=${school_id}&year_id=${year_id}`}
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
