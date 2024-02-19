import { useSearchParams } from 'react-router-dom'
import { TableHead, TableRow, TableSortLabel } from '@mui/material'
import { TableCellLink, iHeadCell, iLinkComp } from '../../../shared'

interface iSortProps {
  headCells: iHeadCell[]
  linkComp: iLinkComp
  link?: 'div'
}

export const TableSort = ({ headCells, linkComp, link }: iSortProps) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const order = searchParams.get('order')
  const byData = searchParams.get('by')

  const createSortHandler = (property?: string) => () => {
    const isAsc = order === property && byData === 'asc'
    setSearchParams((old) => {
      if (property) old.set('order', property)
      old.set('by', isAsc ? 'desc' : 'asc')
      return old
    })
  }

  return (
    <TableHead {...linkComp}>
      <TableRow {...linkComp}>
        {headCells.map((el, index) => {
          const by = byData === 'asc' ? 'asc' : 'desc'
          return (
            <TableCellLink
              key={index}
              sortDirection={order === el.order ? by : false}
              numeric={el.numeric}
              link={link}
            >
              <TableSortLabel
                disabled={!el.order}
                active={order === el.order}
                direction={order === el.order ? by : undefined}
                onClick={createSortHandler(el.order)}
              >
                {el.label}
              </TableSortLabel>
            </TableCellLink>
          )
        })}
      </TableRow>
    </TableHead>
  )
}
