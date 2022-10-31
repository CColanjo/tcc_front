import { useContext } from 'react'
import { LoadingContext } from '~/providers/loading'

export const useLoading = () => {
	const loading = useContext(LoadingContext)
	return loading
}
