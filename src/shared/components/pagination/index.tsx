import { useSearchParams } from 'react-router-dom'
import { Pagination } from '@mui/material'
import { handleParams, useParamsContext } from '../../../shared'

export const PaginationTable = () => {
  const { count } = useParamsContext()
  const [searchParams, setSearchParams] = useSearchParams()

  const page = Number(searchParams.get('page') || 1)

  return (
    Math.ceil(count / 5) > 1 && (
      <div className="w-full mt-3 flex justify-center">
        <Pagination
          count={Math.ceil(count / 5)}
          color="primary"
          showFirstButton
          showLastButton
          page={page}
          onChange={(_, value) => {
            setSearchParams((old) => {
              handleParams(old)
              old.set('page', String(value))
              return old
            })
          }}
        />
      </div>
    )
  )
}
