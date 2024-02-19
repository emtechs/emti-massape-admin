import {
  FieldValues,
  FormContainer,
  TextFieldElement,
} from 'react-hook-form-mui'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@mui/material'
import {
  iDialogSchoolProps,
  useAppThemeContext,
  apiSchool,
  schoolUpdateSchema,
  BaseContentChildren,
  DialogBaseChildren,
} from '../../../../shared'

export const DialogEditSchool = ({
  onClose,
  open,
  school,
  getData,
}: iDialogSchoolProps) => {
  const { setLoading, handleSucess, handleError } = useAppThemeContext()

  const updateSchool = async (data: FieldValues) => {
    try {
      onClose()
      setLoading(true)
      await apiSchool.update(data, school.id)
      handleSucess(`Sucesso ao alterar o nome da Escola!`)
      getData && getData()
    } catch {
      handleError(`Não foi possível atualizar o nome da escola no momento!`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <DialogBaseChildren
      open={open}
      onClose={onClose}
      title="Editar Escola"
      description=""
    >
      <FormContainer
        defaultValues={{
          name: school.name,
        }}
        onSuccess={updateSchool}
        resolver={zodResolver(schoolUpdateSchema)}
      >
        <BaseContentChildren>
          <TextFieldElement
            name="name"
            label="Nome da Escola"
            required
            fullWidth
          />
          <Button variant="contained" type="submit" fullWidth>
            Salvar
          </Button>
        </BaseContentChildren>
      </FormContainer>
    </DialogBaseChildren>
  )
}
