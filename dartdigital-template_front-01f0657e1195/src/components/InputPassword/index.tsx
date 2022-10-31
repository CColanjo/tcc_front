import { useState } from 'react'

import { TextFieldProps } from '@mui/material'

import { VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material'

import Input from '../Input'

type InputPasswordProps = {
	// empty
} & TextFieldProps

const InputPassword = ({ ...props }: InputPasswordProps) => {
	const [inputType, setInputType] = useState<'text' | 'password'>('password')

	const inputTypeIsPassword = (): boolean => {
		return inputType == 'password'
	}

	return (
		<Input
			type={inputType}
			suffixIcon={{
				element: inputTypeIsPassword()
					? VisibilityOutlined
					: VisibilityOffOutlined,
				color: 'orangeDart',
				clickable: true,
				onClick: () => {
					setInputType(inputTypeIsPassword() ? 'text' : 'password')
				}
			}}
			{...props}
		/>
	)
}
export default InputPassword
