import { Box, CardProps } from '@mui/material'
import { StyledCard } from './styles'

export type CardOutlinedProps = {
	children: React.ReactNode
	backgroundColor?: string
	margin?: string
	padding?: string
	width?: string
	height?: string
} & CardProps

export default function CardOutlined({
	children,
	backgroundColor,
	margin,
	padding,
	width,
	height = 'auto'
}: CardOutlinedProps) {
	return (
		<Box sx={{ minWidth: 100 }}>
			<StyledCard
				variant="outlined"
				backgroundColor={backgroundColor}
				margin={margin}
				padding={padding}
				width={width}
				height={height}
			>
				{children}
			</StyledCard>
		</Box>
	)
}
