import { ThemeProvider as MuiThemeProvider } from '@mui/material'

import theme from '~/styles/themes/default.theme'

interface ThemeProviderProps {
	children: React.ReactNode
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
	return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
}

export default ThemeProvider
