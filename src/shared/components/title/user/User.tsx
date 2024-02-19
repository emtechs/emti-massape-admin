import { Chip } from '@mui/material'
import { People } from '@mui/icons-material'
import { TitleBasePage } from '../../../../shared'

export const TitleUserPage = () => {
  return (
    <TitleBasePage>
      <Chip
        label="Usuários"
        color="primary"
        icon={<People sx={{ mr: 0.5 }} fontSize="inherit" />}
      />
    </TitleBasePage>
  )
}
