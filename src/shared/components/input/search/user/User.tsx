import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { filter } from 'smart-array-filter'
import { Autocomplete, TextField } from '@mui/material'
import { iUser, apiUser, rolePtBr } from '../../../../../shared'

export const SearchUser = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [usersData, setUsersData] = useState<iUser[]>()
  const [loading, setLoading] = useState(true)

  const role = searchParams.get('role')
  const is_active = searchParams.get('is_active')

  useEffect(() => {
    setLoading(true)
    let query = '?order=name'
    if (role) query += `&role=${role}`
    if (is_active) query += `&is_active=${is_active}`
    apiUser
      .list(query)
      .then((res) => setUsersData(res.result))
      .finally(() => setLoading(false))
  }, [is_active, role])

  return (
    <Autocomplete
      filterOptions={(options, { inputValue }) =>
        filter(options, {
          keywords: inputValue,
        })
      }
      onChange={(_, newValue) => navigate(`/user/${newValue?.id}`)}
      noOptionsText="Nenhum usuário encontrado."
      getOptionLabel={(option) => option.name}
      options={usersData || []}
      loading={loading}
      sx={{ width: 300 }}
      size="small"
      renderOption={(props, option) => (
        <li {...props}>
          <div>
            <p className="text-sm font-semibold">{option.name}</p>
            <p className="text-xs">
              {option.cpf} - {rolePtBr(option.role)}
            </p>
          </div>
        </li>
      )}
      renderInput={(params) => <TextField {...params} label="Usuários" />}
    />
  )
}
