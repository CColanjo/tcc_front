/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	Box,
	Grid,
	Typography,
	Button,
	TextField,
	Dialog,
	Slide,
	IconButton
} from '@mui/material'
import { FormattedMessage } from 'react-intl'
import { TransitionProps } from '@mui/material/transitions'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { useBreakpoint } from '~/hooks'
import { forwardRef, ReactElement, Ref, useState } from 'react'

type FilterProps = {
	ElementFields?: React.ReactNode
	onReset?: () => void
	onFilter?: () => void
	height?: string
}

const Transition = forwardRef(function Transition(
	props: TransitionProps & {
		children: ReactElement
	},
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	ref: Ref<any>
) {
	return <Slide direction="left" ref={ref} {...props} />
})

const FilterBase = ({
	ElementFields,
	onReset,
	onFilter,
	height = 'calc(100vh - 72px)'
}: FilterProps) => {
	const [openDialog, setOpenDialog] = useState(false)
	const { md } = useBreakpoint()

	const handleOpen = () => {
		setOpenDialog(true)
	}
	const handleClose = () => {
		setOpenDialog(false)
	}

	const FilterForm = () => {
		return (
			<Box
				sx={{
					height: height,
					width: md ? '250px' : '100%',
					backgroundColor: '#fff',
					pb: 2
				}}
			>
				{!md && (
					<Grid
						container
						justifyContent="flex-end"
						alignContent="flex-start"
					>
						<IconButton
							edge="start"
							color="inherit"
							onClick={handleClose}
							aria-label="close"
							size="large"
						>
							<CloseRoundedIcon />
						</IconButton>
					</Grid>
				)}
				<Grid sx={{ padding: '22px 16px 0 16px' }}>
					<Grid
						container
						justifyContent="space-between"
						alignContent="center"
					>
						<Grid item>
							<Typography
								fontSize={'14px'}
								sx={{
									paddingTop: '5px',
									color: '#575757',
									fontWeight: '700'
								}}
								component={'span'}
							>
								<FormattedMessage id="filter_by" />
							</Typography>
						</Grid>
						<Grid item>
							<Button
								onClick={onReset}
								size="small"
								sx={{
									color: '#51A4DE',
									fontWeight: '500',
									textTransform: 'none'
								}}
							>
								<FormattedMessage id="reset_filters" />
							</Button>
						</Grid>
					</Grid>
					<Grid container justifyContent="center">
						{ElementFields}
					</Grid>
					<Grid container justifyContent="center" paddingTop="40px">
						<Button
							onClick={() => {
								if (onFilter) onFilter()
								//handleClose()
							}}
							fullWidth
							variant="contained"
							color="oceanGreen"
							sx={{ textTransform: 'none', fontWeight: '400' }}
						>
							<FormattedMessage id="apply_filter" />
						</Button>
					</Grid>
				</Grid>
			</Box>
		)
	}
	return !md ? (
		<>
			<Grid
				container
				item
				sm={12}
				xs={12}
				justifyContent="flex-end"
				alignContent="flex-start"
			>
				<IconButton
					color="orangeDart"
					aria-label="open filter"
					size="large"
					sx={{ mt: 2, mb: -5 }}
					onClick={handleOpen}
				>
					<FilterAltOutlinedIcon />
				</IconButton>
			</Grid>
			<Dialog
				fullScreen
				open={openDialog}
				onClose={handleClose}
				TransitionComponent={Transition}
			>
				<FilterForm />
			</Dialog>
		</>
	) : (
		<FilterForm />
	)
}

export default FilterBase
