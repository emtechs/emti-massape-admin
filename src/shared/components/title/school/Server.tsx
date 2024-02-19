import { Chip } from '@mui/material'
import { People } from '@mui/icons-material'
import { LabelSchool, TitleBaseItemsPage } from '../../../../shared'

export const TitleSchoolServer = () => {
  return (
    <TitleBaseItemsPage>
      <LabelSchool clickable />
      <Chip
        color="primary"
        label="Servidores"
        icon={<People sx={{ mr: 0.5 }} fontSize="inherit" />}
      />
    </TitleBaseItemsPage>
  )
}
