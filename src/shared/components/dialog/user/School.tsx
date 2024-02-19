import { zodResolver } from '@hookform/resolvers/zod'
import { Typography, Button } from '@mui/material'
import { FormContainer } from 'react-hook-form-mui'
import {
  AutoCompleteSchool,
  BaseContentChildren,
  DialogBaseChildren,
  apiServer,
  defineServerSchema,
  iDialogUserProps,
  iSchoolServerRequest,
  useAppThemeContext,
} from '../../../../shared'

export const DialogCreateSchoolServer = ({
  onClose,
  open,
  user,
  getData,
}: iDialogUserProps) => {
  const { setLoading, handleSucess, handleError } = useAppThemeContext()

  const createSchoolServer = async (data: iSchoolServerRequest) => {
    try {
      onClose()
      setLoading(true)
      await apiServer.connect({ ...data, id: user.id })
      handleSucess('O servidor foi cadastrada com sucesso na escola!')
      getData && getData()
    } catch {
      handleError(
        'No momento, não foi possível cadastrar o servidor na escola. Por favor, tente novamente mais tarde.',
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
        onSuccess={createSchoolServer}
        resolver={zodResolver(defineServerSchema)}
      >
        <BaseContentChildren>
          <Typography>Usuário: {user.name}</Typography>
          <AutoCompleteSchool
            name="schools"
            query={`&none_server_id=${user.id}`}
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
