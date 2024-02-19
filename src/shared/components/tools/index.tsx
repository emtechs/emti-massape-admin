import { ReactNode } from 'react'
import { Box, Paper } from '@mui/material'
import { AddBox, FilterAlt, Home } from '@mui/icons-material'
import { ButtonIcon, ButtonMdDown, useAppThemeContext } from '../../../shared'

interface iToolsProps {
  isHome?: boolean
  toHome?: string
  isNew?: boolean
  titleNew?: string
  iconNew?: ReactNode
  onClickNew?: () => void
  onClickFilter?: () => void
  search?: ReactNode
  finish?: ReactNode
}

export const Tools = ({
  isHome,
  toHome = '/',
  isNew,
  titleNew = 'Novo',
  iconNew = <AddBox />,
  onClickNew,
  search,
  finish,
  onClickFilter,
}: iToolsProps) => {
  const { theme, smDown } = useAppThemeContext()

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      height={theme.spacing(7.5)}
      marginX={1}
      padding={1}
      paddingX={2}
      component={Paper}
    >
      {isHome && smDown && (
        <ButtonIcon title="Página Inicial" href={toHome} startIcon={<Home />} />
      )}
      {isNew && (
        <ButtonMdDown
          title={titleNew}
          startIcon={iconNew}
          onClick={onClickNew}
        />
      )}
      {search}
      {onClickFilter && (
        <ButtonIcon
          title="Filtros"
          startIcon={<FilterAlt />}
          onClick={onClickFilter}
        />
      )}
      <Box flex={1} display="flex" justifyContent="end" gap={1}>
        {finish}
      </Box>
    </Box>
  )
}
