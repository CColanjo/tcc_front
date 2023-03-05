/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '~/services/api'

const scheduleServices = {
	createSchedule: (data: any) => {
		return api.post('/schedule', data)
	},
	getScheduleById: async (id: string) => {
		return api.get('/schedule?id=' + id)
	},
	getAllSchedule: async () => {
		return api.get('/schedules')
	},
	getAllScheduleByData: async (scheduleDate: any) => {
		return api.get('/schedules/data?scheduleDate=' + scheduleDate)
	},
	getAllClients: async () => {
		return api.get('/clients')
	},
	getAllProfessionals: async () => {
		return api.get('/professionals')
	},
	disabledSchedule: async (id: number) => {
		return api.put('schedule/disable?id=' + id)
	}
}
export default scheduleServices
