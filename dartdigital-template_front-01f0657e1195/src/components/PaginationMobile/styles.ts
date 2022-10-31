import { styled } from '@mui/material'
import Pagination from 'rc-pagination'
import 'rc-pagination/assets/index.less'

export const StyledPagination = styled(Pagination)`
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	align-content: center;
	justify-content: space-between;
	align-items: baseline;
	margin-bottom: 20px;
	&:after {
		display: none;
	}

	.rc-pagination-simple-pager {
		font-family: 'Roboto';
	}

	.rc-pagination-simple-pager input {
		font-family: 'Roboto';
		width: 40%;
		background-color: transparent;
		border: 1px solid #d9d9d9;
		border-radius: 4px;
		&:hover {
			background-color: #fff;
		}
	}

	.rc-pagination-prev button:after,
	.rc-pagination-next button:after {
		content: none;
	}
`
