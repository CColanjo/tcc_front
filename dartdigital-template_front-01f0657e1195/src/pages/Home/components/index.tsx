import { Button, Container } from '@mui/material'
import { GridRenderCellParams } from '@mui/x-data-grid'
import { useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import { DrawerHandles } from '~/components/Drawer'
import Table from '~/components/Table'
import EditIcon from '@mui/icons-material/Edit'
import moment from 'moment'
import { Filter } from '../models'

const HomePage = () => {
	const drawerRef = useRef<DrawerHandles>(null)
	const [, setId] = useState('')

	const openDrawer = () => {
		drawerRef.current?.toggleDrawer()
	}
	const filter = useState<Filter>()

	const { messages } = useIntl()

	const fireAction = (id: string) => {
		setId(id)
	}

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
		},
		{
			field: 'action',
			headerName: 'Action',
			type: 'actions',
			headerAlign: 'left',
			renderCell: (params: GridRenderCellParams<string>) => (
				<Button
					onClick={() => {
						fireAction(params.row.Id)
					}}
				>
					{' '}
					<EditIcon />
				</Button>
			)
		}
	]

	return (
		<Container>
			<h1>{messages['schedule-daily'].toString()}</h1>
			<div className="button-action">
				<Button
					variant="contained"
					onClick={() => {
						openDrawer()
					}}
				>
					{messages['register'].toString()}
				</Button>
			</div>
			<Table
				url={'schedules/paginated'}
				columns={columns}
				filter={filter}
			></Table>
		</Container>
	)
}

export default HomePage
