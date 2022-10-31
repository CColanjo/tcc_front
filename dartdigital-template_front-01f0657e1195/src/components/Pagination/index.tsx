/* eslint-disable */
import { Fragment, useCallback, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useBreakpoint } from '~/hooks'

import { Grid, MenuItem, TextField } from '@mui/material'

import ReactPagination from 'rc-pagination'
import 'rc-pagination/assets/index.less'

import PaginationMobile from '../PaginationMobile'
import EmptyContent from '../Empty'

import api from '~/services/api'
import qs from 'qs'

//import paginationIntl from './intlPagination'

type PaginationProps = {
	baseURL: string
	filter: any
	render: (values: any) => React.ReactNode
	refresh: boolean
	filterOnLoad?: boolean
}

function Pagination(props: PaginationProps) {
	const { baseURL, filter, render, refresh, filterOnLoad = true } = props

	const { messages } = useIntl()

	const { md } = useBreakpoint()

	const [content, setContent] = useState([])
	const [firstLoad, setFirstLoad] = useState(true)
	const [pageSize, setPageSize] = useState(20)
	const [showEmpty, setShowEmpty] = useState(true)
	const [totalRecords, setTotalRecords] = useState(0)
	const [current, setCurrent] = useState(1)
	const [intlRefresh, setIntlRefresh] = useState(false)

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

		try {
			const response = await api.get(baseURL, {
				params: { ...params, pageNumber, pageSize },
				paramsSerializer(params) {
					return qs.stringify(params, { arrayFormat: 'repeat' })
				}
			})

			const data = response?.data

			if (data) {
				if (data.data) {
					setContent(
						data['data']['content'] &&
							data['data']['content'].length > 0
							? data.data.content
							: []
					)
					setTotalRecords(
						data['data']['totalRecords']
							? data['data']['totalRecords']
							: 0
					)
					setShowEmpty(!data['data']['totalRecords'])
					setCurrent(
						data['data']['totalPages'] > 0 &&
							pageNumber > data['data']['totalPages']
							? data['data']['totalPages']
							: pageNumber
					)
				} else {
					setContent(
						data['content'] && data['content'].length > 0
							? data.content
							: []
					)
					setTotalRecords(
						data['totalRecords'] ? data['totalRecords'] : 0
					)
					setShowEmpty(!data['totalRecords'])
					setCurrent(
						data['totalPages'] > 0 &&
							pageNumber > data['totalPages']
							? data['totalPages']
							: pageNumber
					)
				}
			}
		} catch (err) {
			/* empty */
		}
	
	}, [])

	useEffect(() => {
		if(!filterOnLoad) return
		getDataSource(filter, current, pageSize)
	}, [pageSize, current])

	useEffect(() => {		
		if(!filterOnLoad){			
			setContent([])
			//setShowEmpty(true)			
			return
		} 
		getDataSource(filter, current, pageSize)
	}, [refresh, intlRefresh])

	useEffect(() => {
		if(!filterOnLoad) return
		setIntlRefresh(!intlRefresh)
	}, [messages['language']])

	useEffect(() => {
		if (firstLoad) {
			setFirstLoad(false)
			return
		}

		if(!filterOnLoad) return

		getDataSource(filter, current, pageSize)
	}, [filter])

	useEffect(() => {
		setPageSize(20)
	}, [md])

	const onChange = (current: number, pageSize: number) => {
		setCurrent(current)
		setPageSize(pageSize)
	}

	const SelectField = () => {
		const onChangeSelect = (event: any) => {
			setPageSize(event.target.value)
		}

		return (
			<TextField
				onChange={onChangeSelect}
				value={pageSize}
				size="small"
				sx={{ paddingTop: '2.75px', height: '35px' }}
				select
			>
				<MenuItem key={5} value={5}>
					5
				</MenuItem>
				<MenuItem key={10} value={10}>
					10
				</MenuItem>
				<MenuItem key={20} value={20}>
					20
				</MenuItem>
				<MenuItem key={50} value={50}>
					50
				</MenuItem>
				<MenuItem key={100} value={100}>
					100
				</MenuItem>
			</TextField>
		)
	}

	function calculatePage(pageSize: number, total: number) {
		return Math.floor((total - 1) / pageSize) + 1
	}

	const getLocalePagination = () => {
		const ptBr = {
			items_per_page: '/ página',
			jump_to: 'Vá até',
			jump_to_confirm: 'confirme',
			page: '',

			// Pagination.jsx
			prev_page: 'Página anterior',
			next_page: 'Próxima página',
			prev_5: '5 páginas anteriores',
			next_5: '5 próximas páginas',
			prev_3: '3 páginas anteriores',
			next_3: '3 próximas páginas',
			prevText: 'Proxima',
			nextText: 'Anterior'
		}

		const enUs = {
			items_per_page: '/ page',
			jump_to: 'Go to',
			jump_to_confirm: 'confirm',
			page: '',

			// Pagination.jsx
			prev_page: 'Previous Page',
			next_page: 'Next Page',
			prev_5: 'Previous 5 Pages',
			next_5: 'Next 5 Pages',
			prev_3: 'Previous 3 Pages',
			next_3: 'Next 3 Pages',
			prevText: 'Prev',
			nextText: 'Next'
		}

		switch (messages['language']) {
			case 'pt-BR':
				return ptBr
			case 'en-US':
				return enUs
			default:
				return ptBr
		}
	}

	return (
		<Fragment>
			{!showEmpty ? (
				<Fragment>
					<div style={{ width: '100%', marginBottom: '10px' }}>
						{render(content)}
					</div>
					<Grid container direction="row" justifyContent="center">
						{md && (
							<Fragment>
								<ReactPagination
									locale={getLocalePagination()}
									style={{ padding: '15px' }}
									simple={false}
									defaultPageSize={20}
									current={current}
									onChange={onChange}
									total={totalRecords}
									pageSize={pageSize}
								/>
								<SelectField />
							</Fragment>
						)}

						{!md && pageSize >= 0 && (
							<PaginationMobile
								current={current}
								pageSize={pageSize}
								totalRecords={calculatePage(
									pageSize,
									totalRecords
								)}
								onChange={onChange}
							/>
						)}
					</Grid>
				</Fragment>
			) : (
				<EmptyContent />
			)}
		</Fragment>
	)
}

export default Pagination
