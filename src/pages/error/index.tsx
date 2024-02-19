import { Navigate } from 'react-router-dom'
import {
  LayoutContentFull,
  LayoutFull,
  useAppThemeContext,
  useAuthContext,
} from '../../shared'
import { Button, Typography } from '@mui/material'

export const ErrorPage = () => {
  const { loading } = useAppThemeContext()
  const { userProfile, accessToken } = useAuthContext()

  return loading ? (
    <></>
  ) : userProfile ? (
    <Navigate to="/" />
  ) : (
    <LayoutFull padding={5}>
      <LayoutContentFull>
        <Typography variant="h6" align="center" fontWeight="bold">
          Desculpe, você não possui as permissões necessárias para acessar este
          conteúdo.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          href={`https://emtidigital-massape.emsolucoestecnologicas.com.br/token/${accessToken}`}
        >
          Voltar
        </Button>
      </LayoutContentFull>
    </LayoutFull>
  )
}
