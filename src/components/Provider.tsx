import ReduxProvider from '@/redux-store/ReduxProvider'
import { SnackbarProvider } from 'notistack'

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ReduxProvider>
      <SnackbarProvider>{children}</SnackbarProvider>
    </ReduxProvider>
  )
}

export default Providers
