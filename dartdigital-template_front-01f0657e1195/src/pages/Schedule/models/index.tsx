export interface Client {
	id: number
	name: string
}

export interface Schedule {
	id: number
	clientId: number
	nameClient: string
	scheduleDate: string
	willAttend: boolean
}

export type Filter = {
	nameClient: string
	date: string
}
