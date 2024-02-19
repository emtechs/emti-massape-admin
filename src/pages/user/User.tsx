import { useEffect, useState } from 'react'
import { Outlet, useParams, useSearchParams } from 'react-router-dom'
import {
  DialogCreateUser,
  DialogFilterUser,
  LayoutDrawer,
  SearchUser,
  TitleUserPage,
  Tools,
  ViewUserPage,
  useVerify,
} from '../../shared'

export const UserPage = () => {
  const { user_id } = useParams()
  const { verifyServer, verifyUser } = useVerify()
  const [searchParams] = useSearchParams()
  const [openNew, setOpenNew] = useState(false)
  const [openFil, setOpenFil] = useState(false)

  const key = searchParams.get('key')

  const onCloseNew = () => setOpenNew((old) => !old)
  const onCloseFil = () => setOpenFil((old) => !old)

  useEffect(() => {
    if (user_id) verifyUser(user_id)
    if (key) verifyServer(key)
  }, [key, user_id])

  if (user_id) return <Outlet />

  return (
    <LayoutDrawer
      title={<TitleUserPage />}
      tools={
        <Tools
          isHome
          isNew
          onClickNew={onCloseNew}
          search={<SearchUser />}
          onClickFilter={onCloseFil}
        />
      }
    >
      <ViewUserPage />
      <DialogCreateUser open={openNew} onClose={onCloseNew} />
      <DialogFilterUser open={openFil} onClose={onCloseFil} />
    </LayoutDrawer>
  )
}
