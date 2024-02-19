import { useState, useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { filter } from 'smart-array-filter'
import { Autocomplete, TextField } from '@mui/material'
import { apiClassYear, iClassYear } from '../../../../../shared'

export const SearchClassSchool = () => {
  const navigate = useNavigate()
  const { class_id } = useParams()
  const [searchParams] = useSearchParams()
  const [listData, setListData] = useState<iClassYear[]>([])
  const [loading, setLoading] = useState(true)

  const year_id = searchParams.get('year_id')

  useEffect(() => {
    setLoading(true)
    let query = '?order=name'
    if (class_id) query += `&class_id=${class_id}`
    if (year_id) query += `&year_id=${year_id}`
    apiClassYear
      .schools(query)
      .then((res) => setListData(res.result))
      .finally(() => setLoading(false))
  }, [class_id, year_id])

  return (
    <Autocomplete
      filterOptions={(options, { inputValue }) =>
        filter(options, {
          keywords: inputValue,
        })
      }
      onChange={(_, newValue) =>
        navigate(
          `/school/${newValue?.school.id}?class_id=${class_id}&key=${newValue?.key}&view=student`,
        )
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
            <p className="text-sm font-semibold">{option.school.name}</p>
            <p className="text-xs">{option.year}</p>
          </div>
        </li>
      )}
      renderInput={(params) => <TextField {...params} label="Escolas" />}
    />
  )
}
