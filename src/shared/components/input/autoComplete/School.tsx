import { useState, useEffect } from 'react'
import { AutocompleteElement } from 'react-hook-form-mui'
import { filter } from 'smart-array-filter'
import { iAutoCompleteBaseProps, iSchool, apiSchool } from '../../../../shared'

export const AutoCompleteSchool = ({
  isMultiple,
  label = 'Escola',
  name = 'school',
  query = '',
}: iAutoCompleteBaseProps) => {
  const [schoolDataSelect, setSchoolDataSelect] = useState<iSchool[]>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setSchoolDataSelect(undefined)
    setLoading(true)
    apiSchool
      .list('?is_active=true' + query)
      .then((res) => setSchoolDataSelect(res.result))
      .finally(() => setLoading(false))
  }, [query])

  return (
    <AutocompleteElement
      name={name}
      label={label}
      required
      multiple={isMultiple}
      loading={loading}
      options={schoolDataSelect || []}
      autocompleteProps={{
        noOptionsText: 'Nenhuma escola encontrada.',
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
                <p className="text-xs">{option.director?.name}</p>
              </div>
            </li>
          )
        },
      }}
      textFieldProps={{ fullWidth: true }}
    />
  )
}
