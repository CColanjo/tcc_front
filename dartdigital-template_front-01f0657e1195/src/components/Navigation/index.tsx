import { useState } from 'react'

import { useBreakpoint } from '~/hooks'
import menuItems from '~/utils/menu-items'
import { Body } from './components/Body'

import { Menu } from './components/Menu'
import { TopBar } from './components/TopBar'

import { StyledDiv } from './styles'

type NavigationProps = {
	children: React.ReactNode
}

const Navigation = ({ children }: NavigationProps) => {
	const [menuIsOpen, setMenuIsOpen] = useState(false)

	const { md } = useBreakpoint()

	const handleToggleMenu = (opened: boolean) => {
		setMenuIsOpen(opened)
	}

	return (
		<>
			<Menu
				menuItems={menuItems}
				menuIsOpen={menuIsOpen}
				handleToggleMenu={handleToggleMenu}
			/>
			<StyledDiv className={md ? 'div-desktop' : ''}>
				<TopBar
					menuIsOpen={menuIsOpen}
					handleToggleMenu={handleToggleMenu}
				/>
				<Body>{children}</Body>
			</StyledDiv>
		</>
	)
}

export default Navigation
