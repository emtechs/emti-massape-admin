import { IconButton, Tooltip } from '@mui/material'
import { Link } from 'react-router-dom'
import { iButtonBaseProps } from '../../../shared'

export const ButtonIcon = ({
  title,
  color = 'primary',
  href,
  onClick,
  size,
  startIcon,
}: iButtonBaseProps) => {
  return href ? (
    <Tooltip title={title}>
      <IconButton
        component={Link}
        to={href}
        color={color}
        size={size}
        onClick={onClick}
      >
        {startIcon}
      </IconButton>
    </Tooltip>
  ) : (
    <Tooltip title={title}>
      <IconButton color={color} size={size} onClick={onClick}>
        {startIcon}
      </IconButton>
    </Tooltip>
  )
}
