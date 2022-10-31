/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { GridRowsProp } from '@mui/x-data-grid'
import { useCallback, useEffect, useState } from 'react'
import { useBreakpoint } from '~/hooks'

import api from '~/services/api'
import qs from 'qs'
import moment from 'moment'

import { StyledDataGrid } from './styles'
import TableCard from '../TableCard'
import PaginationMobile from '../PaginationMobile'
import { useIntl } from 'react-intl'

type TableProps = {
	filter: any
	url: string
	columns: any
	setRefresh?: boolean
}

const Table = (props: TableProps) => {
	const { filter, url, columns, setRefresh } = props
	const intl = useIntl()
	const { messages } = intl

	const [firstLoad, setFirstLoad] = useState(true)
	const [dataSource, setDataSource] = useState<GridRowsProp>([])
	const [totalRecords, setTotalRecords] = useState(0)

	const [pagination, setPagination] = useState({
		pageNumber: 1,
		pageSize: 10
	})

	const { md } = useBreakpoint()

	const getDataSource = useCallback(async (filter, pageNumber, pageSize) => {
		const params = filter
			? Object.entries(filter).reduce((params, [key, value]) => {
					if (value !== undefined) {
						return {
							...params,
							[key]: value
						}
					}

					return params
			  }, {})
			: {}

		const response = await api.get(url, {
			params: { ...params, pageNumber, pageSize },
			paramsSerializer(params) {
				return qs.stringify(params, { arrayFormat: 'repeat' })
			}
		})

		const { data } = response

		if (data) {
			setTotalRecords(data.totalRecords)
		}

		if (data.content) {
			setDataSource(
				data.content.map((item: any) => ({
					...item,
					id: item.officeId ?? Math.random(),
					date: moment(data.date).format('DD/MM/YYYY')
				}))
			)
		} else {
			setDataSource(data)
		}
	}, [])

	const onChangePage = (current: number, pageSize?: number) => {
		setPagination({ pageNumber: current, pageSize: pageSize ?? 0 })
	}

	useEffect(() => {
		const { pageSize } = pagination

		getDataSource(filter, 1, pageSize)

		if (firstLoad) setFirstLoad(false)

		setPagination((pagination) => ({
			pageNumber: 1,
			pageSize: pagination.pageSize,
			fromFilter: true
		}))
	}, [filter, setRefresh])

	useEffect(() => {
		const { pageNumber, pageSize } = pagination

		if (firstLoad) return

		getDataSource(filter, pageNumber, pageSize)
	}, [pagination])

	return (
		<div>
			{!md ? (
				<>
					<TableCard columns={columns} rows={dataSource} />
					<PaginationMobile
						current={pagination.pageNumber}
						pageSize={pagination.pageSize}
						totalRecords={totalRecords}
						onChange={onChangePage}
					/>
				</>
			) : (
				<StyledDataGrid
					localeText={{
						noRowsLabel: messages['no_results'].toString()
					}}
					rows={dataSource}
					columns={columns}
					rowCount={totalRecords}
					onPageChange={(page: number) => {
						onChangePage(page + 1, pagination.pageSize)
					}}
					sx={{ border: 'none', height: 'calc(100vh - 200px)' }}
					disableColumnMenu={true}
					disableSelectionOnClick={true}
					pageSize={10}
					autoPageSize={true}
					paginationMode={'server'}
				/>
			)}
		</div>
	)
}

export default Table
