import { Navigate, Route, Routes as ReactRoutes } from 'react-router-dom'

import { IRoute } from '~/interfaces/route.interface'
import routes from '~/utils/merge-routes'

import Guard from './Guard'

const Router = () => {
	return (
		<ReactRoutes>
			<Route key="default" path="/" element={<Navigate to="/login" />} />
			{routes.map((route: IRoute) => {
				return (
					<Route
						key={route.path}
						path={route.path}
						element={
							<Guard
								element={route.element}
								authenticated={route.authenticated}
								navigation={route.navigation}
							/>
						}
					/>
				)
			})}
		</ReactRoutes>
	)
}

export default Router
