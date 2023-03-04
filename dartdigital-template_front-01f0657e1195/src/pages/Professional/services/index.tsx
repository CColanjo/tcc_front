/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '~/services/api'

const professionalServices = {
	createProfessional: (data: any) => {
		return api.post('/professioanl', data)
	},
	getProfessionalyId: async (id: string) => {
		return api.get('/professional?id=' + id)
	},
	getAllProfessional: async () => {
		return api.get('/professionals')
	},
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	updateProfessional: async (data: any) => {
		return api.put('/professional', data)
	}
}
export default professionalServices
