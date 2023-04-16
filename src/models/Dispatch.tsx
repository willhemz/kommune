import { TypedUseSelectorHook } from 'react-redux';
import { RootState, DispatchFunc } from '../../store';

export type AppDispatch = () => DispatchFunc;
export type AppSelector = TypedUseSelectorHook<RootState>;
