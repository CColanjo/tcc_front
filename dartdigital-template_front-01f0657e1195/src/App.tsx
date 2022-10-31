import { BrowserRouter } from 'react-router-dom'
import LoadingBackdrop from './components/LoadingBackdrop'

import Providers from './providers'
import Router from './router'

import './styles/global.css'

const App = () => {
	return (
		<BrowserRouter>
			<Providers>
				<Router />
				<LoadingBackdrop />
			</Providers>
		</BrowserRouter>
	)
}

export default App
