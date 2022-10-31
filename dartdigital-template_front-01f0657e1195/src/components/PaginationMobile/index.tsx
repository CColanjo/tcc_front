import { StyledPagination } from './styles'
import { Button } from '@mui/material'
import { useIntl } from 'react-intl'

type PaginationProps = {
	current: number
	pageSize: number
	totalRecords: number
	onChange: ((page: number, pageSize: number) => void) | undefined
}

const PaginationMobile = ({
	current,
	pageSize,
	totalRecords,
	onChange
}: PaginationProps) => {
	const { messages } = useIntl()

	const renderButtons = (
		page: number,
		type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next',
		originalElement: React.ReactNode
	) => {
		if (type === 'prev') {
			return <Button variant="outlined">{messages['previous']}</Button>
		} else if (type === 'next') {
			return <Button variant="outlined">{messages['next']}</Button>
		}
		return originalElement
	}

	return (
		<StyledPagination
			simple
			current={current}
			pageSize={pageSize}
			total={totalRecords}
			itemRender={renderButtons}
			onChange={onChange}
		/>
	)
}
export default PaginationMobile
