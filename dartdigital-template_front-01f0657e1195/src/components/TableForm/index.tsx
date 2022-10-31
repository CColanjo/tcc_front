import { GridColDef, GridRowsProp } from '@mui/x-data-grid'
import { useIntl } from 'react-intl'
import { useBreakpoint } from '~/hooks'
import TableCard from '../TableCard'
import { StyledDataGrid } from './styles'

type TableProps = {
	dataSource: GridRowsProp
	columns: GridColDef[]
}

const Table = (props: TableProps) => {
	const { dataSource, columns } = props

	const intl = useIntl()
	const { messages } = intl
	const { md } = useBreakpoint()

	return (
		<>
			{!md ? (
				<TableCard columns={columns} rows={dataSource} />
			) : (
				<div style={{ height: '350px' }}>
					<StyledDataGrid
						localeText={{
							noRowsLabel: '',
							columnHeaderSortIconLabel:
								messages['table_order_table'].toString()
						}}
						rows={dataSource}
						columns={columns}
						sx={{ border: 'none' }}
						hideFooterPagination
						hideFooter
						disableColumnMenu={true}
						disableSelectionOnClick={true}
						disableVirtualization={true}
					/>
				</div>
			)}
		</>
	)
}

export default Table
