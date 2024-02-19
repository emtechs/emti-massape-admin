import { Chip } from '@mui/material'
import { School } from '@mui/icons-material'
import { TitleBasePage } from '../../../../shared'

export const TitleSchoolPage = () => {
  return (
    <TitleBasePage>
      <Chip
        label="Escolas"
        color="primary"
        icon={<School sx={{ mr: 0.5 }} fontSize="inherit" />}
      />
    </TitleBasePage>
  )
}
