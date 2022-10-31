import { IRoute } from '~/interfaces/route.interface'

import LoginPage from '..'

const routes: IRoute[] = [
	{
		path: '/login',
		title: 'LoginPage',
		element: LoginPage,
		authenticated: false,
		hideTitle: false
	}
]

export default routes
