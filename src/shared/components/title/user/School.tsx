import { Chip } from '@mui/material'
import { School } from '@mui/icons-material'
import { LabelUser, TitleBaseItemsPage } from '../../../../shared'

export const TitleUserSchool = () => {
  return (
    <TitleBaseItemsPage>
      <LabelUser clickable />
      <Chip
        color="primary"
        label="Escolas"
        icon={<School sx={{ mr: 0.5 }} fontSize="inherit" />}
      />
    </TitleBaseItemsPage>
  )
}
