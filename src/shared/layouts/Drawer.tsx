import { ReactNode, useRef } from 'react'
import { Box, IconButton } from '@mui/material'
import { Menu } from '@mui/icons-material'
import {
  ButtonTop,
  Header,
  MenuDrawer,
  iChildren,
  useAppThemeContext,
} from '../../shared'

interface iLayoutDrawerProps extends iChildren {
  title: ReactNode
  tools?: ReactNode
}

export const LayoutDrawer = ({
  children,
  title,
  tools,
}: iLayoutDrawerProps) => {
  const { theme, smDown, toggleDrawerOpen } = useAppThemeContext()

  const elem = useRef<HTMLElement>(null)

  return (
    <>
      <MenuDrawer />
      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
        <Box
          bgcolor={theme.palette.background.default}
          height="100%"
          display="flex"
          flexDirection="column"
          gap={1}
          paddingLeft={smDown ? 0 : 2}
        >
          <Header />
          <Box pl={1} display="flex" alignItems="center" gap={1}>
            {smDown && (
              <IconButton color="primary" onClick={toggleDrawerOpen}>
                <Menu />
              </IconButton>
            )}
            {title}
          </Box>
          {tools && <Box>{tools}</Box>}
          <Box ref={elem} flex={1} overflow="auto">
            {children}
            <ButtonTop elem={elem} />
          </Box>
        </Box>
      </Box>
    </>
  )
}
