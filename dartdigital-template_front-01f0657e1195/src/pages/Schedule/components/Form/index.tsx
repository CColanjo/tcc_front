/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import {
	Button,
	Container,
	Divider,
	Grid,
	List,
	ListItem,
	ListItemText,
	TextField,
	Typography
} from '@mui/material'
import React, { Fragment, Ref, useEffect, useState } from 'react'
import Drawer, { DrawerHandles } from '~/components/Drawer'
import { useIntl } from 'react-intl'
import MenuItem from '@mui/material/MenuItem'
import AutoDeleteIcon from '@mui/icons-material/AutoDelete'
import scheduleServices from '../../services'
import { Client, Schedule } from '../../models'
import { toastMessages } from '~/components'
import { useFormik } from 'formik'
import { object, string } from 'yup'
import moment from 'moment'

type AddScheduleFormPros = {
	drawerRef: Ref<DrawerHandles>
	openDrawer: () => void
	closeDrawer: () => void
	id: string
	setRefresh: React.Dispatch<React.SetStateAction<boolean>>
}

const AddScheduleForm = ({
	drawerRef,
	closeDrawer,
	openDrawer,
	id,
	setRefresh
}: AddScheduleFormPros) => {
	const { messages } = useIntl()
	const [clients, setClients] = useState<Client[]>([])
	const [schedules, setSchedules] = useState<Schedule[]>([])

	const onClose = () => {
		setSchedules([])
		formik.resetForm()
		closeDrawer()
		setRefresh((refresh) => !refresh)
	}

	const load = async (id: string) => {
		const response = await scheduleServices.getScheduleById(id)
		const { data } = response
		formik.setValues(data)
		loadSchedules(data.scheduleDate)
		openDrawer()
	}

	const loadClients = async () => {
		const response = await scheduleServices.getAllClients()
		const { data } = response
		setClients(data)
	}

	const loadSchedules = async (value: any) => {
		const response = await scheduleServices.getAllSchedule()
		const { data } = response
		const dataFiltered = data.filter((schedule: any) => {
			return (
				moment(schedule.scheduleDate).format('DD/MM/YYYY') ==
				moment(value).format('DD/MM/YYYY')
			)
		})
		setSchedules(dataFiltered)
	}

	const disableSchedule = async (id: number, value: any) => {
		await scheduleServices.disabledSchedule(id)
		loadSchedules(value)
	}

	useEffect(() => {
		loadClients()
	}, [])

	useEffect(() => {
		if (id) {
			load(id)
		}
	}, [id])

	const onSubmit = async (data: any) => {
		try {
			if (id) {
				data.id = id
				await scheduleServices.updateSchedule(data)
			} else {
				const client = clients.filter(
					(value) => data.clientId == value.id
				)
				data = { ...data, nameClient: client[0].name, willAttend: true }
				await scheduleServices.createSchedule(data)
			}
			toastMessages.success(messages['register-sucess'].toString())
			onClose()
			setRefresh((refresh) => !refresh)
		} catch (err) {
			console.log(err)
		}
	}

	const inputProps = {
		someDate: '10-10-2022 8:00'
	}

	const validationSchema = object({
		clientId: string().required(
			messages['error.validation.required-fields'].toString()
		),
		scheduleDate: string().required(
			messages['error.validation.required-fields'].toString()
		)
	})

	const formik = useFormik({
		initialValues: {
			clientId: '',
			scheduleDate: '',
			willAtend: ''
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
								<h3>{messages['add-schedule'].toString()}</h3>
							</Grid>
						</Grid>
						<Grid container item direction="row" spacing={2}>
							<Grid item sx={{ maxWidth: '100%', width: 660 }}>
								<TextField
									id="clientId"
									name="clientId"
									value={formik.values.clientId}
									onChange={formik.handleChange}
									select
									variant="outlined"
									label={messages['client'].toString()}
									style={{ width: '100%' }}
								>
									{clients.map((make, index) => (
										<MenuItem key={index} value={make.id}>
											{make.name}
										</MenuItem>
									))}
									error={Boolean(formik.errors.clientId)}
								</TextField>
							</Grid>
							<Grid item>
								<TextField
									id="scheduleDate"
									name="scheduleDate"
									type="datetime-local"
									InputLabelProps={{ shrink: true }}
									label={messages['date'].toString()}
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									defaultValue={inputProps.someDate}
									value={formik.values.scheduleDate}
									error={Boolean(formik.errors.scheduleDate)}
								/>
							</Grid>
							<Grid item>
								<Button
									variant="contained"
									onClick={() => {
										loadSchedules(
											formik.values.scheduleDate
										)
									}}
								>
									{messages[
										'label_button_search_date'
									].toString()}
								</Button>
							</Grid>
						</Grid>
						<Grid container item direction="row">
							<Grid item sx={{ maxWidth: '100%', width: 660 }}>
								<h3>{messages['schedule-day'].toString()}</h3>
								<List
									sx={{
										width: '100%',
										maxWidth: '100%',
										bgcolor: 'background.paper',
										overflowY: 'scroll',
										maxHeight: '40vh'
									}}
								>
									{schedules.map((value) => (
										<>
											{value.willAttend && (
												<>
													<ListItem alignItems="flex-start">
														<ListItemText
															primary={moment(
																value.scheduleDate
															).format(
																'DD/MM/YYYY HH:mm'
															)}
															secondary={
																<Fragment>
																	<Typography
																		sx={{
																			display:
																				'inline'
																		}}
																		component="span"
																		variant="body2"
																		color="text.primary"
																	>
																		{
																			value.nameClient
																		}
																	</Typography>
																</Fragment>
															}
														/>
														<Button
															onClick={() => {
																disableSchedule(
																	value.id,
																	value.scheduleDate
																)
															}}
														>
															<AutoDeleteIcon />
														</Button>
													</ListItem>
													<Divider component="li" />
												</>
											)}
										</>
									))}
								</List>
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

export default AddScheduleForm
