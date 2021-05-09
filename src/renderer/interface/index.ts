import { AnyAction } from 'redux'

export interface IRootState {}

export interface IAppAction<T> extends AnyAction {
	type: T
	payload?: any
}
