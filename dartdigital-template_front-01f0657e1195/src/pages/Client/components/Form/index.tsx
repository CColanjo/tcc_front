/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Container, Grid, TextField, Typography } from '@mui/material'
import { Ref, useEffect } from 'react'
import Drawer, { DrawerHandles } from '~/components/Drawer'
import { useIntl } from 'react-intl'
import clientServices from '../../services'
import toastMessages from '~/components/ToastMessages'
import { useFormik } from 'formik'
import { object, string } from 'yup'

type AddClientFormPros = {
	drawerRef: Ref<DrawerHandles>
	closeDrawer: () => void
	openDrawer: () => void
	id: string
	setRefresh: React.Dispatch<React.SetStateAction<boolean>>
}

const AddClientForm = ({
	drawerRef,
	closeDrawer,
	openDrawer,
	id,
	setRefresh
}: AddClientFormPros) => {
	const { messages } = useIntl()

	const onClose = () => {
		closeDrawer()
		formik.resetForm()
	}

	const loadData = async (id: string) => {
		const response = await clientServices.getClient(id)
		const { data } = response
		formik.setValues(data)
		openDrawer()
	}

	useEffect(() => {
		if (id) {
			loadData(id)
		}
	}, [id])

	const onSubmit = async (data: any) => {
		try {
			if (id) {
				await clientServices.updateClient(data)
			} else {
				await clientServices.createClient(data)
			}
			setRefresh((refresh) => !refresh)
			toastMessages.success(messages['register-sucess'].toString())
			onClose()
		} catch (err) {
			console.log(err)
		}
	}

	const validationSchema = object({
		Name: string().required(
			messages['error.validation.required-fields'].toString()
		),
		Cellphone: string().required(
			messages['error.validation.required-fields'].toString()
		),
		Email: string().required(
			messages['error.validation.required-fields'].toString()
		),
		Address: string().required(
			messages['error.validation.required-fields'].toString()
		)
	})

	const formik = useFormik({
		initialValues: {
			Name: '',
			Cellphone: '',
			Email: '',
			Address: ''
		},
		onSubmit: onSubmit,
		validateOnBlur: false,
		validateOnChange: false,
		validationSchema
	})

	return (
		<Drawer ref={drawerRef} onClose={onClose}>
			<form onSubmit={formik.handleSubmit}>
				<Container>
					<Grid container direction="column" padding={2} spacing={2}>
						<Grid container item direction="row">
							<Grid item>
								<h3>{messages['add-client'].toString()}</h3>
							</Grid>
						</Grid>
						<Grid container item direction="row">
							<Grid item sx={{ maxWidth: '100%', width: 660 }}>
								<TextField
									id="Name"
									name="Name"
									label={messages['name'].toString()}
									variant="outlined"
									fullWidth
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.Name}
									helperText={formik.errors.Name}
									error={
										formik.touched.Name &&
										Boolean(formik.errors.Name)
									}
								/>
							</Grid>
						</Grid>
						<Grid container item direction="row" spacing={2}>
							<Grid item>
								<TextField
									id="Cellphone"
									name="Cellphone"
									label={messages[
										'cellphone-number'
									].toString()}
									variant="outlined"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.Cellphone}
									error={Boolean(formik.errors.Cellphone)}
									helperText={formik.errors.Cellphone}
								/>
							</Grid>
							<Grid item>
								<TextField
									id="Email"
									name="Email"
									label={messages['e-mail'].toString()}
									variant="outlined"
									type={'email'}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.Email}
									error={Boolean(formik.errors.Email)}
									helperText={formik.errors.Email}
								/>
							</Grid>
							<Grid item>
								<TextField
									id="Address"
									name="Address"
									label={messages['address'].toString()}
									variant="outlined"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.Address}
									error={Boolean(formik.errors.Address)}
									helperText={formik.errors.Address}
								/>
							</Grid>
						</Grid>

						<Grid>
							<br></br>
							<Typography variant="h6" gutterBottom>
								Essa plataforma utiliza ambiente de sandbox para
								enviar mensagem, para receber mensagem no seu
								whatsapp, por favor envie <b>join teach-come</b>{' '}
								para número o +1 415 523 8886, ele fica
								disponível durante o período de 3 dias
							</Typography>
						</Grid>

						<Grid container item direction="row">
							<Grid item>
								<Button variant="contained" type="submit">
									{messages['label_button_add'].toString()}
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</Container>
			</form>
		</Drawer>
	)
}

export default AddClientForm
