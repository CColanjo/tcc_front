import { SimplePaletteColorOptions } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
	interface Palette {
		trueBlue: SimplePaletteColorOptions
		lightBlue: SimplePaletteColorOptions
		seaBlue: SimplePaletteColorOptions
		oceanGreen: SimplePaletteColorOptions
		black: SimplePaletteColorOptions
		granite: SimplePaletteColorOptions
		sand: SimplePaletteColorOptions
		orangeDart: SimplePaletteColorOptions
	}
	interface PaletteOptions {
		trueBlue: SimplePaletteColorOptions
		lightBlue: SimplePaletteColorOptions
		seaBlue: SimplePaletteColorOptions
		oceanGreen: SimplePaletteColorOptions
		black: SimplePaletteColorOptions
		granite: SimplePaletteColorOptions
		sand: SimplePaletteColorOptions
		white: SimplePaletteColorOptions
		orangeDart: SimplePaletteColorOptions
	}
}

declare module '@mui/material/Button' {
	interface ButtonPropsColorOverrides {
		trueBlue: boolean
		lightBlue: boolean
		seaBlue: boolean
		oceanGreen: boolean
		black: boolean
		granite: boolean
		sand: boolean
		orangeDart: boolean
	}
}

declare module '@mui/material/TextField' {
	interface TextFieldPropsColorOverrides {
		trueBlue: boolean
		lightBlue: boolean
		seaBlue: boolean
		oceanGreen: boolean
		black: boolean
		granite: boolean
		sand: boolean
		orangeDart: boolean
	}
}

declare module '@mui/material/Checkbox' {
	interface CheckboxPropsColorOverrides {
		trueBlue: boolean
		lightBlue: boolean
		seaBlue: boolean
		oceanGreen: boolean
		black: boolean
		granite: boolean
		sand: boolean
		orangeDart: boolean
	}
}

declare module '@mui/material/SvgIcon' {
	interface SvgIconPropsColorOverrides {
		trueBlue: boolean
		lightBlue: boolean
		seaBlue: boolean
		oceanGreen: boolean
		black: boolean
		granite: boolean
		sand: boolean
		white: boolean
		orangeDart: boolean
	}
}

declare module '@mui/material/AppBar' {
	interface AppBarPropsColorOverrides {
		trueBlue: boolean
		lightBlue: boolean
		seaBlue: boolean
		oceanGreen: boolean
		black: boolean
		granite: boolean
		sand: boolean
		orangeDart: boolean
	}
}
declare module '@mui/material/IconButton' {
	interface IconButtonPropsColorOverrides {
		trueBlue: boolean
		lightBlue: boolean
		seaBlue: boolean
		oceanGreen: boolean
		black: boolean
		granite: boolean
		sand: boolean
		orangeDart: boolean
	}
}
declare module '@mui/material/Radio' {
	interface RadioPropsColorOverrides {
		trueBlue: boolean
		lightBlue: boolean
		seaBlue: boolean
		oceanGreen: boolean
		black: boolean
		granite: boolean
		sand: boolean
		orangeDart: boolean
	}
}

const { palette } = createTheme()

const theme = createTheme({
	palette: {
		trueBlue: palette.augmentColor({
			color: {
				main: '#001965'
			}
		}),
		lightBlue: palette.augmentColor({
			color: {
				main: '#3897D9'
			}
		}),
		seaBlue: palette.augmentColor({
			color: {
				main: '#2563B8'
			}
		}),
		oceanGreen: palette.augmentColor({
			color: {
				main: '#27928C'
			}
		}),
		black: palette.augmentColor({
			color: {
				main: '#3A3A3A'
			}
		}),
		granite: palette.augmentColor({
			color: {
				main: '#949AA6'
			}
		}),
		sand: palette.augmentColor({
			color: {
				main: '#CCC5BC'
			}
		}),
		white: palette.augmentColor({
			color: {
				main: '#fff'
			}
		}),
		orangeDart: palette.augmentColor({
			color: {
				main: '#F58226'
			}
		})
	}
})

export default theme
