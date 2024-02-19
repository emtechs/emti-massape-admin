import { useLocation } from 'react-router-dom'
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import {
  FirstPage,
  Groups,
  Home,
  Logout,
  People,
  School,
  Today,
  Workspaces,
} from '@mui/icons-material'
import {
  ButtonListItem,
  ListItemLink,
  useAppThemeContext,
  useAuthContext,
} from '../../../shared'

export const MenuDrawer = () => {
  const location = useLocation()
  const { theme, smDown, isDrawerOpen, toggleDrawerOpen } = useAppThemeContext()
  const { logout, accessToken } = useAuthContext()

  return (
    <Drawer
      open={isDrawerOpen}
      variant={smDown ? 'temporary' : 'permanent'}
      onClose={toggleDrawerOpen}
    >
      <Box
        display="flex"
        flexDirection="column"
        width={theme.spacing(28)}
        height="100%"
      >
        <Box width="100%" bgcolor={theme.palette.background.default} p={2}>
          <img src="/logo.webp" alt="EMTI Digital" />
        </Box>
        <Divider />
        <Box flex={1}>
          <List component="nav">
            {[
              { icon: <Home />, label: 'Página Inicial', to: '/' },
              { icon: <People />, label: 'Usuários', to: '/user' },
              { icon: <School />, label: 'Escolas', to: '/school' },
              { icon: <Workspaces />, label: 'Turmas', to: '/class' },
              { icon: <Groups />, label: 'Alunos', to: '/student' },
              { icon: <Today />, label: 'Período', to: '/period' },
            ].map((el) => (
              <ListItemLink
                key={el.label}
                icon={el.icon}
                to={el.to}
                selected={
                  el.to.length === 1
                    ? location.pathname === el.to
                    : location.pathname.includes(el.to)
                }
                label={el.label}
              />
            ))}
          </List>
        </Box>
        <Box>
          <List component="nav">
            <ListItemButton
              onClick={logout}
              href={`https://emtidigital-massape.emsolucoestecnologicas.com.br/token/${accessToken}`}
            >
              <ListItemIcon>
                <FirstPage />
              </ListItemIcon>
              <ListItemText primary="Voltar" />
            </ListItemButton>
            <ButtonListItem icon={<Logout />} label="Sair" onClick={logout} />
          </List>
        </Box>
      </Box>
    </Drawer>
  )
}
