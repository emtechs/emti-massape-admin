import { useSearchParams } from 'react-router-dom'
import { School } from '@mui/icons-material'
import {
  LabelSchool,
  LabelUser,
  LinkChip,
  TitleBaseItemsPage,
  useAppThemeContext,
} from '../../../../shared'

export const TitleSchoolData = () => {
  const { mdDown } = useAppThemeContext()
  const [searchParams] = useSearchParams()

  const user_id = searchParams.get('user_id')

  return user_id ? (
    <TitleBaseItemsPage>
      <LabelUser clickable />
      <LabelSchool />
    </TitleBaseItemsPage>
  ) : (
    <TitleBaseItemsPage>
      <LinkChip
        label={mdDown ? '...' : 'Escolas'}
        icon={<School sx={{ mr: 0.5 }} fontSize="inherit" />}
        to="/school"
      />
      <LabelSchool />
    </TitleBaseItemsPage>
  )
}
