import { useState, useEffect } from 'react'
import { AutocompleteElement } from 'react-hook-form-mui'
import { filter } from 'smart-array-filter'
import {
  apiClassYear,
  iAutoCompleteBaseProps,
  iClassYear,
} from '../../../../shared'

export const AutoCompleteClassYear = ({
  isMultiple,
  name = 'class',
  label = 'Turma',
  query = '',
}: iAutoCompleteBaseProps) => {
  const [listData, setListData] = useState<iClassYear[]>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setListData(undefined)
    setLoading(true)
    apiClassYear
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
        noOptionsText: 'Nenhuma turma encontrada.',
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
              </div>
            </li>
          )
        },
      }}
      textFieldProps={{ fullWidth: true }}
    />
  )
}
