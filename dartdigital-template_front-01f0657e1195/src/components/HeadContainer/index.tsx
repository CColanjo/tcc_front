import { Box, Container, Grid, Typography } from '@mui/material'
import { MessageFormatElement } from 'react-intl'
import { useBreakpoint } from '~/hooks'

type HeadContainerProps = {
	title: string | MessageFormatElement[]
	children: React.ReactNode
	headSufix?: JSX.Element
	hasBackgroundColor?: boolean
	hasFilter?: boolean
}
export default function HeadContainer({
	title,
	children,
	hasFilter = false,
	hasBackgroundColor = true,
	headSufix
}: HeadContainerProps) {
	const { md } = useBreakpoint()

	return (
		<Grid
			item
			container
			component="main"
			sx={{
				height: 'calc(100vh - 122px)',
				m: '18px',
				width: hasFilter && md ? 'calc(100% - 286px)' : '100%'
			}}
		>
			<Box
				sx={{
					bgcolor: hasBackgroundColor ? '#fff' : 'transparent',
					width: '100%',
					mt: 4,
					borderRadius: 3
				}}
			>
				<Container sx={{ mx: 0, py: 3 }} maxWidth={false}>
					<Grid
						container
						direction="row"
						justifyContent="space-between"
					>
						<Typography
							mb={2}
							variant="h6"
							sx={{ color: '#575757', fontWeight: '700' }}
						>
							{title}
						</Typography>
						<Grid item mb={!md ? 2 : 0}>
							{headSufix}
						</Grid>
					</Grid>
					{children}
				</Container>
			</Box>
		</Grid>
	)
}
