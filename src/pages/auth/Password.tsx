import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FormContainer, PasswordElement } from 'react-hook-form-mui'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, IconButton } from '@mui/material'
import { Info } from '@mui/icons-material'
import {
  Glossary,
  LayoutContentFull,
  LayoutFull,
  apiAuth,
  iRecoveryPasswordRequest,
  passwordRecoverySchema,
  useAppThemeContext,
} from '../../shared'

export const PasswordPage = () => {
  const navigate = useNavigate()
  const { userId, token } = useParams()
  const { setLoading, handleSucess, handleError } = useAppThemeContext()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(!open)

  const recoveryPassword = async (
    data: iRecoveryPasswordRequest,
    userId: string,
    token: string,
  ) => {
    try {
      setLoading(true)
      await apiAuth.passwordRecovery(data, userId, token)
      handleSucess('Senha alterada com sucesso')
    } catch (e) {
      handleError('Link expirado, solicite um novo link na tela de login!')
    } finally {
      setLoading(false)
      navigate('/')
    }
  }

  return (
    <LayoutFull padding={6}>
      <FormContainer
        onSuccess={(data) => {
          if (userId && token) recoveryPassword(data, userId, token)
        }}
        resolver={zodResolver(passwordRecoverySchema)}
      >
        <LayoutContentFull>
          <IconButton onClick={handleOpen} color="secondary">
            <Info />
          </IconButton>
          <PasswordElement
            name="password"
            label="Nova Senha"
            required
            fullWidth
          />
          <PasswordElement
            name="repeat_password"
            label="Confirmar Nova Senha"
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
        message="Preencha as informações com a sua nova senha e repita-a para ter acesso
        ao sistema com a senha atualizada."
      />
    </LayoutFull>
  )
}
