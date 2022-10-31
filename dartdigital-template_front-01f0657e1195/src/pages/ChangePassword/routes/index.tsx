import { IRoute } from '~/interfaces/route.interface'
import ChangePassword from '~/pages/ChangePassword/Components'

const routes: IRoute[] = [
	{
		path: '/changepassword',
		title: 'ChangePassword',
		element: ChangePassword,
		authenticated: false,
		hideTitle: false,
		navigation: true
	}
]

export default routes
