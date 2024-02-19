import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { filter } from 'smart-array-filter'
import { Autocomplete, TextField } from '@mui/material'
import { apiServer, iUser, rolePtBr } from '../../../../../shared'

export const SearchSchoolUser = () => {
  const navigate = useNavigate()
  const { school_id } = useParams()
  const [listData, setListData] = useState<iUser[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const query = `?order=name&school_id=${school_id}`
    apiServer
      .list(query)
      .then((res) => setListData(res.result))
      .finally(() => setLoading(false))
  }, [school_id])

  return (
    <Autocomplete
      filterOptions={(options, { inputValue }) =>
        filter(options, {
          keywords: inputValue,
        })
      }
      onChange={(_, newValue) =>
        navigate(
          `/user/${newValue?.id}?school_id=${school_id}&key=${newValue?.key}`,
        )
      }
      noOptionsText="Nenhum usuário encontrado."
      getOptionLabel={(option) => option.name}
      options={listData}
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
      renderInput={(params) => <TextField {...params} label="Servidores" />}
    />
  )
}
