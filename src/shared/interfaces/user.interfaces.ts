import { z } from 'zod'
import {
  createUserSchema,
  iDialogBaseProps,
  userFirstSchema,
  userPasswordSchema,
  userUpdateSchema,
} from '../../shared'

export type iRole = 'ADMIN' | 'SERV' | 'DIRET'

export interface iUser {
  id: string
  name: string
  login: string
  cpf: string
  email: string
  role: iRole
  is_super: boolean
  is_first_access: boolean
  is_active: boolean
  profile: {
    url: string
  }
  key?: string
}

export type iUserRequest = z.infer<typeof createUserSchema>

export type iUserFirstRequest = z.infer<typeof userFirstSchema>

export type iUserUpdateRequest = z.infer<typeof userUpdateSchema>

export type iUserPasswordRequest = z.infer<typeof userPasswordSchema>

export interface iDialogUserProps extends iDialogBaseProps {
  user: iUser
}
