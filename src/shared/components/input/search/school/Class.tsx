import { useState, useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { filter } from 'smart-array-filter'
import { Autocomplete, TextField } from '@mui/material'
import { apiClassYear, iClassYear } from '../../../../../shared'

export const SearchSchoolClass = () => {
  const navigate = useNavigate()
  const { school_id } = useParams()
  const [searchParams] = useSearchParams()
  const [listData, setListData] = useState<iClassYear[]>([])
  const [loading, setLoading] = useState(true)

  const year_id = searchParams.get('year_id')

  useEffect(() => {
    setLoading(true)
    let query = '?order=name'
    if (school_id) query += `&school_id=${school_id}`
    if (year_id) query += `&year_id=${year_id}`
    apiClassYear
      .list(query)
      .then((res) => setListData(res.result))
      .finally(() => setLoading(false))
  }, [school_id, year_id])

  return (
    <Autocomplete
      filterOptions={(options, { inputValue }) =>
        filter(options, {
          keywords: inputValue,
        })
      }
      onChange={(_, newValue) =>
        navigate(
          `/class/${newValue?.id}?school_id=${school_id}&key=${newValue?.key}&view=student`,
        )
      }
      noOptionsText="Nenhuma turma encontrada."
      getOptionLabel={(option) => option.name}
      options={listData}
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
