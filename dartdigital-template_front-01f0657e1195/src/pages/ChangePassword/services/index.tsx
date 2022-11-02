/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '~/services/api'

const changePasswordServices = {
	changePassword: (data: any) => {
		return api.put('/authentication/change-password', data)
	}
}
export default changePasswordServices
