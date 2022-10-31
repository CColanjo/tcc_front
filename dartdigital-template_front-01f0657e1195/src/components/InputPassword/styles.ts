import { SxProps, Theme } from '@mui/material'

export const renderInputIconStyles = (clickable: boolean): SxProps<Theme> => {
	return {
		cursor: clickable ? 'pointer' : 'default',
		':hover': clickable
			? {
					opacity: '0.75'
			  }
			: {}
	}
}
