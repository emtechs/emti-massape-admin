import { iChildren } from '../interfaces'
import { AuthProvider } from './AuthContext'
import { DataProvider } from './DataContext'
import { ParamsProvider } from './ParamsContext'
import { AppThemeProvider } from './ThemeContext'

const Providers = ({ children }: iChildren) => (
  <AppThemeProvider>
    <AuthProvider>
      <DataProvider>
        <ParamsProvider>{children}</ParamsProvider>
      </DataProvider>
    </AuthProvider>
  </AppThemeProvider>
)

export default Providers
export { useAuthContext } from './AuthContext'
export { useDataContext } from './DataContext'
export { useParamsContext } from './ParamsContext'
export { useAppThemeContext } from './ThemeContext'
