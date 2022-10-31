import { FormattedMessage } from 'react-intl'

import { Typography } from '@mui/material'

import { StyledBox } from './styles'

type IconLabelProps = {
	icon: React.ReactNode

	idLabel: string

	fontSize?: string

	textAlign?: 'left' | 'center' | 'right'

	colorIcon?: string // TODO - Criar interface para cores
	labelColor?: string // TODO - Criar interface para cores
}

const IconLabel = (props: IconLabelProps) => {
	const {
		icon,
		idLabel,
		colorIcon,
		labelColor,
		textAlign = 'left',
		fontSize = '16px'
	} = props

	const Element = icon as React.ElementType

	return (
		<StyledBox
			textAlign={textAlign}
			alignItems="center"
			display="inline-flex"
		>
			<Element fontSize={fontSize} color={colorIcon} />
			<Typography
				fontSize={fontSize}
				textAlign="center"
				paddingLeft="8px"
				sx={{
					color: labelColor ? `${labelColor}.main` : ''
				}}
			>
				<FormattedMessage id={idLabel} />
			</Typography>
		</StyledBox>
	)
}
export default IconLabel
