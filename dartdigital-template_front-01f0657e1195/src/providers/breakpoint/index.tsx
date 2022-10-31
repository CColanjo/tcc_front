import React, { createContext } from 'react'
import { Theme, useMediaQuery } from '@mui/material'

interface BreakpointContextProps {
	xs: boolean
	sm: boolean
	md: boolean
	lg: boolean
	xl: boolean
}

interface BreakpointProviderProps {
	children: React.ReactNode
}

export const BreakpointContext = createContext<BreakpointContextProps>(
	{} as BreakpointContextProps
)

const BreakpointProvider = ({ children }: BreakpointProviderProps) => {
	const xs = useMediaQuery((theme: Theme) => theme.breakpoints.up('xs'))
	const sm = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'))
	const md = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))
	const lg = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))
	const xl = useMediaQuery((theme: Theme) => theme.breakpoints.up('xl'))

	return (
		<BreakpointContext.Provider
			value={{
				xs: xs,
				sm: sm,
				md: md,
				lg: lg,
				xl: xl
			}}
		>
			{children}
		</BreakpointContext.Provider>
	)
}

export default BreakpointProvider
