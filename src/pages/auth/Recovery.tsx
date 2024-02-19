import { AxiosError } from 'axios'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { FormContainer } from 'react-hook-form-mui'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, IconButton } from '@mui/material'
import { Login as LoginIcon, LockReset, Info } from '@mui/icons-material'
import {
  ButtonDest,
  Glossary,
  InputCpf,
  LayoutContentFull,
  LayoutFull,
  apiAuth,
  iRecoveryRequest,
  recoverySchema,
  useAppThemeContext,
  useAuthContext,
} from '../../shared'

export const RecoveryPage = () => {
  const navigate = useNavigate()
  const { setLoading, handleSucess, handleError } = useAppThemeContext()
  const { isAuthenticated } = useAuthContext()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(!open)

  if (isAuthenticated) return <Navigate to="/" />

  const recovery = async (data: iRecoveryRequest) => {
    try {
      setLoading(true)
      await apiAuth.recovery(data)
      handleSucess('Siga as instruções enviadas no email da sua conta')
      navigate('/')
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.status === 401) {
          handleError('Conta desativada, entre em contato com o administrador!')
        } else if (e.response?.status === 404) {
          handleError(
            'Usuário não cadastrado, entre em contato com o administrador!',
          )
        } else {
          handleError(
            'Nenhum email cadastrado para essa conta, entre em contato com o administrador!',
          )
        }
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <LayoutFull padding={6}>
      <FormContainer
        onSuccess={recovery}
        resolver={zodResolver(recoverySchema)}
      >
        <LayoutContentFull>
          <IconButton onClick={handleOpen} color="secondary">
            <Info />
          </IconButton>
          <InputCpf name="login" />
          <Button
            variant="contained"
            color="secondary"
            startIcon={<LockReset />}
            type="submit"
            fullWidth
          >
            Recuperar Senha
          </Button>
          <ButtonDest
            title="Entrar"
            startIcon={<LoginIcon />}
            fullWidth
            to="/login"
          />
        </LayoutContentFull>
      </FormContainer>
      <Glossary
        open={open}
        onClose={handleOpen}
        message="Preencha o campo com seu usuário. Em seguida, você receberá um link
            no seu email cadastrado para efetuar a troca da senha."
      />
    </LayoutFull>
  )
}
