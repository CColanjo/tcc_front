export interface Client {
	Id: number
	Name: string
}

export interface Schedule {
	Id: number
	ClientId: number
	NameClient: string
	ScheduleDate: string
	WillAttend: boolean
}

export type Filter = {
	NameClient: string
	Date: string
}
