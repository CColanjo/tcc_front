/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Container, Grid } from '@mui/material'
import { FormattedMessage, useIntl } from 'react-intl'
import { useFormik } from 'formik'
import { object, string } from 'yup'
import changePasswordServices from '../services'
import { useAuth } from '~/hooks'
import toastMessages from '~/components/ToastMessages'
import { InputPassword } from '~/components'

const ChangePassword = () => {
	const { messages } = useIntl()
	const auth = useAuth()

	const onSubmit = async (input: any) => {
		if (input.newPassword != input.newPasswordConfirmation) {
			toastMessages.error(messages['PasswordsAreNotTheSame'].toString())
			return
		}
		if (auth.user.password != input.oldPassword) {
			toastMessages.error(
				messages['CurrentPasswordDoesNotMatch'].toString()
			)
			return
		}

		try {
			input.username = auth.user.username
			auth.user.password = input.newPassword
			await changePasswordServices.changePassword(input)
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
					<Grid container item direction="row" spacing={2}>
						<Grid item>
							<InputPassword
								required
								fullWidth
								margin="normal"
								id="oldPassword"
								name="oldPassword"
								autoComplete="current-password"
								color="orangeDart"
								value={formik.values.oldPassword}
								onChange={formik.handleChange}
								error={
									formik.touched.oldPassword &&
									Boolean(formik.errors.oldPassword)
								}
								helperText={formik.errors.oldPassword}
								label={<FormattedMessage id="old-password" />}
							/>
						</Grid>
					</Grid>
					<Grid container item direction="row" spacing={2}>
						<Grid item>
							<InputPassword
								required
								fullWidth
								margin="normal"
								id="newPassword"
								name="newPassword"
								autoComplete="current-password"
								color="orangeDart"
								value={formik.values.newPassword}
								onChange={formik.handleChange}
								error={
									formik.touched.newPassword &&
									Boolean(formik.errors.newPassword)
								}
								helperText={formik.errors.newPassword}
								label={<FormattedMessage id="new-password" />}
							/>
						</Grid>
					</Grid>
					<Grid container item direction="row" spacing={2}>
						<Grid item>
							<InputPassword
								required
								fullWidth
								margin="normal"
								id="newPasswordConfirmation"
								name="newPasswordConfirmation"
								autoComplete="current-password"
								color="orangeDart"
								value={formik.values.newPasswordConfirmation}
								onChange={formik.handleChange}
								error={
									formik.touched.newPasswordConfirmation &&
									Boolean(
										formik.errors.newPasswordConfirmation
									)
								}
								helperText={
									formik.errors.newPasswordConfirmation
								}
								label={
									<FormattedMessage id="confirm-password" />
								}
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
