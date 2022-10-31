import { createContext, useCallback, useEffect } from 'react'
import { CustomFormats, IntlProvider as ReactIntlProvider } from 'react-intl'

import 'moment/locale/pt'
import moment from 'moment'

import resources from '~/intl'
import { useLocalStorage } from '~/hooks'

interface IntlContextProps {
	locale: string
	setLocale: (locale: 'pt-BR' | 'en-US' | string) => void
}

interface IntlProviderProps {
	children: React.ReactNode
}

export const IntlContext = createContext<IntlContextProps>(
	{} as IntlContextProps
)

const IntlProvider = ({ children }: IntlProviderProps) => {
	const [storageLocale, setStorageLocale] = useLocalStorage('@DART:locale')

	const setLocale = useCallback(
		(locale: 'pt-BR' | 'en-US' | string) => {
			setStorageLocale(locale)
		},
		[setStorageLocale]
	)

	useEffect(() => {
		if (storageLocale) {
			// moment.updateLocale(storageLocale, moment.localeData(storageLocale)) // TODO - Verificar se é necessário para formatar data ou se já funciona com a linha de baixo
			moment.updateLocale(storageLocale, null) // TODO
			moment.locale(storageLocale)
		} else {
			setLocale(process.env.DEFAULT_LANGUAGE)
		}
	}, [setLocale, storageLocale])

	const localeMessages =
		storageLocale === 'en-US' ? resources.enUS : resources.ptBR

	const formats: CustomFormats = {
		number: {
			currency: {
				style: 'currency',
				currency: localeMessages.currency
			}
		}
	}

	const exports: IntlContextProps = {
		locale: storageLocale,
		setLocale: setLocale
	}

	return (
		storageLocale && (
			<IntlContext.Provider value={exports}>
				<ReactIntlProvider
					locale={storageLocale}
					messages={localeMessages}
					formats={formats}
				>
					{children}
				</ReactIntlProvider>
			</IntlContext.Provider>
		)
	)
}

export default IntlProvider
