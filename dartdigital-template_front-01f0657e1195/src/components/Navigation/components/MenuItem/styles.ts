import { ButtonBase, styled } from '@mui/material'

export const StyledButtonBase = styled(ButtonBase)`
	width: 100%;
	display: flex;
	flex-direction: column;
	padding: 12px;

	&:hover {
		opacity: 0.5;
	}
`
