import { Breadcrumbs } from '@mui/material'
import { Home } from '@mui/icons-material'
import { LinkChip, iChildren } from '../../../shared'

export const TitleBasePage = ({ children }: iChildren) => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <LinkChip
        icon={<Home sx={{ mr: 0.5 }} fontSize="inherit" />}
        label="Página Inicial"
      />
      {children}
    </Breadcrumbs>
  )
}
