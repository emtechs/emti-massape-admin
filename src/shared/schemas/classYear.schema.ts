import { z } from 'zod'

export const classYearCreateSchema = z.object({
  classes: z
    .object({ id: z.string().uuid() }, { required_error: 'Turma obrigatório' })
    .array(),
})
