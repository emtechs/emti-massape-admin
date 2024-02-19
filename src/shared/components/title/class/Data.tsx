import { Workspaces } from '@mui/icons-material'
import {
  LabelClass,
  LinkChip,
  TitleBaseItemsPage,
  useAppThemeContext,
} from '../../../../shared'

export const TitleClassData = () => {
  const { mdDown } = useAppThemeContext()

  return (
    <TitleBaseItemsPage>
      <LinkChip
        label={mdDown ? '...' : 'Turmas'}
        icon={<Workspaces sx={{ mr: 0.5 }} fontSize="inherit" />}
        to="/class"
      />
      <LabelClass />
    </TitleBaseItemsPage>
  )
}
