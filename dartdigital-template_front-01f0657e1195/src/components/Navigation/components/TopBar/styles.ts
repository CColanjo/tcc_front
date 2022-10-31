import { AppBar, Box, styled, Toolbar } from '@mui/material'

export const StyledAppBar = styled(AppBar)`
	box-shadow: none !important;
`

export const StyledToolbar = styled(Toolbar)`
	height: 72px;
	justify-content: space-between;

	&.toolbar-desktop {
		justify-content: end;
	}
`

export const StyledBox = styled(Box)`
	display: flex;
	flex-grow: 0;
	gap: 24px;
`
