import { Chip } from '@mui/material'
import { School } from '@mui/icons-material'
import { LabelClass, TitleBasePage } from '../../../../shared'

export const TitleClassSchool = () => {
  return (
    <TitleBasePage>
      <LabelClass clickable />
      <Chip
        label="Escolas"
        color="primary"
        icon={<School sx={{ mr: 0.5 }} fontSize="inherit" />}
      />
    </TitleBasePage>
  )
}
