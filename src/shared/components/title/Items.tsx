import { Breadcrumbs } from '@mui/material'
import { Home } from '@mui/icons-material'
import { LinkChip, iChildren, useAppThemeContext } from '../../../shared'

export const TitleBaseItemsPage = ({ children }: iChildren) => {
  const { mdDown } = useAppThemeContext()

  return (
    <Breadcrumbs maxItems={mdDown ? 2 : undefined} aria-label="breadcrumb">
      <LinkChip
        icon={<Home sx={{ mr: 0.5 }} fontSize="inherit" />}
        label={mdDown ? '...' : 'Página Inicial'}
      />
      {children}
    </Breadcrumbs>
  )
}
