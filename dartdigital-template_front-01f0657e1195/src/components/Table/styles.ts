import { styled } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

export const StyledDataGrid = styled(DataGrid)`
	.MuiDataGrid-columnHeaders {
		border: none;
		margin-top: 10px;
		color: #707070;
	}

	.MuiDataGrid-cell {
		border: none;
		padding-left: 17px;
		color: #575757;
	}

	.MuiDataGrid-columnHeader:focus-within,
	.MuiDataGrid-cell:focus-within {
		outline: none;
	}

	.MuiDataGrid-root > .MuiGrid-container {
		border: none;
	}

	.MuiDataGrid-iconSeparator {
		display: none;
	}

	.MuiDataGrid-row {
		background: white;
		margin-top: 4px;
		border-radius: 4px;
		border: none;
	}
`
