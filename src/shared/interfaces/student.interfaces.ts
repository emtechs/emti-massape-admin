import { z } from 'zod'
import { studentCreateSchema } from '../../shared'

export interface iStudent {
  id: string
  name: string
  registry: string
}

export type iStudentRequest = z.infer<typeof studentCreateSchema>
