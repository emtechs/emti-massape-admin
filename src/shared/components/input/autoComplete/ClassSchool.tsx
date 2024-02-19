import { useState, useEffect } from 'react'
import { AutocompleteElement } from 'react-hook-form-mui'
import { filter } from 'smart-array-filter'
import {
  apiClassYear,
  iAutoCompleteBaseProps,
  iClassYear,
} from '../../../../shared'

export const AutoCompleteClassSchool = ({
  isMultiple,
  name = 'school',
  label = 'Escola',
  query = '',
}: iAutoCompleteBaseProps) => {
  const [listData, setListData] = useState<iClassYear[]>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setListData(undefined)
    setLoading(true)
    apiClassYear
      .schools('?is_active=true' + query)
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
        noOptionsText: 'Nenhuma escola encontrada.',
        filterOptions(options, { inputValue }) {
          return filter(options, {
            keywords: inputValue,
          })
        },
        getOptionLabel(option) {
          return option.school.name
        },
        renderOption(props, option) {
          return (
            <li {...props}>
              <div>
                <p className="text-sm font-semibold">{option.school.name}</p>
              </div>
            </li>
          )
        },
      }}
      textFieldProps={{ fullWidth: true }}
    />
  )
}
