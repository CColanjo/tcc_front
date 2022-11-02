import { Navigate } from 'react-router-dom'

import { useAuth } from '~/hooks'

import { Navigation } from '~/components'

interface GuardProps {
	element: React.ReactNode
	authenticated?: boolean
	navigation?: boolean
}

const Guard = ({ element, authenticated, navigation }: GuardProps) => {
	const auth = useAuth()

	const isLogged = auth.isLogged
	debugger
	if (authenticated && !isLogged) {
		return <Navigate to="/login" />
	} else if (isLogged && !authenticated) {
		return <Navigate to="/home" />
	}

	const Element = element as React.ElementType

	return (
		<>
			{navigation ? (
				<Navigation>
					<Element />
				</Navigation>
			) : (
				<Element />
			)}
		</>
	)
}

export default Guard
