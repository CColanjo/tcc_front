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

export interface Professional {
	Id: number
	Name: string
}

export type Filter = {
	NameClient: string
	Date: string
}
