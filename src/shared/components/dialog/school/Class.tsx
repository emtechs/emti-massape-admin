import { zodResolver } from '@hookform/resolvers/zod'
import { FormContainer } from 'react-hook-form-mui'
import { Button } from '@mui/material'
import {
  AutoCompleteClass,
  BaseContentChildren,
  DialogBaseChildren,
  apiClassYear,
  classYearCreateSchema,
  iClassYearRequest,
  iDialogBaseProps,
  useAppThemeContext,
} from '../../../../shared'

interface iDialogCreateSchoolClassProps extends iDialogBaseProps {
  school_id: string
  year_id: string
}

export const DialogCreateSchoolClass = ({
  onClose,
  open,
  school_id,
  year_id,
  getData,
}: iDialogCreateSchoolClassProps) => {
  const { setLoading, handleError, handleSucess } = useAppThemeContext()

  const createClass = async (data: iClassYearRequest) => {
    try {
      onClose()
      setLoading(true)
      await apiClassYear.create({
        ...data,
        schools: [{ id: school_id }],
        year_id,
      })
      handleSucess('A turma foi cadastrada com sucesso na escola!')
      getData && getData()
    } catch {
      handleError(
        'No momento, não foi possível cadastrar a turma na escola. Por favor, tente novamente mais tarde.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <DialogBaseChildren
      open={open}
      onClose={onClose}
      title="Nova Turma"
      description=""
    >
      <FormContainer
        onSuccess={createClass}
        resolver={zodResolver(classYearCreateSchema)}
      >
        <BaseContentChildren>
          <AutoCompleteClass
            query={`&school_id=${school_id}&year_id=${year_id}`}
            name="classes"
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
