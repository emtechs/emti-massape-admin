import { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import {
  DialogCreateClass,
  DialogFilterClass,
  LayoutDrawer,
  SearchClass,
  TitleClassPage,
  Tools,
  ViewClassPage,
  useVerify,
} from '../../shared'

export const ClassPage = () => {
  const { class_id } = useParams()
  const { verifyClass } = useVerify()
  const [openNew, setOpenNew] = useState(false)
  const [openFil, setOpenFil] = useState(false)

  const onCloseNew = () => setOpenNew((old) => !old)
  const onCloseFil = () => setOpenFil((old) => !old)

  useEffect(() => {
    if (class_id) verifyClass(class_id)
  }, [class_id])

  if (class_id) return <Outlet />

  return (
    <LayoutDrawer
      title={<TitleClassPage />}
      tools={
        <Tools
          isHome
          isNew
          titleNew="Nova"
          onClickNew={onCloseNew}
          search={<SearchClass />}
          onClickFilter={onCloseFil}
        />
      }
    >
      <ViewClassPage />
      <DialogCreateClass open={openNew} onClose={onCloseNew} />
      <DialogFilterClass open={openFil} onClose={onCloseFil} />
    </LayoutDrawer>
  )
}
