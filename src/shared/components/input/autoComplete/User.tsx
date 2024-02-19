import { useState, useEffect } from 'react'
import { AutocompleteElement } from 'react-hook-form-mui'
import { filter } from 'smart-array-filter'
import {
  apiUser,
  iAutoCompleteBaseProps,
  iUser,
  rolePtBr,
} from '../../../../shared'

export const AutoCompleteUser = ({
  isMultiple,
  label = 'Usuário',
  name = 'user',
  query = '',
}: iAutoCompleteBaseProps) => {
  const [userDataSelect, setUserDataSelect] = useState<iUser[]>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setUserDataSelect(undefined)
    setLoading(true)
    apiUser
      .list('?is_active=true' + query)
      .then((res) => setUserDataSelect(res.result))
      .finally(() => setLoading(false))
  }, [query])

  return (
    <AutocompleteElement
      name={name}
      label={label}
      required
      multiple={isMultiple}
      loading={loading}
      options={userDataSelect || []}
      autocompleteProps={{
        noOptionsText: 'Nenhum usuário encontrada.',
        filterOptions(options, { inputValue }) {
          return filter(options, {
            keywords: inputValue,
          })
        },
        getOptionLabel(option) {
          return option.name
        },
        renderOption(props, option) {
          return (
            <li {...props}>
              <div>
                <p className="text-sm font-semibold">{option.name}</p>
                <p className="text-xs">
                  {option.cpf} - {rolePtBr(option.role)}
                </p>
              </div>
            </li>
          )
        },
      }}
      textFieldProps={{ fullWidth: true }}
    />
  )
}
