import { useEffect, useState } from 'react'
import { Outlet, useParams, useSearchParams } from 'react-router-dom'
import {
  DialogCreateSchool,
  DialogFilterSchool,
  LayoutDrawer,
  SearchSchool,
  TitleSchoolPage,
  Tools,
  ViewSchoolPage,
  useVerify,
} from '../../shared'

export const SchoolPage = () => {
  const { school_id } = useParams()
  const { verifySchool, verifyServer } = useVerify()
  const [searchParams] = useSearchParams()
  const [openNew, setOpenNew] = useState(false)
  const [openFil, setOpenFil] = useState(false)

  const user_id = searchParams.get('user_id')

  const onCloseNew = () => setOpenNew((old) => !old)
  const onCloseFil = () => setOpenFil((old) => !old)

  useEffect(() => {
    if (school_id) verifySchool(school_id)
    if (user_id) verifyServer(user_id)
  }, [school_id, user_id])

  if (school_id) return <Outlet />

  return (
    <LayoutDrawer
      title={<TitleSchoolPage />}
      tools={
        <Tools
          isHome
          isNew
          onClickNew={onCloseNew}
          search={<SearchSchool />}
          onClickFilter={onCloseFil}
        />
      }
    >
      <ViewSchoolPage />
      <DialogCreateSchool open={openNew} onClose={onCloseNew} />
      <DialogFilterSchool open={openFil} onClose={onCloseFil} />
    </LayoutDrawer>
  )
}
