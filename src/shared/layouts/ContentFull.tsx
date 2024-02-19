import { Box, Typography, useMediaQuery } from '@mui/material'
import { iChildren } from '../../shared'

export const LayoutContentFull = ({ children }: iChildren) => {
  const matches = useMediaQuery('(max-width:305px)')
  const dateData = new Date()

  if (matches) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
        width="80vw"
      >
        <img src="/logo.webp" width="100%" alt="EMTI Digital" />
        {children}
        <Typography fontSize="0.7rem">
          {dateData.getUTCFullYear()} © EM Soluções Tecnológicas
        </Typography>
      </Box>
    )
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <img src="/logo.webp" width="100%" alt="EMTI Digital" />
      {children}
      <Typography>
        {dateData.getUTCFullYear()} © EM Soluções Tecnológicas
      </Typography>
    </Box>
  )
}
