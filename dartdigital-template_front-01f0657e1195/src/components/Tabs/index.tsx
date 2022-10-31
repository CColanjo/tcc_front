import { SyntheticEvent } from 'react'
import { Box } from '@mui/material'
import { TabContext } from '@mui/lab'
import { StyledTabList, StyledTab } from './styles'
import { MessageFormatElement } from 'react-intl'

type TabsProps = {
	value: string
	itens: TabItem[]
	children: JSX.Element[]
	handleChange: (event: SyntheticEvent, newValue: string) => void
}

type TabItem = {
	value: string
	tab: string | MessageFormatElement[]
	borderRadius: string
}

export default function Tabs({
	itens,
	children,
	value,
	handleChange
}: TabsProps) {
	return (
		<Box sx={{ typography: 'body1' }}>
			<TabContext value={value}>
				<Box>
					<StyledTabList
						onChange={handleChange}
						aria-label="Compatibility Tabs"
					>
						{itens.map((item: TabItem, index: number) => (
							<StyledTab
								label={item.tab}
								value={item.value}
								key={index}
								borderRadius={item.borderRadius}
							/>
						))}
					</StyledTabList>
				</Box>
				{children}
			</TabContext>
		</Box>
	)
}
