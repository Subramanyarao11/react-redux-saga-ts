import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState } from './reducers';
import store from '.';

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
