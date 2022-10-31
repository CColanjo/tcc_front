import React, { createContext, useMemo, useState } from 'react'
import { configureInterceptApi } from '~/services/api'

interface LoadingContextProps {
	loading: boolean
	setLoading: (loading: boolean) => void
}

interface LoadingProviderProps {
	children: React.ReactNode
}

export const LoadingContext = createContext<LoadingContextProps>(
	{} as LoadingContextProps
)

const LoadingProvider = ({ children }: LoadingProviderProps) => {
	const [loading, setLoading] = useState(false)

	useMemo(() => {
		configureInterceptApi(setLoading)
	}, [])

	return (
		<LoadingContext.Provider
			value={{ loading: loading, setLoading: setLoading }}
		>
			{children}
		</LoadingContext.Provider>
	)
}

export default LoadingProvider
