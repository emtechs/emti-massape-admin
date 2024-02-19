import { z } from 'zod'

export const studentCreateSchema = z.object({
  name: z
    .string({ required_error: 'Nome do Aluno obrigatório' })
    .min(1, 'Nome do Aluno obrigatório'),
  registry: z
    .string({ required_error: 'Matrícula obrigatório' })
    .min(1, 'Matrícula obrigatório'),
})
