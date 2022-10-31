import { InputAdornment, TextField, TextFieldProps } from '@mui/material'

import { renderInputIconStyles } from './styles'

type InputIcon = {
	element: React.ReactNode
	clickable?: boolean
	color?: string
	onClick?: () => void
}

type InputProps = {
	preffixIcon?: InputIcon
	suffixIcon?: InputIcon
} & TextFieldProps

export default function Input({
	preffixIcon,
	suffixIcon,
	...props
}: InputProps) {
	const PreffixIconElement = preffixIcon
		? (preffixIcon.element as React.ElementType)
		: null

	const SuffixIconElement = suffixIcon
		? (suffixIcon.element as React.ElementType)
		: null

	return (
		<TextField
			InputProps={{
				startAdornment: PreffixIconElement && preffixIcon && (
					<InputAdornment
						position="start"
						sx={renderInputIconStyles(!!preffixIcon.clickable)}
						onClick={preffixIcon.onClick}
					>
						<PreffixIconElement color={preffixIcon.color} />
					</InputAdornment>
				),
				endAdornment: SuffixIconElement && suffixIcon && (
					<InputAdornment
						position="end"
						sx={renderInputIconStyles(!!suffixIcon.clickable)}
						onClick={suffixIcon.onClick}
					>
						<SuffixIconElement color={suffixIcon.color} />
					</InputAdornment>
				)
			}}
			{...props}
		/>
	)
}
