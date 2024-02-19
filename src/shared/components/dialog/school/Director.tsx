import { FieldValues, FormContainer } from 'react-hook-form-mui'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Typography } from '@mui/material'
import {
  AutoCompleteUser,
  BaseContentChildren,
  DialogBaseChildren,
  apiServer,
  iDialogSchoolProps,
  schoolUpdateDirectorSchema,
  useAppThemeContext,
} from '../../../../shared'

export const DialogDirectorSchool = ({
  onClose,
  open,
  school,
  getData,
}: iDialogSchoolProps) => {
  const { setLoading, handleSucess, handleError } = useAppThemeContext()

  const updateSchool = async (data: FieldValues) => {
    try {
      onClose()
      setLoading(true)
      await apiServer.connect({
        ...data,
        schools: [{ id: school.id }],
      })
      handleSucess(`Sucesso ao alterar o diretor da Escola!`)
      getData && getData()
    } catch {
      handleError(`Não foi possível atualizar o diretor da escola no momento!`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <DialogBaseChildren
      open={open}
      onClose={onClose}
      title="Definir Diretor"
      description=""
    >
      <FormContainer
        onSuccess={updateSchool}
        resolver={zodResolver(schoolUpdateDirectorSchema)}
      >
        <BaseContentChildren>
          {school?.director && (
            <Box>
              <Typography>Diretor Atual</Typography>
              <Typography>Nome: {school.director.name}</Typography>
              <Typography>CPF: {school.director.cpf}</Typography>
            </Box>
          )}
          <AutoCompleteUser
            query={'&order=name&role=SERV&school_id=' + school.id}
            name="director"
            label="Diretor"
          />
          <Button variant="contained" type="submit" fullWidth>
            Salvar
          </Button>
        </BaseContentChildren>
      </FormContainer>
    </DialogBaseChildren>
  )
}
