/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '~/services/api'

const clientServices = {
	createClient: async (data: any) => {
		return api.post('/client', data)
	},
	getClient: async (id: string) => {
		return api.get('/client?id=' + id)
	},
	getAllClients: async () => {
		return api.get('/client')
	},
	updateClient: async (data: any) => {
		return api.put('/client', data)
	}
}
export default clientServices
