import { Chip } from '@mui/material'
import { Groups } from '@mui/icons-material'
import { LabelClass, TitleBaseItemsPage } from '../../../../shared'

export const TitleClassStudent = () => {
  return (
    <TitleBaseItemsPage>
      <LabelClass clickable />
      <Chip
        color="primary"
        label="Alunos"
        icon={<Groups sx={{ mr: 0.5 }} fontSize="inherit" />}
      />
    </TitleBaseItemsPage>
  )
}
