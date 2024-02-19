import { MouseEvent, ReactNode } from 'react'

export interface iChildren {
  children: ReactNode
}

export interface iAutoCompleteBaseProps {
  query?: string
  name?: string
  label?: string
  isMultiple?: boolean
}

export interface iButtonBaseProps {
  fullWidth?: boolean
  title: string
  href?: string
  startIcon?: ReactNode
  endIcon?: ReactNode
  onClick?: () => void
  size?: 'small' | 'medium' | 'large'
  color?:
    | 'primary'
    | 'inherit'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
}

export interface iDialogBaseProps {
  open: boolean
  onClose: () => void
  getData?: () => void
}

export interface iLabelBaseProps {
  clickable?: boolean
  to?: string
}

export type iLinkComp = { component: 'div' } | object

type option = {
  to: string
  value: string
}

export interface iMenuLayoutProps {
  title: string
  icon: ReactNode
  anchorEl: HTMLElement | null
  open: boolean
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
  onClose: () => void
  options: option[]
}

export interface iHeadCell {
  order?: string
  numeric: 'right' | 'left'
  label: string
}

export interface iTable extends iChildren {
  message?: string
  link?: 'div'
  isCount?: boolean
  headCells: iHeadCell[]
}
