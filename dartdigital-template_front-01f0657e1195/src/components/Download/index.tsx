import { Button, Tooltip } from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download'
import api from '~/services/api'

type DownloadProps = {
	url: string
}

const Download = (props: DownloadProps) => {
	const { url } = props
	const fireAction = async () => {
		const response = await api.get(url, {
			responseType: 'blob'
		})
		debugger
		const urlBlob = window.URL.createObjectURL(new Blob([response.data]))

		const link = document.createElement('a')

		link.href = urlBlob

		link.setAttribute('download', 'myfile.xlsx')

		document.body.appendChild(link)

		link.click()

		link.parentNode?.removeChild(link)
	}

	return (
		<>
			<Button
				onClick={() => {
					fireAction()
				}}
			>
				<Tooltip title="Download Excel">
					<DownloadIcon />
				</Tooltip>
			</Button>
		</>
	)
}

export default Download
