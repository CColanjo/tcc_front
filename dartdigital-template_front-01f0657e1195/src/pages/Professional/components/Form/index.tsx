/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Container, Grid, TextField } from '@mui/material'
import { Ref, useEffect } from 'react'
import Drawer, { DrawerHandles } from '~/components/Drawer'
import { useIntl } from 'react-intl'
import toastMessages from '~/components/ToastMessages'
import { useFormik } from 'formik'
import { object, string } from 'yup'
import professionalServices from '../../services'

type AddProfessionalFormPros = {
	drawerRef: Ref<DrawerHandles>
	closeDrawer: () => void
	openDrawer: () => void
	id: string
	setRefresh: React.Dispatch<React.SetStateAction<boolean>>
}

const AddProfessionalForm = ({
	drawerRef,
	closeDrawer,
	openDrawer,
	id,
	setRefresh
}: AddProfessionalFormPros) => {
	const { messages } = useIntl()

	const onClose = () => {
		closeDrawer()
		formik.resetForm()
	}

	const loadData = async (id: string) => {
		const response = await professionalServices.getProfessionalyId(id)
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
				await professionalServices.updateProfessional(data)
			} else {
				await professionalServices.createProfessional(data)
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
		)
	})

	const formik = useFormik({
		initialValues: {
			Name: ''
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
								<h3>
									{messages['add-professional'].toString()}
								</h3>
							</Grid>
						</Grid>
						<Grid container item direction="row">
							<Grid item sx={{ maxWidth: '100%', width: 660 }}>
								<TextField
									id="helperText={formik.errors.Address}"
									name="Name"
									label={messages['name'].toString()}
									variant="outlined"
									fullWidth
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.Name}
									error={Boolean(formik.errors.Name)}
									helperText={formik.errors.Name}
								/>
							</Grid>
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

export default AddProfessionalForm
