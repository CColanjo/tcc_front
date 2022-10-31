import { FormattedMessage } from 'react-intl'
import { useNavigate } from 'react-router-dom'

import { Typography } from '@mui/material'

import { CustomIcon } from '~/components'

import { IMenu } from '~/interfaces/menu.interface'

import { StyledButtonBase } from './styles'

export type MenuItemProps = {
	// empty
} & IMenu

export const MenuItem = (props: MenuItemProps) => {
	const navigate = useNavigate()

	const color = props.active ? 'orangeDart' : 'granite'

	const handleClick = () => {
		if (props.path) {
			navigate(props.path)
		}
	}

	return (
		<StyledButtonBase onClick={handleClick}>
			<CustomIcon icon={props.icon} color={color} />
			<Typography
				textAlign="center"
				fontSize={10}
				sx={{
					color: `${color}.main`,
					fontWeight: 'bold'
				}}
			>
				<FormattedMessage id={props.idTitle} />
			</Typography>
		</StyledButtonBase>
	)
}
