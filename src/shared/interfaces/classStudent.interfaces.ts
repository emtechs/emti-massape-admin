import { z } from 'zod'
import {
  classSchoolStudentCreateSchema,
  classStudentCreateSchema,
  classStudentTranferSchema,
  iClassYear,
} from '../../shared'

export interface iClassStudent {
  id: string
  name: string
  registry: string
  class: iClassYear
  key: string
}
export type iClassStudentRequest = z.infer<typeof classStudentCreateSchema>

export type iClassStudentTranferRequest = z.infer<
  typeof classStudentTranferSchema
>

export type iClassSchoolStudentRequest = z.infer<
  typeof classSchoolStudentCreateSchema
>
