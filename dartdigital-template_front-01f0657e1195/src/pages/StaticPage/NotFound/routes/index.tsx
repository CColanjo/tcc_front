import { IRoute } from '~/interfaces/route.interface'
import NotFound from '..'

const routes: IRoute[] = [
	{
		path: '/not-found',
		title: 'NotFound',
		element: NotFound,
		authenticated: false,
		hideTitle: false
	}
]

export default routes
