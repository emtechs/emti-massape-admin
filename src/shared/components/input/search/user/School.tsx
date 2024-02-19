import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { filter } from 'smart-array-filter'
import { Autocomplete, TextField } from '@mui/material'
import {
  apiServer,
  iSchoolServer,
  rolePtBr,
  useDataContext,
} from '../../../../../shared'

export const SearchUserSchool = () => {
  const navigate = useNavigate()
  const { userData } = useDataContext()
  const [listData, setListData] = useState<iSchoolServer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const query = `?order=name&user_id=${userData?.id}`
    apiServer
      .schools(query)
      .then((res) => setListData(res.result))
      .finally(() => setLoading(false))
  }, [userData])

  return (
    <Autocomplete
      filterOptions={(options, { inputValue }) =>
        filter(options, {
          keywords: inputValue,
        })
      }
      onChange={(_, newValue) =>
        navigate(`/school/${newValue?.id}?user_id=${newValue?.key}`)
      }
      noOptionsText="Nenhuma escola encontrada."
      getOptionLabel={(option) => option.name}
      options={listData}
      loading={loading}
      sx={{ width: 300 }}
      size="small"
      renderOption={(props, option) => (
        <li {...props}>
          <div>
            <p className="text-sm font-semibold">{option.name}</p>
            <p className="text-xs">{rolePtBr(option.role)}</p>
          </div>
        </li>
      )}
      renderInput={(params) => <TextField {...params} label="Escolas" />}
    />
  )
}
