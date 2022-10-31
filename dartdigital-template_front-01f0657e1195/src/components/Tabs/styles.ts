import { Tab, styled, css } from '@mui/material'
import { TabList } from '@mui/lab'
import theme from '~/styles/themes/default.theme'

type TabStyle = {
	borderRadius: string
}

const { palette } = theme

export const StyledTabList = styled(TabList)`
	width: 253px !important;
	background-color: #fff;
	border-radius: 4px;

	.MuiTabs-indicator {
		position: unset;
		background-color: transparent;
	}

	.Mui-selected {
		border-radius: 4;
		background-color: ${palette.seaBlue.main};
		color: #fff !important;
		transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
	}
`

export const StyledTab = styled(Tab)<TabStyle>`
	${(props) => css`
		border-radius: ${props.borderRadius};
	`}

	background-color: #fff;
	color: #575757;
	width: 126px;
	height: 40px;
`
