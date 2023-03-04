import { IRoute } from '~/interfaces/route.interface'
import AddProfessional from '../components/List'

const routes: IRoute[] = [
	{
		path: '/addprofessional',
		title: 'AddProfessional',
		element: AddProfessional,
		authenticated: true,
		hideTitle: false,
		navigation: true
	}
]

export default routes
