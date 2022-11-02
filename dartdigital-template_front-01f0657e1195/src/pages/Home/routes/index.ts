import { IRoute } from '~/interfaces/route.interface'

import HomePage from '..'

const routes: IRoute[] = [
	{
		path: '/home',
		title: 'home',
		element: HomePage,
		authenticated: true,
		hideTitle: false,
		navigation: true
	}
]

export default routes
