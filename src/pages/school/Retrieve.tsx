import { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import {
  Footer,
  LayoutDrawer,
  TabsRetrieveSchool,
  TitleSchoolData,
  ViewSchoolData,
  useDataContext,
} from '../../shared'
import { DisplaySchoolPage } from './Display'

export const RetrieveSchoolPage = () => {
  const { school_id } = useParams()
  const { schoolData, handleSchoolData, userData, handleServerData } =
    useDataContext()
  const [searchParams] = useSearchParams()

  const view = searchParams.get('view')
  const user_id = searchParams.get('user_id')

  useEffect(() => {
    if (school_id) {
      if (schoolData?.id !== school_id) handleSchoolData(school_id)
    }
    if (user_id) {
      if (user_id !== userData?.key) handleServerData(user_id)
    }
  }, [school_id, schoolData, user_id, userData])

  if (view) return <DisplaySchoolPage />

  return (
    <LayoutDrawer title={<TitleSchoolData />}>
      <TabsRetrieveSchool />
      <ViewSchoolData />
      <Footer />
    </LayoutDrawer>
  )
}
