import { Chip } from '@mui/material'
import { Groups } from '@mui/icons-material'
import { TitleBasePage } from '../../../../shared'

export const TitleStudentPage = () => {
  return (
    <TitleBasePage>
      <Chip
        label="Alunos"
        color="primary"
        icon={<Groups sx={{ mr: 0.5 }} fontSize="inherit" />}
      />
    </TitleBasePage>
  )
}
