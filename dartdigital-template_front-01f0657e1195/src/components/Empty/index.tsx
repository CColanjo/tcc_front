import { Grid, Typography } from '@mui/material'
import InboxTwoToneIcon from '@mui/icons-material/InboxTwoTone'
import { useIntl } from 'react-intl'

const EmptyContent = () => {
	const { messages } = useIntl()

	return (
		<Grid
			container
			direction="column"
			alignContent="center"
			justifyContent="flex-end"
			alignItems="center"
		>
			<Grid item>
				<InboxTwoToneIcon sx={{ fontSize: '5rem' }} color="granite" />
			</Grid>
			<Grid item>
				<Typography color="granite">
					{messages['no_results']}
				</Typography>
			</Grid>
		</Grid>
	)
}
export default EmptyContent
