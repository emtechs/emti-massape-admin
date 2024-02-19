import { z } from 'zod'

export const schoolCreateSchema = z.object({
  name: z
    .string({ required_error: 'Nome da Escola obrigatório' })
    .min(1, 'Nome da Escola obrigatório'),
})

export const schoolUpdateSchema = z.object({
  name: z
    .string({ required_error: 'Nome da Escola obrigatório' })
    .min(1, 'Nome da Escola obrigatório'),
})

export const schoolUpdateDirectorSchema = z
  .object({
    director: z.object(
      { id: z.string().uuid() },
      { required_error: 'Diretor obrigatório' },
    ),
    id: z.string().uuid().optional(),
    role: z.enum(['SERV', 'DIRET', 'SECRET', 'ADMIN']).default('DIRET'),
  })
  .refine((fields) => (fields.id = fields.director.id))

export const schoolClassCreateSchema = z.object({
  schools: z
    .object({ id: z.string().uuid() }, { required_error: 'Escola obrigatório' })
    .array(),
})
