import { useSearchParams } from 'react-router-dom'
import { ViewUserSchool } from '../../shared'

export const DisplayUserPage = () => {
  const [searchParams] = useSearchParams()

  const view = searchParams.get('view')

  switch (view) {
    case 'school':
      return <ViewUserSchool />

    default:
      return <></>
  }
}
