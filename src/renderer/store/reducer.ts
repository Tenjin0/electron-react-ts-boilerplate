import { Reducer } from 'redux'

import { IAppAction, IRootState } from '../interface'
import { TAppActionTypeKeys } from '../store/actions'
import { initialState } from './init'

const appReducer: Reducer<IRootState, IAppAction<TAppActionTypeKeys>> = (
	state = initialState,
	action,
) => {
	switch (action.type) {
		default:
			break
	}
	return state
}

export default appReducer
