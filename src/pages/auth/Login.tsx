import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, IconButton } from '@mui/material'
import { Login as LoginIcon, LockReset, Info } from '@mui/icons-material'
import { FormContainer, PasswordElement } from 'react-hook-form-mui'
import {
  ButtonDest,
  Glossary,
  InputCpf,
  LayoutContentFull,
  LayoutFull,
  loginSchema,
  useAuthContext,
} from '../../shared'

export const LoginPage = () => {
  const { isAuthenticated, login } = useAuthContext()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(!open)

  if (isAuthenticated) return <Navigate to="/" />

  return (
    <LayoutFull padding={6}>
      <FormContainer onSuccess={login} resolver={zodResolver(loginSchema)}>
        <LayoutContentFull>
          <IconButton onClick={handleOpen} color="secondary">
            <Info />
          </IconButton>
          <InputCpf name="login" />
          <PasswordElement name="password" label="Senha" required fullWidth />
          <Button
            variant="contained"
            startIcon={<LoginIcon />}
            type="submit"
            fullWidth
          >
            Entrar
          </Button>
          <ButtonDest
            title="Recuperar Senha"
            color="secondary"
            startIcon={<LockReset />}
            fullWidth
            to="/recovery"
          />
        </LayoutContentFull>
      </FormContainer>
      <Glossary
        open={open}
        onClose={handleOpen}
        message="Preencha as informações com seu usuário e senha para obter acesso ao
        sistema."
      />
    </LayoutFull>
  )
}
