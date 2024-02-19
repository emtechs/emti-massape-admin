import { useSearchParams } from 'react-router-dom'
import {
  ViewSchoolClass,
  ViewSchoolServer,
  ViewSchoolStudent,
} from '../../shared'

export const DisplaySchoolPage = () => {
  const [searchParams] = useSearchParams()

  const view = searchParams.get('view')

  switch (view) {
    case 'server':
      return <ViewSchoolServer />
    case 'class':
      return <ViewSchoolClass />

    case 'student':
      return <ViewSchoolStudent />

    default:
      return <></>
  }
}
