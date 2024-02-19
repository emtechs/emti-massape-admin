import { useSearchParams } from 'react-router-dom'
import { Person, School } from '@mui/icons-material'
import { TabsBase, useDataContext } from '../../../shared'

export const TabsRetrieveUser = () => {
  const { userData } = useDataContext()
  const [searchParams] = useSearchParams()

  const school_id = searchParams.get('school_id')

  return (
    <TabsBase
      elemArr={[
        { icon: <Person />, label: 'Usuário', value: '' },
        {
          icon: <School />,
          label: 'Escolas',
          disabled: userData?.role === 'ADMIN' || school_id !== null,
          value: 'school',
        },
      ]}
    />
  )
}
