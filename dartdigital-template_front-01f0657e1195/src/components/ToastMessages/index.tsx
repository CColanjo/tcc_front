import toast from 'react-hot-toast'

const toastMessages = {
	success(message: string) {
		toast.success(message, {
			style: {
				border: '1px solid #27928C',
				padding: '16px',
				color: '#27928C',
				fontFamily: 'Roboto'
			},
			iconTheme: {
				primary: '#27928C',
				secondary: '#FFFAEE'
			}
		})
	},
	error(message: string) {
		toast.error(message, {
			style: {
				border: '1px solid #FF5050',
				padding: '16px',
				color: '#FF5050',
				fontFamily: 'Roboto'
			},
			iconTheme: {
				primary: '#FF5050',
				secondary: '#FFFAEE'
			}
		})
	},
	warning(message: string) {
		toast.custom(message, {
			style: {
				border: '1px solid #CCC5BC',
				padding: '16px',
				color: '#CCC5BC',
				fontFamily: 'Roboto'
			},
			iconTheme: {
				primary: '#CCC5BC',
				secondary: '#FFFAEE'
			}
		})
	},
	info(message: string) {
		toast.custom(message, {
			style: {
				border: '1px solid #2563B8',
				padding: '16px',
				color: '#2563B8',
				fontFamily: 'Roboto'
			},
			iconTheme: {
				primary: '#2563B8',
				secondary: '#FFFAEE'
			}
		})
	}
}

export default toastMessages
