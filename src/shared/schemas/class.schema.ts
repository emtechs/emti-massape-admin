import { z } from 'zod'

export const classCreateSchema = z.object({
  name: z
    .string({ required_error: 'Nome da Turma obrigatório' })
    .min(1, 'Nome da Turma obrigatório'),
})
