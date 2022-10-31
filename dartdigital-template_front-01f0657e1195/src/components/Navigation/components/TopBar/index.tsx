import { Container, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

import { useBreakpoint } from '~/hooks'

import { SelectLanguage, AvatarUserMenu } from '~/components'

import { StyledAppBar, StyledToolbar, StyledBox } from './styles'

type TopBarProps = {
	menuIsOpen: boolean
	handleToggleMenu: (opened: boolean) => void
}

export const TopBar = ({ menuIsOpen, handleToggleMenu }: TopBarProps) => {
	const { md } = useBreakpoint()

	return (
		<StyledAppBar position="static" color="orangeDart">
			<Container maxWidth={false}>
				<StyledToolbar
					disableGutters
					className={md ? 'toolbar-desktop' : ''}
				>
					{!md && (
						<IconButton
							color="inherit"
							edge="start"
							onClick={() => {
								handleToggleMenu(!menuIsOpen)
							}}
						>
							<MenuIcon />
						</IconButton>
					)}
					<StyledBox>
						<SelectLanguage />
						<AvatarUserMenu />
					</StyledBox>
				</StyledToolbar>
			</Container>
		</StyledAppBar>
	)
}
