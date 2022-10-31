import { Grid, Typography } from '@mui/material'
import { GridRowsProp } from '@mui/x-data-grid'
import EmptyContent from '../Empty'
import CardOutlined from '../Card'
/* eslint-disable @typescript-eslint/no-explicit-any */

type TableCardProps = {
	rows: GridRowsProp
	columns: any
}

const TableCard = ({ rows, columns }: TableCardProps) => {
	return (
		<>
			{rows ? (
				<>
					{rows.map((data, index) => (
						<CardOutlined key={index} margin={'15px 0 15px 0'}>
							<>
								{columns.map((column: any, index: number) => {
									return (
										<Grid
											direction="row"
											container
											spacing={2}
											key={index}
											sx={{
												padding: '10px',
												borderBottom: '1px solid #ddd'
											}}
										>
											<Grid item xs={6}>
												{column.headerName && (
													<Typography variant="subtitle2">
														{column.headerName}
													</Typography>
												)}
											</Grid>
											<Grid item xs={6}>
												<Typography
													variant="body2"
													component={'span'}
												>
													{column.renderCell
														? column.renderCell({
																value: data[
																	column.field
																],
																id: data['id'],
																employee:
																	data[
																		'employee'
																	],
																code: data[
																	'code'
																],
																competenceId:
																	data[
																		'competenceId'
																	],
																leaderEvaluation:
																	data[
																		'leaderEvaluation'
																	],
																ledEvaluation:
																	data[
																		'ledEvaluation'
																	],
																maturityId:
																	data[
																		'maturityId'
																	],
																employeeId:
																	data[
																		'employeeId'
																	],
																randomCompetence:
																	data[
																		'randomCompetence'
																	],
																status: data[
																	'status'
																]
														  })
														: data[
																column.field?.toString()
														  ]}
												</Typography>
											</Grid>
										</Grid>
									)
								})}
							</>
						</CardOutlined>
					))}
				</>
			) : (
				<EmptyContent />
			)}
		</>
	)
}
export default TableCard
