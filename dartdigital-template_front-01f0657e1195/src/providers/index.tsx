import AuthProvider from './auth'
import BreakpointProvider from './breakpoint'
import IntlProvider from './intl'
import ThemeProvider from './theme'
import { Toaster } from 'react-hot-toast'
import { SnackbarProvider } from 'notistack'
import LoadingProvider from './loading'

type ThemeProps = {
	children: React.ReactNode
}

function Providers({ children }: ThemeProps) {
	return (
		<LoadingProvider>
			<IntlProvider>
				<ThemeProvider>
					<AuthProvider>
						<SnackbarProvider>
							<BreakpointProvider>
								<>
									<Toaster />
									{children}
								</>
							</BreakpointProvider>
						</SnackbarProvider>
					</AuthProvider>
				</ThemeProvider>
			</IntlProvider>
		</LoadingProvider>
	)
}

export default Providers
