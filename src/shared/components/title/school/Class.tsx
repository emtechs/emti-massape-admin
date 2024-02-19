import { Chip } from '@mui/material'
import { Workspaces } from '@mui/icons-material'
import { LabelSchool, TitleBaseItemsPage } from '../../../../shared'

export const TitleSchoolClass = () => {
  return (
    <TitleBaseItemsPage>
      <LabelSchool clickable />
      <Chip
        color="primary"
        label="Turmas"
        icon={<Workspaces sx={{ mr: 0.5 }} fontSize="inherit" />}
      />
    </TitleBaseItemsPage>
  )
}
