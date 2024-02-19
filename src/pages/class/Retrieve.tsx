import { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import {
  Footer,
  LayoutDrawer,
  TabsRetrieveClass,
  TitleClassData,
  ViewClassData,
  useDataContext,
} from '../../shared'
import { DisplayClassPage } from './Display'

export const RetrieveClassPage = () => {
  const { class_id } = useParams()
  const { classData, handleClassData } = useDataContext()
  const [searchParams] = useSearchParams()

  const view = searchParams.get('view')

  useEffect(() => {
    if (class_id) {
      if (classData?.id !== class_id) handleClassData(class_id)
    }
  }, [classData, class_id, handleClassData])

  if (view) return <DisplayClassPage />

  return (
    <LayoutDrawer title={<TitleClassData />}>
      <TabsRetrieveClass />
      <ViewClassData />
      <Footer />
    </LayoutDrawer>
  )
}
