import { Button, Container } from '@mui/material'
import { GridRenderCellParams } from '@mui/x-data-grid'
import { useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import { DrawerHandles } from '~/components/Drawer'
import Table from '~/components/Table'
import EditIcon from '@mui/icons-material/Edit'
import { Filter } from '../../models'
import AddProfessionalForm from '../Form'
import Download from '~/components/Download'
import { useAuth } from '~/hooks'

const AddProfessional = () => {
	const drawerRef = useRef<DrawerHandles>(null)
	const [refresh, setRefresh] = useState<boolean>(false)
	const auth = useAuth()
	const [id, setId] = useState('')

	const openDrawer = () => {
		drawerRef.current?.toggleDrawer()
	}

	const closeDrawer = () => {
		drawerRef.current?.toggleDrawer()
		setId('')
	}
	const { messages } = useIntl()

	const fireAction = (id: string) => {
		setId(id)
	}

	const filter = useState<Filter>()

	const columns = [
		{
			field: 'Name',
			headerName: messages['professional'].toString(),
			align: 'left',
			headerAlign: 'left',
			flex: 2
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
			<h1>{messages['professional'].toString()}</h1>
			<div className="button-action">
				<Button
					variant="contained"
					onClick={() => {
						openDrawer()
					}}
				>
					{messages['register'].toString()}
				</Button>
				{auth.isAdmin && (
					<Download url="professionals/excel"></Download>
				)}
			</div>
			<Table
				url={'/professionals/paginated'}
				columns={columns}
				filter={filter}
				setRefresh={refresh}
			></Table>
			<AddProfessionalForm
				drawerRef={drawerRef}
				closeDrawer={closeDrawer}
				openDrawer={openDrawer}
				id={id}
				setRefresh={setRefresh}
			/>
		</Container>
	)
}

export default AddProfessional
