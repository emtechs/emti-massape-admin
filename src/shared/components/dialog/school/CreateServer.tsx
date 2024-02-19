import { zodResolver } from '@hookform/resolvers/zod'
import { FormContainer } from 'react-hook-form-mui'
import { Button } from '@mui/material'
import {
  AutoCompleteUser,
  BaseContentChildren,
  DialogBaseChildren,
  apiServer,
  iDialogBaseProps,
  iServerRequest,
  serverCreateSchema,
  useAppThemeContext,
} from '../../../../shared'

interface iDialogCreateServerProps extends iDialogBaseProps {
  school_id: string
}

export const DialogCreateServer = ({
  school_id,
  onClose,
  open,
  getData,
}: iDialogCreateServerProps) => {
  const { setLoading, handleError, handleSucess } = useAppThemeContext()

  const createServer = async (data: iServerRequest) => {
    try {
      onClose()
      setLoading(true)
      await apiServer.connect({
        ...data,
        schools: [{ id: school_id }],
      })
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
      title="Novo Servidor"
      description=""
    >
      <FormContainer
        onSuccess={createServer}
        resolver={zodResolver(serverCreateSchema)}
      >
        <BaseContentChildren>
          <AutoCompleteUser
            query={'&order=name&role=SERV&school_id=' + school_id}
            name="server"
            label="Servidor"
          />
          <Button variant="contained" type="submit" fullWidth>
            Salvar
          </Button>
        </BaseContentChildren>
      </FormContainer>
    </DialogBaseChildren>
  )
}
