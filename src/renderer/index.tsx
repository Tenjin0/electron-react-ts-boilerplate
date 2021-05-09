import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { store } from './store'

import App from './App'

import {} from './store/actions'

// eslint-disable-next-line @typescript-eslint/no-empty-function
const onCallback = (action: any) => {}

ReactDOM.render(
	<React.Fragment>
		<Provider store={store}>
			<App onCallback={onCallback} />
		</Provider>
	</React.Fragment>,
	document.getElementById('root'),
)
