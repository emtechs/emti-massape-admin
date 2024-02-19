import { Chip } from '@mui/material'
import { Workspaces } from '@mui/icons-material'
import { TitleBasePage } from '../../../../shared'

export const TitleClassPage = () => {
  return (
    <TitleBasePage>
      <Chip
        label="Turmas"
        color="primary"
        icon={<Workspaces sx={{ mr: 0.5 }} fontSize="inherit" />}
      />
    </TitleBasePage>
  )
}
