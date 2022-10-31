import { IconPropsColorOverrides, SxProps } from '@mui/material'
import { StyledBox } from './styles'

type CustomIconProps = {
	icon: React.ReactNode
	color?: IconPropsColorOverrides
	sx?: SxProps
	fontSize?: string
}

const CustomIcon = ({ icon, color, fontSize = '26px' }: CustomIconProps) => {
	const Element = icon as React.ElementType

	return (
		<StyledBox>
			<Element
				color={color}
				style={{
					fontSize: fontSize
				}}
			/>
		</StyledBox>
	)
}
export default CustomIcon
