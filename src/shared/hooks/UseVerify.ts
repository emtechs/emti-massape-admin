import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  apiClass,
  apiSchool,
  apiServer,
  apiUser,
  useAppThemeContext,
} from '../../shared'

export const useVerify = () => {
  const navigate = useNavigate()
  const { setLoading } = useAppThemeContext()

  const verifyClass = useCallback((id: string) => {
    setLoading(true)
    apiClass
      .verify(id)
      .catch(() => navigate('/'))
      .finally(() => setLoading(false))
  }, [])

  const verifySchool = useCallback((id: string) => {
    setLoading(true)
    apiSchool
      .verify(id)
      .catch(() => navigate('/'))
      .finally(() => setLoading(false))
  }, [])

  const verifyServer = useCallback((id: string) => {
    setLoading(true)
    apiServer
      .verify(id)
      .catch(() => navigate('/'))
      .finally(() => setLoading(false))
  }, [])

  const verifyUser = useCallback((id: string) => {
    setLoading(true)
    apiUser
      .verify(id)
      .catch(() => navigate('/'))
      .finally(() => setLoading(false))
  }, [])

  return { verifyClass, verifySchool, verifyServer, verifyUser }
}
