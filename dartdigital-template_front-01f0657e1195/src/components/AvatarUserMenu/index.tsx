/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'

import { Avatar, IconButton, Menu, MenuItem } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'

import { useAuth } from '~/hooks'
import { DropdownMenuStylesProps } from '~/utils/common-styles-props'

import IconLabel from '../IconLabel'

const AvatarUserMenu = () => {
	const [anchorUserMenuAvatar, setAnchorUserMenuAvatar] =
		useState<HTMLButtonElement | null>(null)

	const { logout, user } = useAuth()

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorUserMenuAvatar(event.currentTarget)
	}

	const handleCloseUserMenu = () => {
		setAnchorUserMenuAvatar(null)
	}

	const handleExit = () => {
		handleCloseUserMenu()
		logout()
	}

	const openedUserMenu = Boolean(anchorUserMenuAvatar)

	return (
		<>
			<IconButton onClick={handleOpenUserMenu}>
				<Avatar
					sx={{
						fontSize: '15px',
						width: 50,
						height: 50,
						color: '#3A3A3A',
						fontWeight: 'bold'
					}}
				>
					{user.username}
				</Avatar>
			</IconButton>
			<Menu
				keepMounted
				anchorEl={anchorUserMenuAvatar}
				open={openedUserMenu}
				PaperProps={DropdownMenuStylesProps(0.5)}
				transformOrigin={{
					horizontal: 'right',
					vertical: 'top'
				}}
				anchorOrigin={{
					horizontal: 'right',
					vertical: 'bottom'
				}}
				onClose={handleCloseUserMenu}
			>
				<MenuItem key="exit" onClick={handleExit}>
					<IconLabel
						icon={LogoutIcon}
						idLabel="exit"
						textAlign="center"
					/>
				</MenuItem>
			</Menu>
		</>
	)
}
export default AvatarUserMenu
