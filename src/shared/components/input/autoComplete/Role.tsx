import { useEffect, useMemo } from 'react'
import { useFormContext } from 'react-hook-form-mui'
import { AutoCompleteSchool, iRole } from '../../../../shared'

export const AutoCompleteRole = () => {
  const { watch, resetField } = useFormContext()
  const role: iRole = watch('role')

  useEffect(() => resetField('school'), [role])

  const elem = useMemo(() => {
    switch (role) {
      case 'DIRET':
        return (
          <AutoCompleteSchool
            isMultiple
            query="&is_director=false"
            name="schools"
          />
        )

      case 'SERV':
        return <AutoCompleteSchool isMultiple name="schools" />

      default:
        return <></>
    }
  }, [role])

  return elem
}
