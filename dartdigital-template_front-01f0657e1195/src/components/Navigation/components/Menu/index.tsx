import { Box, SwipeableDrawer } from '@mui/material'

import { useBreakpoint } from '~/hooks/breakpoint'
import { IMenu } from '~/interfaces/menu.interface'

import { MenuItem } from '../MenuItem'
import { MenuLogo } from '../MenuLogo'
import { StyledDivMenu, StyledDivMenuContainer } from './styles'

type MenuProps = {
	menuItems: IMenu[]
	menuIsOpen: boolean

	handleToggleMenu: (opened: boolean) => void
}

export const Menu = ({
	menuItems,
	menuIsOpen,
	handleToggleMenu
}: MenuProps) => {
	const { md } = useBreakpoint()

	const loadMenu = () => {
		return menuItems.map((menuItem, index) => {
			menuItem.active = menuItem.path?.includes(window.location.pathname)
			return <MenuItem {...menuItem} key={index} />
		})
	}

	return md ? (
		<StyledDivMenuContainer>
			<StyledDivMenu>
				<MenuLogo />
				<Box>{loadMenu()}</Box>
			</StyledDivMenu>
		</StyledDivMenuContainer>
	) : (
		<SwipeableDrawer
			open={menuIsOpen}
			onClose={() => {
				handleToggleMenu(false)
			}}
			onOpen={() => {
				handleToggleMenu(true)
			}}
		>
			<MenuLogo />
			{loadMenu()}
		</SwipeableDrawer>
	)
}
