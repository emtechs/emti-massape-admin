import { Groups, School, Workspaces } from '@mui/icons-material'
import { TabsBase } from '../../../shared'
import { useSearchParams } from 'react-router-dom'

export const TabsRetrieveClass = () => {
  const [searchParams] = useSearchParams()
  const school_id = searchParams.get('school_id')

  return (
    <TabsBase
      elemArr={[
        { icon: <Workspaces />, label: 'Turma', value: '' },
        {
          icon: <School />,
          label: 'Escolas',
          value: 'school',
          disabled: school_id !== null,
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
