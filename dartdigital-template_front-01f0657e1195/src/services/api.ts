import axios, { AxiosError } from 'axios'
import { toastMessages } from '~/components'
import { createIntl, IntlShape } from 'react-intl'

const baseURL = process.env.API_BASE

const api = axios.create({
	baseURL
})

const intlPtBR = createIntl({
	locale: 'pt-BR',
	messages: {
		not_found: 'Recurso não encontrado',
		internal_error: 'Erro Interno',
		session_expired: 'Sessão expirada, faça login novamente'
	}
})

const intlEnUS = createIntl({
	locale: 'en-US',
	messages: {
		not_found: 'Resource not found',
		internal_error: 'Internal Error',
		session_expired: 'Session expired, try to login again'
	}
})

const errorMessages: Record<string, IntlShape> = {
	'pt-BR': intlPtBR,
	'en-US': intlEnUS
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function resolveErrors(data: any) {
	if (data.errors) {
		const errorList = data.errors

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		errorList.map((errorObj: any) => {
			toastMessages.error(errorObj.error)
		})
	} else if (data.message) {
		toastMessages.error(data.message)
	}
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function refreshToken() {
	const response = await api.post('/authentication/oauth/refresh')

	const { token, refreshtoken } = response.data

	localStorage.setItem('@NNUM:token', JSON.stringify(token))
	localStorage.setItem('@NNUM:refresh', JSON.stringify(refreshtoken))

	return
} // TODO - REMOVER SE NAO TIVER REFRESH TOKEN

function signOut(locale: string) {
	const intl = errorMessages[locale]
	const { messages } = intl

	toastMessages.error(messages['session_expired'].toString())

	const keys = ['@DART:user', '@DART:token', '@DART:isAdmin']

	keys.map((key) => {
		localStorage.removeItem(key)
	})

	window.location.href = '/'
}

export const configureInterceptApi = (
	setLoading: (loading: boolean) => void
) => {
	api.interceptors.request.use((config) => {
		const locationStorage = localStorage.getItem('@DART:locale')
		const location = locationStorage
			? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			  JSON.parse(locationStorage!)
			: locationStorage

		const storageToken = localStorage.getItem('@DART:token')

		config.baseURL = `${baseURL}/${location}`

		if (config.url !== '/authentication/oauth' && storageToken) {
			const token = JSON.parse(storageToken)
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			config.headers!.Authorization = `Bearer ${token}`
		}

		setLoading(true)

		return config
	})

	api.interceptors.response.use(
		(response) => {
			setLoading(false)
			return response
		},
		async (error: AxiosError) => {
			const locale: string = JSON.parse(
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				localStorage.getItem('@DART:locale')!
			)

			const intl = errorMessages[locale]
			const { messages } = intl

			setLoading(false)
			const status = error?.response?.status
			const data = error?.response?.data

			switch (status) {
				case 400:
					resolveErrors(data)
					break
				case 401:
					{
						// TODO - Caso haja refresh
						// const oldRefreshToken =
						// 	JSON.parse(localStorage.getItem('@NNUM:refresh')!) ||
						// 	null
						// if (oldRefreshToken) await refreshToken()
						// else {
						// 	signOut(data)
						// 	return
						// }
						resolveErrors(data)
					}
					break
				case 403:
					resolveErrors(data)
					break
				case 498:
					signOut(locale)
					break
				case 404:
					toastMessages.error(messages['not_found'].toString())
					break
				case 500:
					resolveErrors(data)
					break
				default:
					toastMessages.error(messages['internal_error'].toString())
					break
			}

			// eslint-disable-next-line consistent-return
			return Promise.reject(error)
		}
	)
}

export default api
