/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '~/services/api'

const loginServices = {
	forgotPassword: (data: any) => {
		return api.get('/authentication/forgot-password?user=' + data)
	}
}
export default loginServices
