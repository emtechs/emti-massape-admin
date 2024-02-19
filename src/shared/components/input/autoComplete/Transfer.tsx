import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AutocompleteElement, useFormContext } from 'react-hook-form-mui'
import { filter } from 'smart-array-filter'
import { apiClassYear, iClassYear, iSchool } from '../../../../shared'

export const AutoCompleteTransfer = () => {
  const { watch } = useFormContext()
  const [searchParams] = useSearchParams()
  const [listData, setListData] = useState<iClassYear[]>()
  const [loading, setLoading] = useState(true)

  const school: iSchool | undefined = watch('school')
  const year_id = searchParams.get('year_id')

  useEffect(() => {
    setListData(undefined)
    setLoading(true)
    apiClassYear
      .list(`?school_id=${school?.id}&year_id=${year_id}`)
      .then((res) => setListData(res.result))
      .finally(() => setLoading(false))
  }, [school, year_id])

  return (
    <AutocompleteElement
      name="class"
      label="Turma"
      required
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
