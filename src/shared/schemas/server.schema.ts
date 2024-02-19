import { z } from 'zod'

export const serverCreateSchema = z
  .object({
    server: z.object(
      { id: z.string().uuid() },
      { required_error: 'Servidor obrigatório' },
    ),
    id: z.string().uuid().optional(),
    role: z.enum(['SERV', 'DIRET', 'SECRET', 'ADMIN']).default('SERV'),
  })
  .refine((fields) => (fields.id = fields.server.id))

export const defineServerSchema = z.object({
  schools: z.object({ id: z.string().uuid() }).array(),
})
