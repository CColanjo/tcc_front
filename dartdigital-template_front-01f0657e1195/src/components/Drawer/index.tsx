import React, { forwardRef, Ref, useImperativeHandle, useState } from 'react'
import { IconButton, SwipeableDrawer } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import './styles.scss'
import { useBreakpoint } from '~/hooks'

type DrawerProps = {
	children: JSX.Element
	onClose?: () => void
	fullWidth?: boolean
}

export interface DrawerHandles {
	toggleDrawer: () => void
	closeDrawer: () => void
	openDrawer: () => void
}

const Drawer = (
	{ children, onClose, fullWidth }: DrawerProps,
	ref: Ref<DrawerHandles>
) => {
	const [drawerOpen, setDrawerOpen] = useState(false)

	const { md } = useBreakpoint()

	const toggleDrawer = () => {
		setDrawerOpen((drawerOpen) => !drawerOpen)
	}

	const closeDrawer = () => {
		setDrawerOpen(false)
	}
	const openDrawer = () => {
		setDrawerOpen(true)
	}

	useImperativeHandle(ref, () => {
		return {
			toggleDrawer,
			closeDrawer,
			openDrawer
		}
	})

	return (
		<>
			{!md ? (
				<SwipeableDrawer
					className={'main-drawer-fullWidth'}
					open={drawerOpen}
					anchor="right"
					onClose={openDrawer}
					onOpen={openDrawer}
				>
					<IconButton
						aria-label="close"
						onClick={onClose ? onClose : closeDrawer}
						sx={{
							position: 'absolute',
							right: 8,
							color: '#2519ce'
						}}
					>
						<CloseIcon />
					</IconButton>
					{children}
				</SwipeableDrawer>
			) : (
				<SwipeableDrawer
					className={
						fullWidth ? 'main-drawer-fullWidth' : 'main-drawer'
					}
					open={drawerOpen}
					anchor="right"
					onClose={openDrawer}
					onOpen={openDrawer}
				>
					<IconButton
						aria-label="close"
						onClick={onClose ? onClose : closeDrawer}
						sx={{
							position: 'absolute',
							right: 8,
							color: '#2519ce'
						}}
					>
						<CloseIcon />
					</IconButton>
					{children}
				</SwipeableDrawer>
			)}
		</>
	)
}
export default forwardRef(Drawer)
