import { useContext } from 'react'
import { AuthContext } from '~/providers/auth'

export const useAuth = () => {
	const auth = useContext(AuthContext)
	return auth
}
