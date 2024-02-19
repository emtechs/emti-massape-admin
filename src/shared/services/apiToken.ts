import { apiUsingNow } from '../../shared'

const verify = async (token: string) => {
  await apiUsingNow.get(`/token/${token}`)
}

export const apiToken = {
  verify,
}
