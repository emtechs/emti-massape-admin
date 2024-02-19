import { useSearchParams } from 'react-router-dom'
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import {
  BaseContentChildren,
  DialogBaseChildrenAction,
  handleParams,
  iDialogBaseProps,
} from '../../../../shared'

export const DialogFilterUser = ({ onClose, open }: iDialogBaseProps) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const is_active = searchParams.get('is_active') || ''
  const role = searchParams.get('role') || ''

  return (
    <DialogBaseChildrenAction
      open={open}
      onClose={onClose}
      title="Filtros"
      description=""
      action={() => {
        setSearchParams((old) => {
          handleParams(old)
          old.delete('is_active')
          old.delete('role')
          return old
        })
      }}
      actionTitle="Limpar"
    >
      <BaseContentChildren>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Estado</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={is_active}
                  label="Estado"
                  onChange={(e) => {
                    setSearchParams((old) => {
                      handleParams(old)
                      old.set('is_active', e.target.value)
                      return old
                    })
                  }}
                >
                  <MenuItem value="true">Ativo</MenuItem>
                  <MenuItem value="false">Inativo</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Função</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={role}
                  label="Função"
                  onChange={(e) => {
                    setSearchParams((old) => {
                      handleParams(old)
                      old.set('role', e.target.value)
                      return old
                    })
                  }}
                >
                  <MenuItem value="ADMIN">Administrador</MenuItem>
                  <MenuItem value="SERV">Servidor</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      </BaseContentChildren>
    </DialogBaseChildrenAction>
  )
}
