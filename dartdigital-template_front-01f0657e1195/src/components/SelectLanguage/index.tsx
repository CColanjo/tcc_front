import { useIntl as useReactIntl } from 'react-intl'

import { SelectChangeEvent } from '@mui/material'

import { useIntl } from '~/hooks'
import { DropdownMenuStylesProps } from '~/utils/common-styles-props'

import { StyledMenuItem, StyledSelect } from './styles'

import BRflag from '@/assets/images/flags/br.png'
import USflag from '@/assets/images/flags/usa.png'

const SelectLanguage = () => {
	const intl = {
		...useIntl(),
		...useReactIntl()
	}

	const handleChangeLanguage = (event: SelectChangeEvent<unknown>) => {
		intl.setLocale(event.target.value as string)
	}

	const selectedLanguage = intl.formatMessage({
		id: 'locale'
	})

	return (
		<StyledSelect
			defaultValue={selectedLanguage}
			IconComponent={() => <></>}
			onChange={handleChangeLanguage}
			MenuProps={{
				PaperProps: DropdownMenuStylesProps(1.5)
			}}
		>
			<StyledMenuItem value="pt-BR" className="menu-intl">
				<img src={BRflag} />
			</StyledMenuItem>
			<StyledMenuItem value="en-US" className="menu-intl">
				<img src={USflag} />
			</StyledMenuItem>
		</StyledSelect>
	)
}
export default SelectLanguage
