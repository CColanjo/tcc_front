import { useContext } from 'react'
import { BreakpointContext } from '~/providers/breakpoint'

export const useBreakpoint = () => {
	const breakpoint = useContext(BreakpointContext)
	return breakpoint
}
