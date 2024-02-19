import { useState } from 'react'
import {
  DialogCreateStudent,
  DialogFilterStudent,
  LayoutDrawer,
  SearchStudent,
  TitleStudentPage,
  Tools,
  ViewStudentPage,
} from '../../shared'

export const StudentPage = () => {
  const [openNew, setOpenNew] = useState(false)
  const [openFil, setOpenFil] = useState(false)

  const onCloseNew = () => setOpenNew((old) => !old)
  const onCloseFil = () => setOpenFil((old) => !old)

  return (
    <LayoutDrawer
      title={<TitleStudentPage />}
      tools={
        <Tools
          isHome
          isNew
          onClickNew={onCloseNew}
          search={<SearchStudent />}
          onClickFilter={onCloseFil}
        />
      }
    >
      <ViewStudentPage />
      <DialogCreateStudent open={openNew} onClose={onCloseNew} />
      <DialogFilterStudent open={openFil} onClose={onCloseFil} />
    </LayoutDrawer>
  )
}
