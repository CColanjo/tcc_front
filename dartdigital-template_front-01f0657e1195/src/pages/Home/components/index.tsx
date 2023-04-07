import { Container } from '@mui/material'
import { GridRenderCellParams } from '@mui/x-data-grid'
import { useState } from 'react'
import { useIntl } from 'react-intl'
import Table from '~/components/Table'
import moment from 'moment'
import { Filter } from '../models'

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
		</Container>
	)
}

export default HomePage
