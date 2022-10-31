import { RouteProps } from 'react-router-dom'

export interface IRoute extends RouteProps {
	authenticated: boolean | undefined

	path: string

	name?: string
	routeBack?: string
	title?: string

	hideTitle?: boolean
	navigation?: boolean
}
