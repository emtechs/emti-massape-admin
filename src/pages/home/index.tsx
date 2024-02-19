import { useState } from 'react'
import {
  Box,
  Breadcrumbs,
  Button,
  Chip,
  Divider,
  Grid,
  Paper,
  Typography,
} from '@mui/material'
import {
  AddBox,
  Groups,
  Home,
  People,
  School,
  Today,
  Workspaces,
} from '@mui/icons-material'
import {
  DialogCreateClass,
  DialogCreateSchool,
  DialogCreateStudent,
  DialogCreateUser,
  Footer,
  LayoutDrawer,
  useAppThemeContext,
} from '../../shared'

export const HomePage = () => {
  const { theme } = useAppThemeContext()
  const [openUser, setOpenUser] = useState(false)
  const [openSchool, setOpenSchool] = useState(false)
  const [openClass, setOpenClass] = useState(false)
  const [openStudent, setOpenStudent] = useState(false)

  const onCloseUser = () => setOpenUser((old) => !old)
  const onCloseSchool = () => setOpenSchool((old) => !old)
  const onCloseClass = () => setOpenClass((old) => !old)
  const onCloseStudent = () => setOpenStudent((old) => !old)

  return (
    <LayoutDrawer
      title={
        <Breadcrumbs aria-label="breadcrumb">
          <Chip
            color="primary"
            variant="filled"
            label="Página Inicial"
            icon={<Home sx={{ mr: 0.5 }} fontSize="inherit" />}
          />
        </Breadcrumbs>
      }
    >
      <Box
        my={1}
        mx={2}
        flexDirection="column"
        component={Paper}
        variant="outlined"
      >
        <Box
          height={theme.spacing(7)}
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          p={1}
        >
          <Typography
            component="div"
            variant="h6"
            display="flex"
            alignItems="center"
            gap={1}
          >
            <AddBox />
            Adicionar
          </Typography>
        </Box>
        <Divider />
        <Box p={1}>
          <Grid container spacing={2}>
            {[
              { icon: <People />, label: 'Usuário', onClick: onCloseUser },
              { icon: <School />, label: 'Escola', onClick: onCloseSchool },
              { icon: <Workspaces />, label: 'Turma', onClick: onCloseClass },
              { icon: <Groups />, label: 'Aluno', onClick: onCloseStudent },
              { icon: <Today />, label: 'Período', onClick: onCloseUser },
            ].map((el) => (
              <Grid key={el.label} item xs={12} sm={6} md={4}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  startIcon={el.icon}
                  onClick={el.onClick}
                >
                  {el.label}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      <Footer />
      <DialogCreateUser open={openUser} onClose={onCloseUser} />
      <DialogCreateSchool open={openSchool} onClose={onCloseSchool} />
      <DialogCreateClass open={openClass} onClose={onCloseClass} />
      <DialogCreateStudent open={openStudent} onClose={onCloseStudent} />
    </LayoutDrawer>
  )
}
