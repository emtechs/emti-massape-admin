import { z } from 'zod'
import { defineServerSchema, iRole, serverCreateSchema } from '../../shared'

export interface iSchoolServer {
  id: string
  name: string
  role: iRole
  key: string
}

export type iServerRequest = z.infer<typeof serverCreateSchema>

export type iSchoolServerRequest = z.infer<typeof defineServerSchema>
