import { iRole } from '../../shared'

export const rolePtBr = (role: iRole = 'SERV') => {
  switch (role) {
    case 'ADMIN':
      return 'Administrador'

    case 'DIRET':
      return 'Diretor de Escola'

    case 'SERV':
      return 'Servidor'
  }
}
