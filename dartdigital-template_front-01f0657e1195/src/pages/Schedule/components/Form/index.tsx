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
import { Client, Professional, Schedule } from '../../models'
import { toastMessages } from '~/components'
import { useFormik } from 'formik'
import moment from 'moment'
import { object, string } from 'yup'

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
	const [professionals, setProfessionals] = useState<Professional[]>([])
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
		const client = clients.filter((value) => data.ClientId == value.Id)
		data.ClientId = client[0].Id
		data.ScheduleDate = moment(data.ScheduleDate).format('YYYY-MM-DDTHH:mm')
		formik.setValues(data)
		loadSchedules(data.ScheduleDate)
		openDrawer()
	}

	const loadClients = async () => {
		const response = await scheduleServices.getAllClients()
		const { data } = response
		setClients(data)
	}

	const loadProfessional = async () => {
		const response = await scheduleServices.getAllProfessionals()
		const { data } = response
		setProfessionals(data)
	}

	const loadSchedules = async (value: any) => {
		const response = await scheduleServices.getAllSchedule()
		const { data } = response

		const dataFiltered = data.filter((schedule: any) => {
			return (
				moment(schedule.ScheduleDate).format('DD/MM/YYYY') ==
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
		loadProfessional()
	}, [])

	useEffect(() => {
		if (id) {
			load(id)
		}
	}, [id])

	const onSubmit = async (data: any) => {
		try {
			data = {
				clientId: data.ClientId,
				scheduleDate: data.ScheduleDate,
				willAttend: true,
				professionalId: data.ProfessionalId
			}

			await scheduleServices.createSchedule(data)

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
		ClientId: string().required(
			messages['error.validation.required-fields'].toString()
		),
		ProfessionalId: string().required(
			messages['error.validation.required-fields'].toString()
		),
		ScheduleDate: string().required(
			messages['error.validation.required-fields'].toString()
		)
	})

	const formik = useFormik({
		initialValues: {
			ClientId: '',
			ScheduleDate: '',
			ProfessionalId: '',
			WillAttend: false
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
									id="ClientId"
									name="ClientId"
									value={formik.values.ClientId}
									select
									variant="outlined"
									label={messages['client'].toString()}
									style={{ width: '100%' }}
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									error={Boolean(formik.errors.ClientId)}
									helperText={formik.errors.ClientId}
								>
									{clients.map((make, index) => (
										<MenuItem key={index} value={make.Id}>
											{make.Name}
										</MenuItem>
									))}
								</TextField>
							</Grid>
							<Grid item sx={{ maxWidth: '100%', width: 660 }}>
								<TextField
									id="ProfessionalId"
									name="ProfessionalId"
									value={formik.values.ProfessionalId}
									onChange={formik.handleChange}
									select
									variant="outlined"
									label={messages['professional'].toString()}
									style={{ width: '100%' }}
									error={Boolean(
										formik.errors.ProfessionalId
									)}
									helperText={formik.errors.ProfessionalId}
								>
									{professionals.map((make, index) => (
										<MenuItem key={index} value={make.Id}>
											{make.Name}
										</MenuItem>
									))}
								</TextField>
							</Grid>
							<Grid item>
								<TextField
									id="ScheduleDate"
									name="ScheduleDate"
									type="datetime-local"
									InputLabelProps={{ shrink: true }}
									label={messages['date'].toString()}
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									defaultValue={inputProps.someDate}
									value={formik.values.ScheduleDate}
									error={Boolean(formik.errors.ScheduleDate)}
									helperText={formik.errors.ScheduleDate}
								/>
							</Grid>
							<Grid item>
								<Button
									variant="contained"
									onClick={() => {
										loadSchedules(
											formik.values.ScheduleDate
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
											<ListItem
												key={value.Id}
												alignItems="flex-start"
											>
												{value.WillAttend && (
													<ListItemText
														primary={moment(
															value.ScheduleDate
														).format(
															'DD/MM/YYYY HH:mm'
														)}
														secondary={
															<Fragment>
																<Grid item>
																	<Typography
																		sx={{
																			display:
																				'inline'
																		}}
																		component="span"
																		variant="body2"
																		color="text.primary"
																	>
																		{messages[
																			'client'
																		].toString()}
																		{' - '}
																		{
																			value.NameClient
																		}
																	</Typography>
																</Grid>
																<Grid item>
																	<Typography
																		sx={{
																			display:
																				'inline'
																		}}
																		component="span"
																		variant="body2"
																		color="text.primary"
																	>
																		{messages[
																			'professional'
																		].toString()}
																		{' - '}
																		{
																			value.NameProfessional
																		}
																	</Typography>
																</Grid>
															</Fragment>
														}
													/>
												)}
												<Button
													onClick={() => {
														disableSchedule(
															value.Id,
															value.ScheduleDate
														)
													}}
												>
													<AutoDeleteIcon />
												</Button>
											</ListItem>
											<Divider component="li" />
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
