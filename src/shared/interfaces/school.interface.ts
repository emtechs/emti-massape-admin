import { z } from 'zod'
import {
  iDialogBaseProps,
  iUser,
  schoolClassCreateSchema,
  schoolCreateSchema,
} from '../../shared'

export interface iSchool {
  id: string
  name: string
  is_active: boolean
  director?: iUser
  servers: number
}

export interface iDialogSchoolProps extends iDialogBaseProps {
  school: iSchool
}

export type iSchoolRequest = z.infer<typeof schoolCreateSchema>

export type iSchoolClassRequest = z.infer<typeof schoolClassCreateSchema>
