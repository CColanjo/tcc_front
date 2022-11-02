/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Container, Grid, TextField } from '@mui/material'
import { useIntl } from 'react-intl'
import { useFormik } from 'formik'
import { object, string } from 'yup'
import changePasswordServices from '../services'
import { useAuth } from '~/hooks'
import toastMessages from '~/components/ToastMessages'

const ChangePassword = () => {
	const { messages } = useIntl()
	const auth = useAuth()

	const onSubmit = async (data: any) => {
		if (data.newPassword != data.newPasswordConfirmation) {
			toastMessages.success(messages['PasswordsAreNotTheSame'].toString())
			return
		}
		debugger
		console.log(auth.user.password)
		if (auth.user.password != data.oldPassword) {
			toastMessages.success(
				messages['CurrentPasswordDoesNotMatch'].toString()
			)
			return
		}

		try {
			data.username = auth.user.username
			changePasswordServices.changePassword(data)
			toastMessages.success(messages['ChangePasswordSucess'].toString())
			formik.resetForm()
		} catch (err) {
			console.log(err)
		}
	}

	const validationSchema = object({
		oldPassword: string().required(
			messages['error.validation.required-fields'].toString()
		),
		newPassword: string().required(
			messages['error.validation.required-fields'].toString()
		),
		newPasswordConfirmation: string().required(
			messages['error.validation.required-fields'].toString()
		)
	})

	const formik = useFormik({
		initialValues: {
			oldPassword: '',
			newPassword: '',
			newPasswordConfirmation: ''
		},
		onSubmit: onSubmit,
		validateOnBlur: false,
		validateOnChange: false,
		validationSchema
	})

	return (
		<form onSubmit={formik.handleSubmit}>
			<Container>
				<Grid container direction="column" padding={2} spacing={2}>
					<Grid container item direction="row">
						<Grid item>
							<h3>{messages['change-password'].toString()}</h3>
						</Grid>
					</Grid>
					<Grid container item direction="row">
						<Grid item sx={{ maxWidth: '100%', width: 660 }}>
							<TextField
								id="oldPassword"
								name="oldPassword"
								label={messages['old-password'].toString()}
								variant="outlined"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.oldPassword}
								error={Boolean(formik.errors.oldPassword)}
							/>
						</Grid>
					</Grid>
					<Grid container item direction="row" spacing={2}>
						<Grid item>
							<TextField
								id="newPassword"
								name="newPassword"
								label={messages['new-password'].toString()}
								variant="outlined"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.newPassword}
								error={Boolean(formik.errors.newPassword)}
							/>
						</Grid>
					</Grid>
					<Grid container item direction="row" spacing={2}>
						<Grid item>
							<TextField
								id="newPasswordConfirmation"
								name="newPasswordConfirmation"
								label={messages['confirm-password'].toString()}
								variant="outlined"
								type={'confirmPassword'}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.newPasswordConfirmation}
								error={Boolean(
									formik.errors.newPasswordConfirmation
								)}
							/>
						</Grid>
					</Grid>

					<Grid container item direction="row">
						<Grid item>
							<Button variant="contained" type="submit">
								{messages['label_button_save'].toString()}
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Container>
		</form>
	)
}

export default ChangePassword
