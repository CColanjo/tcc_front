import { useIntl, FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import './styles.scss'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'
import { Grid } from '@mui/material'

const NotFound = () => {
	const { messages } = useIntl()
	return (
		<Grid container spacing={2} className="page-not-found ">
			<Grid item xs={12}>
				<SentimentVeryDissatisfiedIcon sx={{ fontSize: 250 }} />
			</Grid>
			<Grid item xs={12}>
				<span className="page-not-found-text-large">404</span>
			</Grid>
			<Grid item xs={12}>
				<span className="page-not-found-text-medium">
					{messages['not-found'].toString()}
				</span>
			</Grid>
			<Grid item xs={12}>
				<Link className={'page-not-found-link'} to="/home">
					<FormattedMessage id={`return-to-main-page`}>
						{(text) => <span>{text}</span>}
					</FormattedMessage>
				</Link>
			</Grid>
		</Grid>
	)
}

export default NotFound
