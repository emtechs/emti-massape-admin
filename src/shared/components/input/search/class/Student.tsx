import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { filter } from 'smart-array-filter'
import { Autocomplete, TextField } from '@mui/material'
import { apiClassStudent, iClassStudent } from '../../../../../shared'

export const SearchClassStudent = () => {
  const { class_id } = useParams()
  const [searchParams] = useSearchParams()
  const [listData, setListData] = useState<iClassStudent[]>([])
  const [loading, setLoading] = useState(true)

  const year_id = searchParams.get('year_id')
  const school_id = searchParams.get('school_id')

  useEffect(() => {
    setLoading(true)
    let query = '?order=name'
    if (school_id) query += `&school_id=${school_id}`
    if (year_id) query += `&year_id=${year_id}`
    if (class_id) query += `&class_id=${class_id}`
    apiClassStudent
      .list(query)
      .then((res) => setListData(res.result))
      .finally(() => setLoading(false))
  }, [class_id, school_id, year_id])

  return (
    <Autocomplete
      filterOptions={(options, { inputValue }) =>
        filter(options, {
          keywords: inputValue,
        })
      }
      noOptionsText="Nenhum aluno encontrado."
      getOptionLabel={(option) => option.name}
      options={listData}
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
