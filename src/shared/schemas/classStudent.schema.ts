import { z } from 'zod'

export const classSchoolStudentCreateSchema = z
  .object({
    students: z
      .object(
        { id: z.string().uuid() },
        { required_error: 'Aluno obrigatório' },
      )
      .array(),
    classSchool: z.object(
      { school: z.object({ id: z.string().uuid() }) },
      { required_error: 'Escola obrigatório' },
    ),
    school_id: z.string().uuid().optional(),
  })
  .refine((fields) => (fields.school_id = fields.classSchool.school.id))

export const classStudentCreateSchema = z
  .object({
    students: z
      .object(
        { id: z.string().uuid() },
        { required_error: 'Aluno obrigatório' },
      )
      .array(),
    class: z.object(
      { key: z.string().uuid() },
      { required_error: 'Turma obrigatório' },
    ),
    class_id: z.string().uuid().optional(),
  })
  .refine((fields) => (fields.class_id = fields.class.key))

export const classStudentTranferSchema = z
  .object({
    school: z.object(
      { id: z.string().uuid() },
      { required_error: 'Escola obrigatório' },
    ),
    class: z.object(
      { key: z.string().uuid() },
      { required_error: 'Turma obrigatório' },
    ),
    class_id: z.string().uuid().optional(),
  })
  .refine((fields) => (fields.class_id = fields.class.key))
