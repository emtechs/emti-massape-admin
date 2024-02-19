import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { filter } from 'smart-array-filter'
import { Autocomplete, TextField } from '@mui/material'
import { iSchool, apiSchool } from '../../../../../shared'

export const SearchSchool = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [schoolsData, setSchoolsData] = useState<iSchool[]>()
  const [loading, setLoading] = useState(true)

  const is_active = searchParams.get('is_active')
  const is_director = searchParams.get('is_director')

  useEffect(() => {
    setLoading(true)
    let query = '?order=name'
    if (is_active) query += `&is_active=${is_active}`
    if (is_director) query += `&is_director=${is_director}`
    apiSchool
      .list(query)
      .then((res) => setSchoolsData(res.result))
      .finally(() => setLoading(false))
  }, [is_active, is_director])

  return (
    <Autocomplete
      filterOptions={(options, { inputValue }) =>
        filter(options, {
          keywords: inputValue,
        })
      }
      onChange={(_, newValue) => navigate(`/school/${newValue?.id}`)}
      noOptionsText="Nenhuma escola encontrada."
      getOptionLabel={(option) => option.name}
      options={schoolsData || []}
      loading={loading}
      sx={{ width: 300 }}
      size="small"
      renderOption={(props, option) => (
        <li {...props}>
          <div>
            <p className="text-sm font-semibold">{option.name}</p>
            <p className="text-xs">{option.director?.name}</p>
          </div>
        </li>
      )}
      renderInput={(params) => <TextField {...params} label="Escolas" />}
    />
  )
}
