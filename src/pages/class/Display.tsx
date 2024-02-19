import { useSearchParams } from 'react-router-dom'
import { ViewClassSchool, ViewClassStudent } from '../../shared'

export const DisplayClassPage = () => {
  const [searchParams] = useSearchParams()

  const view = searchParams.get('view')

  switch (view) {
    case 'school':
      return <ViewClassSchool />

    case 'student':
      return <ViewClassStudent />

    default:
      return <></>
  }
}
