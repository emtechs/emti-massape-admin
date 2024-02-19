import { z } from 'zod'
import { avatarSchema } from '../../shared'

export type iAvatarRequest = z.infer<typeof avatarSchema>
