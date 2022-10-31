/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Checkbox, Container, Grid, TextField } from '@mui/material'
import React, { Ref, useEffect } from 'react'
import Drawer, { DrawerHandles } from '~/components/Drawer'
import { useIntl } from 'react-intl'
import { object, string } from 'yup'
import { useFormik } from 'formik'
import userServices from '../../services'
import { toastMessages } from '~/components'
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel'

type UserFormPros = {
	drawerRef: Ref<DrawerHandles>
	openDrawer: () => void
	closeDrawer: () => void
	id: string
	setRefresh: React.Dispatch<React.SetStateAction<boolean>>
}

const UserForm = ({
	drawerRef,
	closeDrawer,
	openDrawer,
	id,
	setRefresh
}: UserFormPros) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { messages } = useIntl()
	const onClose = () => {
		closeDrawer()
		formik.resetForm()
	}

	const loadData = async (id: string) => {
		const response = await userServices.getUser(id)
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
				data.id = id
				await userServices.updateUser(data)
			} else {
				await userServices.createUser(data)
			}
			toastMessages.success(messages['register-sucess'].toString())
			setRefresh((refresh) => !refresh)
			closeDrawer()
		} catch (err) {
			console.log(err)
		}
	}
	const validationSchema = object({
		name: string().required(
			messages['error.validation.required-fields'].toString()
		),
		username: string().required(
			messages['error.validation.required-fields'].toString()
		)
	})

	const formik = useFormik({
		initialValues: {
			name: '',
			cellphone: '',
			email: '',
			username: '',
			isAdmin: false
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
								<h3>{messages['add-user'].toString()}</h3>
							</Grid>
						</Grid>
						<Grid container item direction="row">
							<Grid item sx={{ maxWidth: '100%', width: 660 }}>
								<TextField
									id="name"
									name="name"
									label={messages['name'].toString()}
									variant="outlined"
									fullWidth
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.name}
									error={Boolean(formik.errors.name)}
								/>
							</Grid>
						</Grid>
						<Grid container item direction="row" spacing={2}>
							<Grid item>
								<TextField
									id="username"
									name="username"
									label={messages['user'].toString()}
									variant="outlined"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={Boolean(formik.errors.username)}
									value={formik.values.username}
								/>
							</Grid>
						</Grid>
						<Grid container item direction="row">
							<Grid item>
								<FormControlLabel
									id="isAdmin"
									name="isAdmin"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									control={
										<Checkbox
											checked={formik.values.isAdmin}
										/>
									}
									label={messages['administrator'].toString()}
								></FormControlLabel>
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

export default UserForm
