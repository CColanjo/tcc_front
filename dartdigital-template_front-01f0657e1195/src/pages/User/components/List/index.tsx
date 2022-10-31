import { Button, Container, Grid } from '@mui/material'
import { GridRenderCellParams } from '@mui/x-data-grid'
import { useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import { DrawerHandles } from '~/components/Drawer'
import Table from '~/components/Table'
import UserForm from '../Form'
import EditIcon from '@mui/icons-material/Edit'
import './styles.scss'
import { Filter } from '../../models'
import userServices from '../../services'
import AutoDeleteIcon from '@mui/icons-material/AutoDelete'

const AddUser = () => {
	const [id, setId] = useState('')
	const drawerRef = useRef<DrawerHandles>(null)
	const { messages } = useIntl()
	const filter = useState<Filter>()
	const [refresh, setRefresh] = useState<boolean>(false)

	const openDrawer = () => {
		drawerRef.current?.toggleDrawer()
	}

	const closeDrawer = () => {
		drawerRef.current?.toggleDrawer()
		setId('')
	}

	const fireAction = (id: string) => {
		setId(id)
	}

	const disableUser = async (id: number) => {
		await userServices.disable(id)
	}

	const columns = [
		{
			field: 'username',
			headerName: messages['user'].toString(),
			align: 'left',
			headerAlign: 'left',
			flex: 2
		},
		{
			field: 'action',
			headerName: 'Action',
			type: 'actions',
			headerAlign: 'left',
			flex: 1,
			renderCell: (params: GridRenderCellParams<string>) => (
				<Grid container item direction="row" spacing={2}>
					<Grid item>
						<Button
							onClick={() => {
								fireAction(params.row.id)
							}}
						>
							{' '}
							<EditIcon />
						</Button>
					</Grid>
					<Grid item>
						<Button
							onClick={() => {
								disableUser(params.row.id)
							}}
						>
							{' '}
							<AutoDeleteIcon />
						</Button>
					</Grid>
				</Grid>
			)
		}
	]

	return (
		<Container>
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
				url={'users/paginated'}
				columns={columns}
				filter={filter}
				setRefresh={refresh}
			></Table>
			<UserForm
				drawerRef={drawerRef}
				closeDrawer={closeDrawer}
				openDrawer={openDrawer}
				id={id}
				setRefresh={setRefresh}
			/>
		</Container>
	)
}

export default AddUser