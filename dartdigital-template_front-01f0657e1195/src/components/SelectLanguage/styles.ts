import { MenuItem, Select, styled } from '@mui/material'

export const StyledSelect = styled(Select)`
	cursor: default !important;

	.MuiSelect-select {
		color: white;
		padding: 0px !important;
		display: flex;

		&:hover {
			opacity: 0.75;
		}
	}

	fieldset {
		border: none;
		color: white;
	}

	svg {
		color: white;
	}

	img {
		width: 24px;
		height: 24px;
	}
`

export const StyledMenuItem = styled(MenuItem)`
	img {
		width: 24px;
		height: 24px;
	}
`
