import { Card, styled, css } from '@mui/material'
import { CardOutlinedProps } from './'

export const StyledCard = styled(Card)<CardOutlinedProps>`
	${(props) => css`
		background-color: ${props.backgroundColor};
		margin: ${props.margin};
		padding: ${props.padding};
		width: ${props.width};
		height: ${props.height};
		border-radius: 8px;
		display: flex;
		flex-wrap: wrap;
		align-content: center;
		justify-content: center;
		align-items: center;
	`}
`
