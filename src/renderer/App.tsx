import React from 'react'

import './App.css'

export interface IAppProps {
	onCallback: (action: any) => void
}

const App: React.FunctionComponent<IAppProps> = () => {
	return <div>Electron react boilerplate</div>
}

export default App
