import { useState, useEffect } from 'react'
import { AutocompleteElement } from 'react-hook-form-mui'
import { filter } from 'smart-array-filter'
import {
  apiStudent,
  iAutoCompleteBaseProps,
  iStudent,
} from '../../../../shared'

export const AutoCompleteStudent = ({
  isMultiple,
  name = 'student',
  label = 'Aluno',
  query = '',
}: iAutoCompleteBaseProps) => {
  const [listData, setListData] = useState<iStudent[]>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setListData(undefined)
    setLoading(true)
    apiStudent
      .list('?is_active=true' + query)
      .then((res) => setListData(res.result))
      .finally(() => setLoading(false))
  }, [query])

  return (
    <AutocompleteElement
      name={name}
      label={label}
      required
      multiple={isMultiple}
      loading={loading}
      options={listData || []}
      autocompleteProps={{
        noOptionsText: 'Nenhum aluno encontrado.',
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
                <p className="text-xs">{option.registry}</p>
              </div>
            </li>
          )
        },
      }}
      textFieldProps={{ fullWidth: true }}
    />
  )
}
