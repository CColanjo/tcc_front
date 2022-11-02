import { IRoute } from '~/interfaces/route.interface'
import ChangePassword from '~/pages/ChangePassword/Components'

const routes: IRoute[] = [
	{
		path: '/changepassword',
		title: 'ChangePassword',
		element: ChangePassword,
		authenticated: true,
		hideTitle: false,
		navigation: true
	}
]

export default routes
