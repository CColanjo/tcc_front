import React from 'react'

export interface IMenu {
	icon: React.ReactNode
	idTitle: string

	active?: boolean
	path?: string
	onClick?: () => void
}
