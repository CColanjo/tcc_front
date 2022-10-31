import { IRoute } from '~/interfaces/route.interface'

import AddUser from '../components/List'

const routes: IRoute[] = [
	{
		path: '/adduser',
		title: 'AddUser',
		element: AddUser,
		authenticated: false,
		hideTitle: false,
		navigation: true
	}
]

export default routes
