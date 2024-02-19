import { FormContainer, TextFieldElement } from 'react-hook-form-mui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import {
  BaseContentChildren,
  DialogBaseChildren,
  apiClass,
  classCreateSchema,
  iClassRequest,
  iDialogBaseProps,
  useAppThemeContext,
} from '../../../../shared'

export const DialogCreateClass = ({ onClose, open }: iDialogBaseProps) => {
  const navigate = useNavigate()
  const { setLoading, handleSucess, handleError } = useAppThemeContext()

  const createClass = async (data: iClassRequest) => {
    try {
      onClose()
      setLoading(true)
      const classData = await apiClass.create(data)
      handleSucess('A turma foi cadastrada com sucesso!')
      navigate('/class/' + classData.id)
    } catch {
      handleError(
        'No momento, não foi possível cadastrar a turma. Por favor, tente novamente mais tarde.',
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
        resolver={zodResolver(classCreateSchema)}
      >
        <BaseContentChildren>
          <TextFieldElement
            name="name"
            label="Nome da Turma"
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
