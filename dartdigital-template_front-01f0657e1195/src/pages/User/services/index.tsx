/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '~/services/api'

const userServices = {
	createUser: async (data: any) => {
		return api.post('/user', data)
	},
	getUser: async (id: string) => {
		return api.get('/user?id=' + id)
	},
	getAllUser: async () => {
		return api.get('/user')
	},
	updateUser: async (data: any) => {
		return api.put('/user', data)
	},
	disable: async (id: number) => {
		return api.put('user/disable?id=' + id)
	},
	active: async (id: number) => {
		return api.put('user/active?id=' + id)
	}
}
export default userServices
