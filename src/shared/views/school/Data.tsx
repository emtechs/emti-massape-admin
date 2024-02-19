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
  Edit,
  ExpandMore,
  Person,
  RemoveDone,
} from '@mui/icons-material'
import {
  ButtonSmDown,
  DialogActiveSchool,
  DialogDirectorSchool,
  DialogEditSchool,
  DialogRemoveUser,
  rolePtBr,
  useDataContext,
} from '../../../shared'

export const ViewSchoolData = () => {
  const { loadingSchool, schoolData, handleSchoolData, userData } =
    useDataContext()
  const [searchParams] = useSearchParams()
  const [openEdit, setOpenEdit] = useState(false)
  const [openDirector, setOpenDirector] = useState(false)
  const [openActive, setOpenActive] = useState(false)
  const [openRemove, setOpenRemove] = useState(false)

  const user_id = searchParams.get('user_id')

  const handleOpenEdit = () => setOpenEdit((old) => !old)
  const handleOpenDirector = () => setOpenDirector((old) => !old)
  const handleOpenActive = () => setOpenActive((old) => !old)
  const handleOpenRemove = () => setOpenRemove((old) => !old)

  return (
    <>
      <Card>
        <CardContent>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              {loadingSchool ? (
                <Skeleton width={300} />
              ) : (
                <Typography>{schoolData?.name}</Typography>
              )}
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Servidores: {schoolData?.servers}</Typography>
              <Typography>Diretor(a): {schoolData?.director?.name}</Typography>
            </AccordionDetails>
          </Accordion>
          {user_id && (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                {loadingSchool ? (
                  <Skeleton width={300} />
                ) : (
                  <Typography>{userData?.name}</Typography>
                )}
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Função: {rolePtBr(userData?.role)}</Typography>
              </AccordionDetails>
            </Accordion>
          )}
        </CardContent>
        <CardActions>
          {user_id ? (
            <ButtonSmDown
              title="Remover"
              color="error"
              startIcon={<Delete />}
              onClick={handleOpenRemove}
            />
          ) : schoolData?.is_active ? (
            <>
              <ButtonSmDown
                title="Editar"
                color="success"
                startIcon={<Edit />}
                onClick={handleOpenEdit}
              />
              <ButtonSmDown
                title="Diretor"
                startIcon={<Person />}
                onClick={handleOpenDirector}
              />
              <ButtonSmDown
                title="Desativar"
                endIcon={<RemoveDone />}
                color="error"
                onClick={handleOpenActive}
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
      {schoolData && (
        <DialogEditSchool
          school={schoolData}
          getData={() => handleSchoolData(schoolData.id)}
          open={openEdit}
          onClose={handleOpenEdit}
        />
      )}
      {schoolData && (
        <DialogDirectorSchool
          school={schoolData}
          getData={() => handleSchoolData(schoolData.id)}
          open={openDirector}
          onClose={handleOpenDirector}
        />
      )}
      {schoolData && (
        <DialogActiveSchool
          school={schoolData}
          open={openActive}
          onClose={handleOpenActive}
          getData={() => handleSchoolData(schoolData.id)}
        />
      )}
      {userData && schoolData && user_id && (
        <DialogRemoveUser
          server_id={user_id}
          school_name={schoolData.name}
          user_name={userData.name}
          user_role={userData.role}
          open={openRemove}
          onClose={handleOpenRemove}
          back={`/user/${userData.id}`}
        />
      )}
    </>
  )
}
