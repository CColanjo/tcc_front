import { IRoute } from '~/interfaces/route.interface'
import AddClient from '../components/List'

const routes: IRoute[] = [
	{
		path: '/addclient',
		title: 'AddClient',
		element: AddClient,
		authenticated: false,
		hideTitle: false,
		navigation: true
	}
]

export default routes
