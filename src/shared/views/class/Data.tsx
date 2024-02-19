import { useState } from 'react'
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
import { DoneAll, ExpandMore, RemoveDone } from '@mui/icons-material'
import {
  ButtonSmDown,
  DialogActiveClass,
  useDataContext,
} from '../../../shared'

export const ViewClassData = () => {
  const { loadingClass, classData, handleClassData } = useDataContext()
  const [openActive, setOpenActive] = useState(false)

  const handleOpenActive = () => setOpenActive((old) => !old)

  return (
    <>
      <Card>
        <CardContent>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              {loadingClass ? (
                <Skeleton width={300} />
              ) : (
                <Typography>{classData?.name}</Typography>
              )}
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Escolas: {classData?.schools}</Typography>
              <Typography>Alunos: {classData?.students}</Typography>
            </AccordionDetails>
          </Accordion>
        </CardContent>
        <CardActions>
          {classData?.is_active ? (
            <ButtonSmDown
              title="Desativar"
              endIcon={<RemoveDone />}
              color="error"
              onClick={handleOpenActive}
            />
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
      {classData && (
        <DialogActiveClass
          classData={classData}
          open={openActive}
          onClose={handleOpenActive}
          getData={() => handleClassData(classData.id)}
        />
      )}
    </>
  )
}
