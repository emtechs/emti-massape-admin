import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Chip, Skeleton } from '@mui/material'
import { Person } from '@mui/icons-material'
import {
  LinkChip,
  adaptName,
  iLabelBaseProps,
  useAppThemeContext,
  useDataContext,
} from '../../../shared'

export const LabelUser = ({ clickable, to }: iLabelBaseProps) => {
  const { mdDown } = useAppThemeContext()
  const { loadingUser, userData, handleServerData } = useDataContext()
  const [searchParams] = useSearchParams()

  const user_id = searchParams.get('user_id')

  useEffect(() => {
    if (user_id) {
      if (userData?.key !== user_id) handleServerData(user_id)
    }
  }, [user_id])

  const label = loadingUser ? (
    <Skeleton width={100} />
  ) : mdDown ? (
    adaptName(userData?.name)
  ) : (
    userData?.name
  )

  return clickable ? (
    <LinkChip
      label={label}
      icon={<Person sx={{ mr: 0.5 }} fontSize="inherit" />}
      to={to || `/user/${userData?.id}`}
    />
  ) : (
    <Chip
      color="primary"
      label={label}
      icon={<Person sx={{ mr: 0.5 }} fontSize="inherit" />}
    />
  )
}
