import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Chip, Skeleton } from '@mui/material'
import { School } from '@mui/icons-material'
import {
  LinkChip,
  adaptNameSchool,
  iLabelBaseProps,
  useAppThemeContext,
  useDataContext,
} from '../../../shared'

export const LabelSchool = ({ clickable, to }: iLabelBaseProps) => {
  const { mdDown } = useAppThemeContext()
  const { schoolData, loadingSchool, handleSchoolData } = useDataContext()
  const [searchParams] = useSearchParams()

  const school_id = searchParams.get('school_id')

  useEffect(() => {
    if (school_id) {
      if (schoolData?.id !== school_id) handleSchoolData(school_id)
    }
  }, [school_id])

  const label = loadingSchool ? (
    <Skeleton width={100} />
  ) : mdDown ? (
    adaptNameSchool(schoolData?.name, 15)
  ) : (
    schoolData?.name
  )

  return clickable ? (
    <LinkChip
      label={label}
      icon={<School sx={{ mr: 0.5 }} fontSize="inherit" />}
      to={to || `/school/${schoolData?.id}`}
    />
  ) : (
    <Chip
      color="primary"
      label={label}
      icon={<School sx={{ mr: 0.5 }} fontSize="inherit" />}
    />
  )
}
