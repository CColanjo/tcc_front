/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useLocalStorage } from '~/hooks'
import { UserModel } from '~/models/user-model'
import api from '~/services/api'

interface AuthContextProps {
	isLogged: boolean
	user: UserModel
	isLeader: boolean
	isMaster: boolean
	login: (username: string, password: string) => void
	logout: () => void
}

interface AuthProviderProps {
	children: React.ReactNode
}

export const AuthContext = createContext<AuthContextProps>(
	{} as AuthContextProps
)

const AuthProvider = ({ children }: AuthProviderProps) => {
	const navigate = useNavigate()
	const [storageUser, setStorageUser, removeStorageUser] =
		useLocalStorage('@DART:user')
	const [storageToken, setStorageToken, removeStorageToken] =
		useLocalStorage('@DART:token')
	const [storageIsLeader, setStorageIsLeader, removeStorageIsLeader] =
		useLocalStorage('@DART:isLeader')
	const [storageIsMaster, setStorageIsMaster, removeStorageIsMaster] =
		useLocalStorage('@DART:isMaster')

	const [user, setUser] = useState(
		storageUser && storageToken ? storageUser : null
	)

	// const login = useCallback(
	// 	async (user: string, password: string) => {
	// 		try {
	// 			const response = await api.post('/authentication/oauth', {
	// 				username: user,
	// 				password
	// 			})

	// 			const {
	// 				username,
	// 				token,
	// 				refreshtoken,
	// 				created,
	// 				expires,
	// 				windowsAuthentication,
	// 				isleader,
	// 				ismaster
	// 			} = response.data

	// 			setUser({ username })
	// 			setStorageUser({ username })
	// 			setStorageToken(token)
	// 			setStorageIsLeader(isleader)
	// 			setStorageIsMaster(ismaster)
	// 		} catch (error) {
	// 			// TODO - Tratar erro de login
	// 			console.error('Erro ao fazer login', error)
	// 		}
	// 	},
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// 	[setStorageUser]
	// )

	// const logout = useCallback(async () => {
	// 	setUser(null)
	// 	removeStorageUser()
	// 	removeStorageToken()
	// 	removeStorageIsLeader()
	// 	removeStorageIsMaster()
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [removeStorageUser, navigate])

	//IMPLEMENTAR LOGIN E LOGOUT - UTILIZAR O EXEMPLO ACIMA COMO REFERENCIA
	const login = useCallback(
		async (username: string, password: string) => {
			try {
				setStorageUser({ username, password })
				navigate('/home')
			} catch (error) {
				console.error('Erro ao fazer login', error)
			}
		},
		[setStorageUser]
	)

	const logout = useCallback(async () => {
		removeStorageUser()
		navigate('/login')
	}, [removeStorageUser, navigate])

	return (
		<AuthContext.Provider
			value={{
				isLogged: !!user?.username,
				user: storageUser,
				isLeader: storageIsLeader,
				isMaster: storageIsMaster,
				login: login,
				logout: logout
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider
