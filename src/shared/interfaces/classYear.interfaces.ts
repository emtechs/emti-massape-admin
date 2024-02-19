import { z } from 'zod'
import { classYearCreateSchema } from '../../shared'

export interface iClassYear {
  id: string
  name: string
  schools: number
  students: number
  frequencies: number
  tests: number
  school: {
    id: string
    name: string
  }
  year: string
  key: string
}

export type iClassYearRequest = z.infer<typeof classYearCreateSchema>
