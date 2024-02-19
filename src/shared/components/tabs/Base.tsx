import { ReactElement, SyntheticEvent } from 'react'
import { Box, Tab, Tabs } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import { handleParams } from '../../../shared'

interface iTabsBaseProps {
  elemArr: {
    icon: ReactElement<unknown, string>
    disabled?: boolean
    label: string
    value: string
  }[]
}

export const TabsBase = ({ elemArr }: iTabsBaseProps) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const value = searchParams.get('view') || ''

  const handleChange = (_event: SyntheticEvent, newValue: string) => {
    setSearchParams((old) => {
      handleParams(old)
      old.set('view', newValue)
      return old
    })
  }
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
      >
        {elemArr.map((el) => (
          <Tab
            key={el.value}
            icon={el.icon}
            label={el.label}
            disabled={el.disabled}
            value={el.value}
          />
        ))}
      </Tabs>
    </Box>
  )
}
