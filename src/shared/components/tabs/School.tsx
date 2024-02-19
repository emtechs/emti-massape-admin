import { useSearchParams } from 'react-router-dom'
import { Groups, People, School, Workspaces } from '@mui/icons-material'
import { TabsBase } from '../../../shared'

export const TabsRetrieveSchool = () => {
  const [searchParams] = useSearchParams()

  const user_id = searchParams.get('user_id')
  const class_id = searchParams.get('class_id')

  return (
    <TabsBase
      elemArr={[
        { icon: <School />, label: 'Escola', value: '' },
        {
          icon: <People />,
          label: 'Servidores',
          value: 'server',
          disabled: user_id !== null,
        },
        {
          icon: <Workspaces />,
          label: 'Turmas',
          value: 'class',
          disabled: class_id !== null,
        },
        {
          icon: <Groups />,
          label: 'Alunos',
          value: 'student',
        },
      ]}
    />
  )
}
