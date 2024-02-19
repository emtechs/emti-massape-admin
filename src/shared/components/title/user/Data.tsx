import { useSearchParams } from 'react-router-dom'
import { People } from '@mui/icons-material'
import {
  LabelSchool,
  LabelUser,
  LinkChip,
  TitleBaseItemsPage,
  useAppThemeContext,
} from '../../../../shared'

export const TitleUserData = () => {
  const { mdDown } = useAppThemeContext()
  const [searchParams] = useSearchParams()

  const school_id = searchParams.get('school_id')

  return school_id ? (
    <TitleBaseItemsPage>
      <LabelSchool clickable />
      <LabelUser />
    </TitleBaseItemsPage>
  ) : (
    <TitleBaseItemsPage>
      <LinkChip
        icon={<People sx={{ mr: 0.5 }} fontSize="inherit" />}
        label={mdDown ? '...' : 'Usuários'}
        to="/user"
      />
      <LabelUser />
    </TitleBaseItemsPage>
  )
}
