import { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import {
  Footer,
  LayoutDrawer,
  TabsRetrieveUser,
  TitleUserData,
  ViewUserData,
  useDataContext,
} from '../../shared'
import { DisplayUserPage } from './Display'

export const RetrieveUserPage = () => {
  const { user_id } = useParams()
  const { handleUserData, handleServerData, userData } = useDataContext()
  const [searchParams] = useSearchParams()

  const view = searchParams.get('view')
  const key = searchParams.get('key')

  useEffect(() => {
    if (user_id) {
      if (user_id !== userData?.id) handleUserData(user_id)
    }
    if (key) {
      if (key !== userData?.key) handleServerData(key)
    }
  }, [key, user_id, userData])

  if (view) return <DisplayUserPage />

  return (
    <LayoutDrawer title={<TitleUserData />}>
      <TabsRetrieveUser />
      <ViewUserData />
      <Footer />
    </LayoutDrawer>
  )
}
