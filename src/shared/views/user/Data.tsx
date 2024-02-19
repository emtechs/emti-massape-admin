import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardActions,
  CardContent,
  Skeleton,
  Typography,
} from '@mui/material'
import {
  Delete,
  DoneAll,
  ExpandMore,
  ImportExport,
  RemoveDone,
} from '@mui/icons-material'
import {
  ButtonSmDown,
  DialogActiveUser,
  DialogFitUser,
  DialogRemoveUser,
  rolePtBr,
  useDataContext,
} from '../../../shared'

export const ViewUserData = () => {
  const { loadingUser, handleUserData, userData, schoolData } = useDataContext()
  const [searchParams] = useSearchParams()
  const [openActive, setOpenActive] = useState(false)
  const [openFit, setOpenFit] = useState(false)
  const [openRemove, setOpenRemove] = useState(false)

  const key = searchParams.get('key')

  const handleOpenActive = () => setOpenActive((old) => !old)
  const handleOpenFit = () => setOpenFit((old) => !old)
  const handleOpenRemove = () => setOpenRemove((old) => !old)

  return (
    <>
      <Card>
        <CardContent>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              {loadingUser ? (
                <Skeleton width={300} />
              ) : (
                <Typography>{userData?.name}</Typography>
              )}
            </AccordionSummary>
            <AccordionDetails>
              <Typography>CPF: {userData?.cpf}</Typography>
              <Typography>E-mail: {userData?.email}</Typography>
            </AccordionDetails>
          </Accordion>
          {key && (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                {loadingUser ? (
                  <Skeleton width={300} />
                ) : (
                  <Typography>{schoolData?.name}</Typography>
                )}
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Função: {rolePtBr(userData?.role)}</Typography>
              </AccordionDetails>
            </Accordion>
          )}
        </CardContent>
        <CardActions>
          {key ? (
            <ButtonSmDown
              title="Remover"
              color="error"
              startIcon={<Delete />}
              onClick={handleOpenRemove}
            />
          ) : userData?.is_active ? (
            <>
              <ButtonSmDown
                title="Desativar"
                color="error"
                startIcon={<RemoveDone />}
                onClick={handleOpenActive}
              />
              <ButtonSmDown
                title={userData?.role !== 'ADMIN' ? 'Promover' : 'Rebaixar'}
                color="warning"
                startIcon={<ImportExport />}
                onClick={handleOpenFit}
              />
            </>
          ) : (
            <ButtonSmDown
              title="Ativar"
              endIcon={<DoneAll />}
              color="success"
              onClick={handleOpenActive}
            />
          )}
        </CardActions>
      </Card>
      {userData && (
        <DialogActiveUser
          onClose={handleOpenActive}
          open={openActive}
          user={userData}
          getData={() => handleUserData(userData.id)}
        />
      )}
      {userData && (
        <DialogFitUser
          onClose={handleOpenFit}
          open={openFit}
          user={userData}
          getData={() => handleUserData(userData.id)}
        />
      )}
      {userData && schoolData && key && (
        <DialogRemoveUser
          server_id={key}
          school_name={schoolData.name}
          user_name={userData.name}
          user_role={userData.role}
          open={openRemove}
          onClose={handleOpenRemove}
          back={`/school/${schoolData.id}`}
        />
      )}
    </>
  )
}
