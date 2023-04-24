import { FormattedMessage, useIntl as useReactIntl } from 'react-intl'

import { useFormik } from 'formik'
import * as yup from 'yup'
import { toastMessages } from '~/components'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { InputPassword } from '../../components'
import { useAuth, useIntl } from '~/hooks'
import { UserModel } from '~/models/user-model'
import logoBlue from '@/assets/images/logo-blue.png'
import backgroundLogin from '@/assets/images/bg-login.png'
import loginServices from './services'
import { Link } from '@mui/material'

const LoginPage = () => {
	const intl = {
		...useIntl(),
		...useReactIntl()
	}

	const { login } = useAuth()

	const validationSchema = yup.object({
		username: yup
			.string()
			.required(intl.formatMessage({ id: 'username_required' })),
		password: yup
			.string()
			.required(intl.formatMessage({ id: 'password_required' }))
	})

	const form = useFormik<UserModel>({
		initialValues: {
			username: '',
			password: ''
		},
		validationSchema: validationSchema,
		onSubmit: () => {
			handleSubmit()
		}
	})

	const forgotPassword = async () => {
		const values = form.values

		if (values.username === '') {
			toastMessages.error('Preencher usuário')
		} else {
			const response = await loginServices.forgotPassword(values.username)
			const { data } = response

			toastMessages.success(data)
		}
	}

	const handleSubmit = async () => {
		if (form.isValid) {
			const values = form.values
			await login(values.username, values.password)
		}
	}

	return (
		<Grid container component="main" sx={{ height: '100vh' }}>
			<CssBaseline />

			<Grid
				item
				xs={false}
				sm={4}
				md={8}
				sx={{
					backgroundImage: `url(${backgroundLogin})`,
					backgroundRepeat: 'no-repeat',
					backgroundColor: (t) =>
						t.palette.mode === 'light'
							? t.palette.grey[50]
							: t.palette.grey[900],
					backgroundSize: 'cover',
					backgroundPosition: 'center'
				}}
			/>
			<Grid
				item
				xs={12}
				sm={8}
				md={4}
				component={Paper}
				elevation={6}
				square
			>
				<Box
					sx={{
						my: 8,
						mx: 4,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center'
					}}
				>
					<img src={logoBlue} />
					<Box
						component="form"
						noValidate
						onSubmit={form.handleSubmit}
						sx={{ mt: 5 }}
					>
						<TextField
							required
							fullWidth
							autoFocus
							margin="normal"
							id="username"
							name="username"
							autoComplete="username"
							color="orangeDart"
							value={form.values.username}
							onChange={form.handleChange}
							error={
								form.touched.username &&
								Boolean(form.errors.username)
							}
							helperText={form.errors.username}
							label={<FormattedMessage id="username" />}
						/>
						<InputPassword
							required
							fullWidth
							margin="normal"
							id="password"
							name="password"
							autoComplete="current-password"
							color="orangeDart"
							value={form.values.password}
							onChange={form.handleChange}
							error={
								form.touched.password &&
								Boolean(form.errors.password)
							}
							helperText={form.errors.password}
							label={<FormattedMessage id="password" />}
						/>

						<Button
							fullWidth
							type="submit"
							variant="contained"
							color="orangeDart"
							size="large"
							sx={{ mt: 2, mb: 2, height: '56px' }}
						>
							<FormattedMessage id="continue" />
						</Button>

						<Link
							onClick={() => {
								forgotPassword()
							}}
						>
							<FormattedMessage id="forgot-password" />
						</Link>
					</Box>
				</Box>
			</Grid>
		</Grid>
	)
}

export default LoginPage
