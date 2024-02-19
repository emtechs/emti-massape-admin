import { zodResolver } from '@hookform/resolvers/zod'
import { FormContainer } from 'react-hook-form-mui'
import { Button } from '@mui/material'
import {
  AutoCompleteSchool,
  BaseContentChildren,
  DialogBaseChildren,
  apiClassYear,
  iDialogBaseProps,
  iSchoolClassRequest,
  schoolClassCreateSchema,
  useAppThemeContext,
} from '../../../../shared'

interface iDialogCreateClassSchoolProps extends iDialogBaseProps {
  class_id: string
  year_id: string
}

export const DialogCreateClassSchool = ({
  onClose,
  open,
  class_id,
  year_id,
  getData,
}: iDialogCreateClassSchoolProps) => {
  const { setLoading, handleError, handleSucess } = useAppThemeContext()

  const createSchool = async (data: iSchoolClassRequest) => {
    try {
      onClose()
      setLoading(true)
      await apiClassYear.create({
        ...data,
        classes: [{ id: class_id }],
        year_id,
      })
      handleSucess('A escola foi cadastrada com sucesso na turma!')
      getData && getData()
    } catch {
      handleError(
        'No momento, não foi possível cadastrar a escola na turma. Por favor, tente novamente mais tarde.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <DialogBaseChildren
      open={open}
      onClose={onClose}
      title="Nova Escola"
      description=""
    >
      <FormContainer
        onSuccess={createSchool}
        resolver={zodResolver(schoolClassCreateSchema)}
      >
        <BaseContentChildren>
          <AutoCompleteSchool
            query={`&class_id=${class_id}&year_id=${year_id}`}
            name="schools"
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
