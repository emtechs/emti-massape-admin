import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Chip, Skeleton } from '@mui/material'
import { Workspaces } from '@mui/icons-material'
import {
  LinkChip,
  adaptNameSchool,
  iLabelBaseProps,
  useAppThemeContext,
  useDataContext,
} from '../../../shared'

export const LabelClass = ({ clickable, to }: iLabelBaseProps) => {
  const { mdDown } = useAppThemeContext()
  const { classData, loadingClass, handleClassData } = useDataContext()
  const [searchParams] = useSearchParams()

  const class_id = searchParams.get('school_id')

  useEffect(() => {
    if (class_id) {
      if (classData?.id !== class_id) handleClassData(class_id)
    }
  }, [class_id])

  const label = loadingClass ? (
    <Skeleton width={100} />
  ) : mdDown ? (
    adaptNameSchool(classData?.name, 15)
  ) : (
    classData?.name
  )

  return clickable ? (
    <LinkChip
      label={label}
      icon={<Workspaces sx={{ mr: 0.5 }} fontSize="inherit" />}
      to={to || `/class/${classData?.id}`}
    />
  ) : (
    <Chip
      color="primary"
      label={label}
      icon={<Workspaces sx={{ mr: 0.5 }} fontSize="inherit" />}
    />
  )
}
