import { useContext } from 'react'
import { IntlContext } from '~/providers/intl'

export const useIntl = () => {
	const intl = useContext(IntlContext)
	return intl
}
