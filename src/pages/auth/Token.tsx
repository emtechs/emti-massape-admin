import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'

export const TokenPage = () => {
  const { token } = useParams()

  useEffect(() => {
    if (token) localStorage.setItem('@EMTechs:token', token)
  }, [token])

  return <Navigate to="/" />
}
