import { Container } from '@mui/material'
import { GridRenderCellParams } from '@mui/x-data-grid'
import { useState } from 'react'
import { useIntl } from 'react-intl'
import Table from '~/components/Table'
import moment from 'moment'
import { Filter } from '../models'
import BarChartComponent from '~/components/BarChartComponent'

const HomePage = () => {
	const filter = useState<Filter>()

	const { messages } = useIntl()

	const columns = [
		{
			field: 'NameClient',
			headerName: messages['client'].toString(),
			align: 'left',
			headerAlign: 'left',
			flex: 2
		},
		{
			field: 'NameProfessional',
			headerName: messages['professional'].toString(),
			align: 'left',
			headerAlign: 'left',
			flex: 2
		},
		{
			field: 'ScheduleDate',
			headerName: messages['date'].toString(),
			align: 'left',
			headerAlign: 'left',
			flex: 2,
			renderCell: (params: GridRenderCellParams<string>) =>
				moment(params.row.ScheduleDate).format('DD/MM/YYYY HH:mm')
		}
	]

	return (
		<Container>
			<h1>{messages['schedule-daily'].toString()}</h1>
			<Table
				url={'schedules/paginatedbydate'}
				columns={columns}
				filter={filter}
			></Table>
			<h1>{messages['schedule-year'].toString()}</h1>
			<BarChartComponent
				apiURL="schedules/GetAllSchedulesWasAttend"
				width="80%"
				height={400}
				barColor="#F58226"
			/>
		</Container>
	)
}

export default HomePage
