import { IRoute } from '~/interfaces/route.interface'

const routesContext = require.context('../pages', true, /.routes./)

const routes: IRoute[] = []

routesContext.keys().forEach((route) => {
	routes.push(...routesContext(route).default)
})

export default routes
