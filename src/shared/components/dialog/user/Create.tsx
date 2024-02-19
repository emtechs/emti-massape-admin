import { useNavigate } from 'react-router-dom'
import {
  FormContainer,
  SelectElement,
  TextFieldElement,
} from 'react-hook-form-mui'
import { Button, Grid } from '@mui/material'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  AutoCompleteRole,
  BaseContentChildren,
  DialogBaseChildren,
  InputCpf,
  apiAuth,
  apiServer,
  apiUser,
  createUserSchema,
  iDialogBaseProps,
  iUserRequest,
  useAppThemeContext,
} from '../../../../shared'

export const DialogCreateUser = ({ onClose, open }: iDialogBaseProps) => {
  const navigate = useNavigate()
  const { setLoading, handleSucess, handleError } = useAppThemeContext()

  const createUser = async (data: iUserRequest) => {
    try {
      setLoading(true)
      const user = await apiAuth.createUser(data)
      if (data.role === 'ADMIN') {
        await apiUser.create({ ...data, ...user })
      } else {
        await apiServer.create({ ...data, ...user })
      }
      handleSucess('Usuário cadastrado com sucesso!')
      navigate(`/user/${user.id}`)
    } catch {
      handleError('Usuário já cadastrado no sistema!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <DialogBaseChildren
      open={open}
      onClose={onClose}
      title="Novo Usuário"
      description=""
    >
      <FormContainer
        onSuccess={(data) => {
          onClose()
          createUser(data)
        }}
        resolver={zodResolver(createUserSchema)}
      >
        <BaseContentChildren>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <InputCpf />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextFieldElement name="name" label="Nome" required fullWidth />
            </Grid>
            <Grid item xs={12} sm={4}>
              <SelectElement
                label="Função"
                name="role"
                options={[
                  {
                    id: 'ADMIN',
                    label: 'Administrador',
                  },
                  {
                    id: 'DIRET',
                    label: 'Diretor',
                  },
                  {
                    id: 'SERV',
                    label: 'Servidor',
                  },
                ]}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <AutoCompleteRole />
            </Grid>
          </Grid>
          <Button variant="contained" type="submit" fullWidth>
            Salvar
          </Button>
        </BaseContentChildren>
      </FormContainer>
    </DialogBaseChildren>
  )
}
