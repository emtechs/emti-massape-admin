import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import {
  FormContainer,
  PasswordElement,
  TextFieldElement,
} from 'react-hook-form-mui'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, IconButton } from '@mui/material'
import { Info } from '@mui/icons-material'
import {
  Glossary,
  LayoutContentFull,
  LayoutFull,
  apiAuth,
  iChildren,
  iUserFirstRequest,
  useAppThemeContext,
  useAuthContext,
  userFirstSchema,
} from '../../shared'

export const FirstPage = ({ children }: iChildren) => {
  const { setLoading, handleSucess, handleError } = useAppThemeContext()
  const { userProfile, profileUser } = useAuthContext()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(!open)

  const first = async (id: string, data: iUserFirstRequest) => {
    try {
      setLoading(true)
      await apiAuth.updateUser(id, data)
      handleSucess('Dados cadastrados com sucesso')
      profileUser()
    } catch {
      handleError('Não foi possível cadastrar os dados no momento!')
    } finally {
      setLoading(false)
    }
  }

  if (userProfile) {
    if (!userProfile.is_super) return <Navigate to="/error" />
    if (!userProfile.is_first_access) return children
  }

  return (
    <>
      {userProfile ? (
        <LayoutFull padding={5}>
          <FormContainer
            onSuccess={(data) => {
              if (userProfile) first(userProfile.id, data)
            }}
            resolver={zodResolver(userFirstSchema)}
          >
            <LayoutContentFull>
              <IconButton onClick={handleOpen} color="secondary">
                <Info />
              </IconButton>
              <TextFieldElement
                name="name"
                label="Nome completo"
                required
                fullWidth
              />
              <TextFieldElement
                name="email"
                label="Email"
                type="email"
                required
                fullWidth
              />
              <PasswordElement
                name="password"
                label="Senha"
                required
                fullWidth
              />
              <PasswordElement
                name="repeat_password"
                label="Confirmar Senha"
                required
                fullWidth
              />
              <Button variant="contained" type="submit" fullWidth>
                Enviar
              </Button>
            </LayoutContentFull>
          </FormContainer>
          <Glossary
            open={open}
            onClose={handleOpen}
            message="Preencha as informações com seus dados para obter acesso ao sistema."
          />
        </LayoutFull>
      ) : (
        <Navigate to="/error" />
      )}
    </>
  )
}
