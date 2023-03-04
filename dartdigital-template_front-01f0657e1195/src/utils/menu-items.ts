import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import ScheduleIcon from '@mui/icons-material/Schedule'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline'
import KeyIcon from '@mui/icons-material/Key'
import { IMenu } from '../interfaces/menu.interface'

const menuItems: IMenu[] = [
	{
		icon: DashboardCustomizeOutlinedIcon,
		idTitle: 'dashboard',
		active: true,
		path: '/home'
	},
	{
		icon: ScheduleIcon,
		idTitle: 'add-schedule',
		active: true,
		path: '/schedule'
	},
	{
		icon: PersonAddIcon,
		idTitle: 'add-user',
		active: true,
		path: '/adduser'
	},
	{
		icon: PeopleOutlineIcon,
		idTitle: 'add-client',
		active: true,
		path: '/addclient'
	},
	{
		icon: PeopleOutlineIcon,
		idTitle: 'add-professional',
		active: true,
		path: '/addprofessional'
	},
	{
		icon: KeyIcon,
		idTitle: 'change-password',
		active: true,
		path: '/changePassword'
	}
]

export default menuItems
