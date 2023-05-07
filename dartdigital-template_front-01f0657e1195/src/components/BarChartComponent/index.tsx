/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from 'react'
import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis
} from 'recharts'
import api from '~/services/api'

interface BarChartComponentProps {
	apiURL: string
	name: string
	width?: string | number
	height?: number
	barColor?: string
}

interface Data {
	Name: string
	Value: number
}

const BarChartComponent: React.FC<BarChartComponentProps> = ({
	apiURL,
	name,
	width = '100%',
	height = 300,
	barColor = '#8884d8'
}) => {
	const [data, setData] = useState<Data[]>([])

	useEffect(() => {
		getDataSource()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const getDataSource = useCallback(async () => {
		const response = await api.get(apiURL)

		const { data } = response
		setData(data)
	}, [])

	return (
		<ResponsiveContainer width={width} height={height}>
			<BarChart data={data}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis
					dataKey="Name"
					tickFormatter={(name) =>
						name.charAt(0).toUpperCase() + name.slice(1)
					}
				/>
				<YAxis />
				<Tooltip
					labelFormatter={(label) =>
						label.charAt(0).toUpperCase() + label.slice(1)
					}
				/>
				<Legend />
				<Bar dataKey="Value" name={name} fill={barColor} />
			</BarChart>
		</ResponsiveContainer>
	)
}

export default BarChartComponent
