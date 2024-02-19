import { useState, useEffect } from 'react'
import { AutocompleteElement } from 'react-hook-form-mui'
import { filter } from 'smart-array-filter'
import { apiClass, iAutoCompleteBaseProps, iClass } from '../../../../shared'

export const AutoCompleteClass = ({
  isMultiple,
  name = 'class',
  label = 'Turma',
  query = '',
}: iAutoCompleteBaseProps) => {
  const [listData, setListData] = useState<iClass[]>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setListData(undefined)
    setLoading(true)
    apiClass
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
