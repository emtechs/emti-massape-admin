import { Chip } from '@mui/material'
import { Groups } from '@mui/icons-material'
import { LabelSchool, TitleBaseItemsPage } from '../../../../shared'

export const TitleSchoolStudent = () => {
  return (
    <TitleBaseItemsPage>
      <LabelSchool clickable />
      <Chip
        color="primary"
        label="Alunos"
        icon={<Groups sx={{ mr: 0.5 }} fontSize="inherit" />}
      />
    </TitleBaseItemsPage>
  )
}
