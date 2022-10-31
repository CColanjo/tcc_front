import { IRoute } from '~/interfaces/route.interface'
import AddSchedule from '../components/List'

const routes: IRoute[] = [
	{
		path: '/schedule',
		title: 'Schedule',
		element: AddSchedule,
		authenticated: false,
		hideTitle: false,
		navigation: true
	}
]

export default routes
