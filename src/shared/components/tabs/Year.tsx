import { SyntheticEvent } from 'react'
import { Tab, Tabs } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import { handleParams, useDataContext } from '../../../shared'

export const TabsYear = () => {
  const { listYear } = useDataContext()
  const [searchParams, setSearchParams] = useSearchParams()

  const value = searchParams.get('year_id') || ''

  const handleChange = (_event: SyntheticEvent, newValue: string) => {
    setSearchParams((old) => {
      handleParams(old)
      old.set('year_id', newValue)
      return old
    })
  }

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      orientation="vertical"
      variant="scrollable"
      sx={{ borderRight: 1, borderColor: 'divider' }}
    >
      {listYear.map((el) => (
        <Tab key={el.id} label={el.year} value={el.id} />
      ))}
    </Tabs>
  )
}
