import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { filter } from 'smart-array-filter'
import { Autocomplete, TextField } from '@mui/material'
import { iClass, apiClass } from '../../../../../shared'

export const SearchClass = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [listData, setListData] = useState<iClass[]>()
  const [loading, setLoading] = useState(true)

  const is_active = searchParams.get('is_active')

  useEffect(() => {
    setLoading(true)
    let query = '?order=name'
    if (is_active) query += `&is_active=${is_active}`

    apiClass
      .list(query)
      .then((res) => setListData(res.result))
      .finally(() => setLoading(false))
  }, [is_active])

  return (
    <Autocomplete
      filterOptions={(options, { inputValue }) =>
        filter(options, {
          keywords: inputValue,
        })
      }
      onChange={(_, newValue) => navigate(`/class/${newValue?.id}`)}
      noOptionsText="Nenhuma turma encontrada."
      getOptionLabel={(option) => option.name}
      options={listData || []}
      loading={loading}
      sx={{ width: 300 }}
      size="small"
      renderOption={(props, option) => (
        <li {...props}>
          <div>
            <p className="text-sm font-semibold">{option.name}</p>
          </div>
        </li>
      )}
      renderInput={(params) => <TextField {...params} label="Turmas" />}
    />
  )
}
