import {
	useSnackbar,
	OptionsObject,
	SnackbarKey,
	SnackbarMessage
} from 'notistack'

import { Alert, AlertTitle, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useIntl } from 'react-intl'

type AlertProps = {
	severity: 'error' | 'info' | 'success' | 'warning'
	message: SnackbarMessage
	key: SnackbarKey
	closeButton?: boolean
}

export const Notification = ({
	severity,
	message,
	key,
	closeButton = true
}: AlertProps) => {
	const { closeSnackbar } = useSnackbar()
	const intl = useIntl()
	const { messages } = intl

	return (
		<Alert
			severity={severity}
			action={
				closeButton && (
					<IconButton
						aria-label="close"
						color="inherit"
						size="small"
						onClick={() => {
							closeSnackbar(key)
						}}
					>
						<CloseIcon fontSize="inherit" />
					</IconButton>
				)
			}
		>
			<AlertTitle>{messages[severity]}</AlertTitle>
			{message}
		</Alert>
	)
}

const notificationOptions: OptionsObject = {
	anchorOrigin: {
		vertical: 'top',
		horizontal: 'right'
	},
	autoHideDuration: 3000
}

export const successOptions: OptionsObject = {
	...notificationOptions,
	content: (key, message) =>
		Notification({ severity: 'success', message, key })
}
export const warningOptions: OptionsObject = {
	...notificationOptions,
	content: (key, message) =>
		Notification({ severity: 'warning', message, key })
}
export const errorOptions: OptionsObject = {
	...notificationOptions,
	content: (key, message) => Notification({ severity: 'error', message, key })
}
export const infoOptions: OptionsObject = {
	...notificationOptions,
	content: (key, message) => Notification({ severity: 'info', message, key })
}
