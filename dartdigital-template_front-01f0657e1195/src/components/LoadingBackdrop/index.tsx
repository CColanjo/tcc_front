import Backdrop from '@material-ui/core/Backdrop'
import { makeStyles } from '@material-ui/core/styles'
import { useLoading } from '~/hooks/loading'

import Spinner from './components/spinner'

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 999,
		color: '#dd0202'
	}
}))

const SimpleBackdrop = () => {
	const { loading } = useLoading()
	const classes = useStyles()

	return (
		<Backdrop className={classes.backdrop} open={loading} color={'#dd0202'}>
			<Spinner />
		</Backdrop>
	)
}

export default SimpleBackdrop
