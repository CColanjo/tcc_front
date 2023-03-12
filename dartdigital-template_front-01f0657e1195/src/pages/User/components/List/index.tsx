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
import { useAuth } from '~/hooks/auth'
import CheckIcon from '@mui/icons-material/Check'

const AddUser = () => {
	const [id, setId] = useState('')
	const drawerRef = useRef<DrawerHandles>(null)
	const { messages } = useIntl()
	const filter = useState<Filter>()
	const [refresh, setRefresh] = useState<boolean>(false)
	const auth = useAuth()
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
		setRefresh((refresh) => !refresh)
	}

	const activeUser = async (id: number) => {
		await userServices.active(id)
		setRefresh((refresh) => !refresh)
	}

	const columns = [
		{
			field: 'Username',
			headerName: messages['user'].toString(),
			align: 'left',
			headerAlign: 'left',
			flex: 2
		},
		{
			field: 'Active',
			headerName: messages['active'].toString(),
			align: 'left',
			headerAlign: 'left',
			flex: 2,
			renderCell: (params: GridRenderCellParams<string>) =>
				params.row.Active == true ? 'Sim' : 'Não'
		},
		{
			field: 'action',
			headerName: 'Action',
			type: 'actions',
			headerAlign: 'left',
			flex: 3,
			renderCell: (params: GridRenderCellParams<string>) => (
				<Grid container item direction="row" spacing={2}>
					<Grid item xs={3}>
						{auth.isAdmin && (
							<Button
								onClick={() => {
									fireAction(params.row.Id)
								}}
							>
								{' '}
								<EditIcon />
							</Button>
						)}
					</Grid>
					<Grid item xs={3}>
						{auth.isAdmin && (
							<Button
								disabled={params.row.Active ? false : true}
								onClick={() => {
									disableUser(params.row.Id)
								}}
							>
								{' '}
								<AutoDeleteIcon />
							</Button>
						)}
					</Grid>
					<Grid item xs={3}>
						{auth.isAdmin && (
							<Button
								disabled={params.row.Active ? true : false}
								onClick={() => {
									activeUser(params.row.Id)
								}}
							>
								{' '}
								<CheckIcon />
							</Button>
						)}
					</Grid>
				</Grid>
			)
		}
	]

	return (
		<Container>
			<h1>{messages['add-user'].toString()}</h1>
			{auth.isAdmin && (
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
			)}
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
