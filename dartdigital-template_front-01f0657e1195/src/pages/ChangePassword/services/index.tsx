/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '~/services/api'

const changePasswordServices = {
	changePassword: (id: string, data: any) => {
		return api.put('/users/' + id, data)
	}
}
export default changePasswordServices
