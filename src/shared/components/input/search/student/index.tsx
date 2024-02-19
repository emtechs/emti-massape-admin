import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { filter } from 'smart-array-filter'
import { Autocomplete, TextField } from '@mui/material'
import { apiStudent, iStudent } from '../../../../../shared'

export const SearchStudent = () => {
  const [searchParams] = useSearchParams()
  const [listData, setListData] = useState<iStudent[]>()
  const [loading, setLoading] = useState(true)

  const is_active = searchParams.get('is_active')

  useEffect(() => {
    setLoading(true)
    let query = '?order=name'
    if (is_active) query += `&is_active=${is_active}`
    apiStudent
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
      noOptionsText="Nenhum aluno encontrado."
      getOptionLabel={(option) => option.name}
      options={listData || []}
      loading={loading}
      sx={{ width: 300 }}
      size="small"
      renderOption={(props, option) => (
        <li {...props}>
          <div>
            <p className="text-sm font-semibold">{option.name}</p>
            <p className="text-xs">{option.registry}</p>
          </div>
        </li>
      )}
      renderInput={(params) => <TextField {...params} label="Alunos" />}
    />
  )
}
