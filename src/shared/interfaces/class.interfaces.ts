import { z } from 'zod'
import { classCreateSchema, iDialogBaseProps } from '../../shared'

export interface iClass {
  id: string
  name: string
  label: string
  is_active: boolean
  schools: number
  students: number
  frequencies: number
  tests: number
  infrequency: number
  school: {
    id: string
    name: string
  }
  year_id: string
  key: string
}

export interface iDialogClassProps extends iDialogBaseProps {
  classData: iClass
}

export type iClassRequest = z.infer<typeof classCreateSchema>
